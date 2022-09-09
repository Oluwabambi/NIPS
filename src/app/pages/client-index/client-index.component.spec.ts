import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIndexComponent } from './client-index.component';

describe('ClientIndexComponent', () => {
  let component: ClientIndexComponent;
  let fixture: ComponentFixture<ClientIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
