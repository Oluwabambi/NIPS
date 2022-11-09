import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountIndexComponent } from './client-account-index.component';

describe('ClientAccountIndexComponent', () => {
  let component: ClientAccountIndexComponent;
  let fixture: ComponentFixture<ClientAccountIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAccountIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAccountIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
