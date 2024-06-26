import { Component } from '@angular/core';
import {StationData} from "../structs/stationData";
import {WeatherDataService} from "../services/weather-data.service";
import {DatePipe, DecimalPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import * as Papa from 'papaparse';

@Component({
  selector: 'app-weather-table',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    DecimalPipe,
    FormsModule,
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

  downloadCSV() {
    // Prepare the data
    const data = this.weatherData.flatMap(station =>
      station.hourlyData.map(hourData => ({
        StationID: station.StationId,
        Time: hourData.date,
        CLDC: hourData.CLDC,
        DEWP: hourData.DEWP,
        FRSHTT: hourData.FRSHTT,
        PRCP: hourData.PRCP,
        SLP: hourData.SLP,
        SNDP: hourData.SNDP,
        STP: hourData.STP,
        TEMP: hourData.TEMP,
        VISIB: hourData.VISIB,
        WDSP: hourData.WDSP,
        WNDDIR: hourData.WNDDIR
      }))
    );

    // Convert the data to CSV
    const csv = Papa.unparse(data);

    // Create a blob from the CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Create a link element
    const link = document.createElement("a");

    if (link.download !== undefined) {
      // Create a URL to the blob
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "weather_data.csv");
      link.style.visibility = 'hidden';

      // Add the link to the DOM and simulate a click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
