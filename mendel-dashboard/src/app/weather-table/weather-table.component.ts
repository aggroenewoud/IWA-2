import { Component } from '@angular/core';
import {StationData} from "../structs/stationData";
import {WeatherDataService} from "../services/weather-data.service";
import {DatePipe, DecimalPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-weather-table',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    DecimalPipe
  ],
  templateUrl: './weather-table.component.html',
  styleUrl: './weather-table.component.css'
})
export class WeatherTableComponent {
  private startDate: Date;
  private endDate: Date;
  protected weatherData: StationData[] = [];

  constructor(private weatherDataService: WeatherDataService) {
    this.startDate = new Date();
    this.startDate.setHours(17, 0, 0, 0);
    this.endDate = new Date();
    this.endDate.setHours(19, 59, 59, 999);

    this.weatherData = this.weatherDataService.getWeatherData(this.startDate, this.endDate);
    console.log(this.weatherData);
  }

}
