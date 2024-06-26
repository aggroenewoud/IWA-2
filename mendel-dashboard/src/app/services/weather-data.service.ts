import { Injectable } from '@angular/core';
import {HourlyData, StationData} from "../structs/stationData";
import {from, map} from "rxjs";
import {concatMap} from "rxjs/operators";
import {WeatherdataService} from "./weatherdata.service";
import {ApiUrlBuilderService} from "./api-url-builder.service";

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private weatherdata: WeatherdataService, private url_builder: ApiUrlBuilderService) { }

  getWeatherData(startDate: Date, endDate: Date) {
    const hours = [];
    const stations: StationData[] = [];

    for (let d = startDate; d <= endDate; d.setHours(d.getHours() + 1)) {
      hours.push(new Date(d));
    }

    from(hours).pipe(
      concatMap(hour => {
        this.url_builder.setStartDate(hour.toISOString());
        const nextHour = new Date(hour);
        nextHour.setHours(nextHour.getHours() + 1);
        this.url_builder.setEndDate(nextHour.toISOString());
        return this.weatherdata.GetData(this.url_builder.buildUrl()).pipe(
          map(data => ({data, hour, nextHour}))
        );
      })
    ).subscribe(({data, hour, nextHour}) => {
      data.forEach((station: any) => {
        const hourData: HourlyData = {
          date: hour,
          CLDC: this.average(station.DATA, 'CLDC'),
          DEWP: this.average(station.DATA, 'DEWP'),
          FRSHTT: this.average(station.DATA, 'FRSHTT'),
          PRCP: this.average(station.DATA, 'PRCP'),
          SLP: this.average(station.DATA, 'SLP'),
          SNDP: this.average(station.DATA, 'SNDP'),
          STP: this.average(station.DATA, 'STP'),
          TEMP: this.average(station.DATA, 'TEMP'),
          VISIB: this.average(station.DATA, 'VISIB'),
          WDSP: this.average(station.DATA, 'WDSP'),
          WNDDIR: this.average(station.DATA, 'WNDDIR'),
        };

        let stationIndex = stations.findIndex(s => s.StationId === station.STN);

        if (stationIndex !== -1) {
          // If the station exists, add the hourData to its hourlyData array
          stations[stationIndex].hourlyData.push(hourData);
        } else {
          // If the station does not exist, add a new station to the stations array
          stations.push({
            StationId: station.STN,
            Latitude: station.LAT,
            Longitude: station.LONG,
            hourlyData: [hourData],
          });
        }
      });
    });

    return stations;
  }

  average(data: any[], key: string): string {
    const sum = data.reduce((acc, curr) => acc + parseFloat(curr[key] || '0'), 0);
    return (sum / data.length).toString();
  }
}
