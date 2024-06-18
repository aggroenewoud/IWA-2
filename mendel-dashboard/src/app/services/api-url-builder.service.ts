import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlBuilderService {

  url = environment.apiBaseUrl;
  contract_id = environment.apiContract;
  station_name = "all";

  api_key = "api-key=" + environment.apiKey;
  values: string[] =[];
  count = "count=1";
  minutes = "minutes=0";

  constructor() { }

  buildUrl() {
    var endpoint = [this.url, this.contract_id, this.station_name].join("/");
    var parameters = "?" + [this.api_key, this.count, this.minutes, this.values.join("&")].join("&")
    return  endpoint + parameters
  }

  setMinutes(minutes:string) {
    this.minutes = "minutes="+minutes;
  }

  setStation(station_name:string) {
    this.station_name = station_name;
  }

  setValue(values: string[]) {
    values.forEach(value => {
      this.values.push("value="+value);
    });
  }

  setCount(count:string) {
    this.count = "count="+count;
  }

}
