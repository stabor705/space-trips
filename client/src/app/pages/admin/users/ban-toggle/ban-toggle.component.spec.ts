import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanToggleComponent } from './ban-toggle.component';

describe('BanToggleComponent', () => {
  let component: BanToggleComponent;
  let fixture: ComponentFixture<BanToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BanToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BanToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
