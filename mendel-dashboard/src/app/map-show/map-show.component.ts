import {Component, Inject, OnInit, PLATFORM_ID, ViewChild, ViewContainerRef} from '@angular/core';
import {isPlatformBrowser, NgIf} from "@angular/common";

@Component({
  selector: "show-map",
  template: `
    <ng-container #container></ng-container>
    <div *ngIf="loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `,
  imports: [
    NgIf
  ],
  standalone: true
})
export class MapShowComponent implements OnInit {

  @ViewChild("container", { read: ViewContainerRef }) mapContainer!: ViewContainerRef;

  loading = true;

  constructor (@Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnInit (): void {
    if (isPlatformBrowser(this.platformId)) {
      import("../map/map.module").then(({ MapModule }) => {
        const componentRef = this.mapContainer.createComponent(MapModule.MapComponent);
        const componentInstance = componentRef.instance;
        componentInstance.load.subscribe((map) => {
          this.loading = false;
        });
      });
    }
  }
}
