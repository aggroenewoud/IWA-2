import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherdataService {

  constructor(private http:HttpClient) {}

  GetData() {
    var url = "http://localhost:8000/api/contracten/4/all?api-key=rv4CW8jdoBwihT8sv2CNxRy0tsOm5eGf"
    return this.http.get(url, {responseType: 'json'});
  }

}
