import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripSuccessComponent } from './add-trip-success.component';

describe('AddTripSuccessComponent', () => {
  let component: AddTripSuccessComponent;
  let fixture: ComponentFixture<AddTripSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTripSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTripSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
