import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitAccountProfilingComponent } from './debit-account-profiling.component';

describe('DebitAccountProfilingComponent', () => {
  let component: DebitAccountProfilingComponent;
  let fixture: ComponentFixture<DebitAccountProfilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitAccountProfilingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitAccountProfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
