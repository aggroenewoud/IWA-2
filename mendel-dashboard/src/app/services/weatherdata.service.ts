import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StationData } from '../interfaces/weather.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherdataService {

  constructor(private http:HttpClient) {}

  GetData(): Observable<any> {
    var url = "http://localhost:8000/api/contracten/4/all?api-key=rv4CW8jdoBwihT8sv2CNxRy0tsOm5eGf"
    return this.http.get<StationData[]>(url);
  }

}
