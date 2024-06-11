import { Routes } from '@angular/router';

import { GetDataComponent } from './get-data/get-data.component';
import { MapShowComponent } from './map-show/map-show.component';

export const routes: Routes = [
  { path: 'get-data', component: GetDataComponent },
  { path: 'map', component: MapShowComponent },
];
