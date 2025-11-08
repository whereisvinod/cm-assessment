import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ButtonComponent } from '../common-button/common-button.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockCookieService: jasmine.SpyObj<CookieService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockCookieService = jasmine.createSpyObj('CookieService', ['get', 'delete']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockCookieService.get.and.callFake((key: string) => {
      if (key === 'user') return JSON.stringify({ email: 'test@example.com' });
      return '';
    });

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, CommonModule, MatButtonModule, ButtonComponent],
      providers: [
        { provide: CookieService, useValue: mockCookieService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set userEmail from cookie', () => {
    expect(component.userEmail).toBe('test@example.com');
    const emailEl = fixture.debugElement.query(By.css('.right span'));
    expect(emailEl.nativeElement.textContent).toContain('test@example.com');
  });

  it('should call logout, delete cookies and navigate', () => {
    component.logout();

    expect(mockCookieService.delete).toHaveBeenCalledWith('token');
    expect(mockCookieService.delete).toHaveBeenCalledWith('user');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should trigger logout when button is clicked', () => {
    spyOn(component, 'logout');

    const buttonEl = fixture.debugElement.query(By.directive(ButtonComponent));
    buttonEl.triggerEventHandler('btnClick', new Event('click'));

    expect(component.logout).toHaveBeenCalled();
  });
});
