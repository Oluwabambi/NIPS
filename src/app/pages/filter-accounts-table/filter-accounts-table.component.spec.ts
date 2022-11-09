import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAccountsTableComponent } from './filter-accounts-table.component';

describe('FilterAccountsTableComponent', () => {
  let component: FilterAccountsTableComponent;
  let fixture: ComponentFixture<FilterAccountsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAccountsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterAccountsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
