import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { GlobalSpinnerComponent } from './shared/components/global-spinner/global-spinner.component';
import { RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    Object.defineProperty(mockRouter, 'url', {
      get: () => '/dashboard',
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet, HeaderComponent, GlobalSpinnerComponent, NgIf],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header when not on login route', () => {
    Object.defineProperty(mockRouter, 'url', { get: () => '/dashboard' });
    fixture.detectChanges();

    const headerEl = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerEl).toBeTruthy();
  });

  it('should not display the header on login route', () => {
    Object.defineProperty(mockRouter, 'url', { get: () => '/login' });
    fixture.detectChanges();

    const headerEl = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerEl).toBeNull();
  });

  it('should always display global spinner', () => {
    const spinnerEl = fixture.debugElement.query(By.directive(GlobalSpinnerComponent));
    expect(spinnerEl).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('angular-test-app');
  });
});
