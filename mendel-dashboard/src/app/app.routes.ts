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
import {UsertableComponent} from "./usertable/usertable.component";

import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'get-data', component: GetDataComponent , canActivate: [AuthGuard] },
  { path: 'map', component: MapShowComponent , canActivate: [AuthGuard] },
  { path: 'get-data', component: GetDataComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: '', component: LayoutComponent, children: [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
    { path: 'aircirculation', component: AircirculationComponent, canActivate: [AuthGuard]  },
    { path: 'photosynthesis', component: PhotosynthesisComponent, canActivate: [AuthGuard] },
    { path: 'usertable', component: UsertableComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] }]
  }];
