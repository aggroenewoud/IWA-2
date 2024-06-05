import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StationData } from '../interfaces/weather.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherdataService {

  constructor(private http:HttpClient) {}

  GetData(url:string): Observable<any> {
    return this.http.get<StationData[]>(url);
  }

}
