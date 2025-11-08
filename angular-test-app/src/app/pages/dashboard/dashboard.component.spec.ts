import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../shared/components/common-button/common-button.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockAuthService: Partial<AuthService>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockAuthService = {
      getUserEmail: jasmine.createSpy('getUserEmail').and.returnValue('test@example.com'),
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, CommonModule, MatButtonModule, ButtonComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set userEmail from AuthService', () => {
    expect(component.userEmail).toBe('test@example.com');
    expect(mockAuthService.getUserEmail).toHaveBeenCalled();
  });

  it('should navigate to /list when gotoItemsPage is called', () => {
    component.gotoItemsPage();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list']);
  });
});
