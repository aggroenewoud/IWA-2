import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosynthesisComponent } from './photosynthesis.component';

describe('PhotosynthesisComponent', () => {
  let component: PhotosynthesisComponent;
  let fixture: ComponentFixture<PhotosynthesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosynthesisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotosynthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
