import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../shared/components/common-button/common-button.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ButtonComponent,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid initially', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should show validation errors when touched and invalid', () => {
    const emailInput = component.form.controls.email;
    emailInput.markAsTouched();
    fixture.detectChanges();

    const emailError = fixture.debugElement.query(By.css('mat-error'));
    expect(emailError).toBeTruthy();
    expect(emailError.nativeElement.textContent).toContain('Please enter a valid email');
  });

  it('should call auth.login and navigate on successful login', fakeAsync(() => {
    component.form.setValue({ email: 'test@example.com', password: 'password' });
    mockAuthService.login.and.returnValue(of({}));

    component.onSubmit();
    tick();

    expect(component.loading).toBeFalse();
    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('should show error message on login failure', fakeAsync(() => {
    component.form.setValue({ email: 'test@example.com', password: 'wrongpass' });
    mockAuthService.login.and.returnValue(throwError(() => new Error('Invalid')));

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(component.error).toBe('Invalid email or password');

    const errorEl = fixture.debugElement.query(By.css('.error'));
    expect(errorEl.nativeElement.textContent).toContain('Invalid email or password');
  }));

  it('should not call auth.login if form is invalid', () => {
    component.form.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });
});
