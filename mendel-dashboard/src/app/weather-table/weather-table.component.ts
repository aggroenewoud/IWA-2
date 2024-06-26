import { Component } from '@angular/core';
import {StationData} from "../structs/stationData";
import {WeatherDataService} from "../services/weather-data.service";
import {DatePipe, DecimalPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-weather-table',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './weather-table.component.html',
  styleUrl: './weather-table.component.css'
})
export class WeatherTableComponent {
  private startDate: Date;
  private endDate: Date;
  public startDateString: string;
  public endDateString: string;
  protected weatherData: StationData[] = [];

  constructor(private weatherDataService: WeatherDataService) {
    this.startDate = new Date();
    this.startDate.setHours(0, 0, 0, 0);
    this.startDateString = this.startDate.toISOString().split('T')[0];

    this.endDate = new Date();
    this.endDate.setHours(23, 59, 58);
    this.endDateString = this.endDate.toISOString().split('T')[0];

    this.weatherData = this.weatherDataService.getWeatherData(this.startDate, this.endDate);
    console.log(this.weatherData);
  }

  updateWeatherData() {
    this.weatherData = this.weatherDataService.getWeatherData(this.startDate, this.endDate);
  }

  setStartDate(date: string) {
    let newDate = new Date(date);
    newDate.setHours(this.startDate.getHours());
    newDate.setMinutes(this.startDate.getMinutes());
    newDate.setSeconds(this.startDate.getSeconds());
    newDate.setMilliseconds(this.startDate.getMilliseconds());
    this.startDate = newDate;
  }

  setEndDate(date: string) {
    let newDate = new Date(date);
    newDate.setHours(this.startDate.getHours());
    newDate.setMinutes(this.startDate.getMinutes());
    newDate.setSeconds(this.startDate.getSeconds());
    newDate.setMilliseconds(this.startDate.getMilliseconds());
    this.endDate = newDate;
  }
}
