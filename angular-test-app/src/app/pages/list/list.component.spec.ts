import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ListComponent } from './list.component';
import { ItemsService } from '../../core/services/item.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockItemsService: jasmine.SpyObj<ItemsService>;

  beforeEach(async () => {
    mockItemsService = jasmine.createSpyObj('ItemsService', ['getItems']);

    await TestBed.configureTestingModule({
      imports: [ListComponent, CommonModule, MatCardModule, MatProgressSpinnerModule],
      providers: [{ provide: ItemsService, useValue: mockItemsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner while loading', () => {
    component.isLoading = true;
    component.isError = false;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();

    const errorDiv = fixture.debugElement.query(By.css('.error'));
    expect(errorDiv).toBeNull();

    const itemCards = fixture.debugElement.queryAll(By.css('.item-card'));
    expect(itemCards.length).toBe(0);
  });

  it('should show error message if loading fails', () => {
    component.isLoading = false;
    component.isError = true;
    fixture.detectChanges();

    const errorDiv = fixture.debugElement.query(By.css('.error'));
    expect(errorDiv).toBeTruthy();
    expect(errorDiv.nativeElement.textContent).toContain('Failed to load items');

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeNull();

    const itemCards = fixture.debugElement.queryAll(By.css('.item-card'));
    expect(itemCards.length).toBe(0);
  });

  it('should display items when loaded successfully', () => {
    component.isLoading = false;
    component.isError = false;
    component.items = [
      { id: 1, name: 'Item 1', description: 'Desc 1' },
      { id: 2, name: 'Item 2', description: 'Desc 2' },
    ];
    fixture.detectChanges();

    const itemCards = fixture.debugElement.queryAll(By.css('.item-card'));
    expect(itemCards.length).toBe(2);
    expect(itemCards[0].nativeElement.textContent).toContain('Item 1');
    expect(itemCards[0].nativeElement.textContent).toContain('Desc 1');
    expect(itemCards[1].nativeElement.textContent).toContain('Item 2');
    expect(itemCards[1].nativeElement.textContent).toContain('Desc 2');

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeNull();

    const errorDiv = fixture.debugElement.query(By.css('.error'));
    expect(errorDiv).toBeNull();
  });

  it('should call loadItems on ngOnInit', () => {
    spyOn(component, 'loadItems');
    component.ngOnInit();
    expect(component.loadItems).toHaveBeenCalled();
  });
});
