import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircirculationComponent } from './aircirculation.component';

describe('AircirculationComponent', () => {
  let component: AircirculationComponent;
  let fixture: ComponentFixture<AircirculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AircirculationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AircirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
