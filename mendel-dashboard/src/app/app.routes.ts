import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import path from 'path';
import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';


import { GetDataComponent } from './get-data/get-data.component';
import { MapShowComponent } from './map-show/map-show.component';

import { AircirculationComponent } from './aircirculation/aircirculation.component';
import { PhotosynthesisComponent } from './photosynthesis/photosynthesis.component';
import { UsersComponent} from "./users/users.component";

export const routes: Routes = [
  { path: 'get-data', component: GetDataComponent },
  { path: 'map', component: MapShowComponent },
  { path: 'get-data', component: GetDataComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'aircirculation', component: AircirculationComponent },
    { path: 'photosynthesis', component: PhotosynthesisComponent},
    { path: 'users', component: UsersComponent}]
  }];
