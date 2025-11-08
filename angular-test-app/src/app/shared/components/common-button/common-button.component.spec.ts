import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './common-button.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render default button class', () => {
    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl.nativeElement.classList).toContain('default-btn');
  });

  it('should apply input buttonClass', () => {
    component.buttonClass = 'custom-btn';
    fixture.detectChanges();
    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl.nativeElement.classList).toContain('custom-btn');
  });

  it('should disable the button when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl.nativeElement.disabled).toBeTrue();
  });

  it('should emit btnClick event when button is clicked', () => {
    spyOn(component.btnClick, 'emit');
    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.triggerEventHandler('click', new Event('click'));
    expect(component.btnClick.emit).toHaveBeenCalled();
  });

  it('should render projected content', () => {
    @Component({
      template: `<app-button>Click Me</app-button>`,
      standalone: true,
      imports: [ButtonComponent],
    })
    class TestHostComponent {}

    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const buttonEl = hostFixture.debugElement.query(By.css('button'));
    expect(buttonEl.nativeElement.textContent).toContain('Click Me');
  });
});
