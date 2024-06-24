import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDownloaderComponent } from './data-downloader.component';

describe('DataDownloaderComponent', () => {
  let component: DataDownloaderComponent;
  let fixture: ComponentFixture<DataDownloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDownloaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
