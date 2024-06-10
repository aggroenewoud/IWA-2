import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HometimelineComponent } from './hometimeline.component';

describe('HometimelineComponent', () => {
  let component: HometimelineComponent;
  let fixture: ComponentFixture<HometimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HometimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HometimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
