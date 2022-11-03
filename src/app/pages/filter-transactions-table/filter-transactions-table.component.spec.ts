import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTransactionsTableComponent } from './filter-transactions-table.component';

describe('FilterTransactionsTableComponent', () => {
  let component: FilterTransactionsTableComponent;
  let fixture: ComponentFixture<FilterTransactionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTransactionsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
