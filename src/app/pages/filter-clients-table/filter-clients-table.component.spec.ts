import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterClientsTableComponent } from './filter-clients-table.component';

describe('FilterClientsTableComponent', () => {
  let component: FilterClientsTableComponent;
  let fixture: ComponentFixture<FilterClientsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterClientsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterClientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
