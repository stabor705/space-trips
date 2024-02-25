import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFilterFormComponent } from './trip-filter-form.component';

describe('TripFilterFormComponent', () => {
  let component: TripFilterFormComponent;
  let fixture: ComponentFixture<TripFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripFilterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
