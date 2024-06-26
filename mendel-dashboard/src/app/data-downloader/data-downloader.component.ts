import { Component } from '@angular/core';
import { WeatherDataService } from '../services/weather-data.service';
import { StationData } from '../structs/stationData';

@Component({
  selector: 'app-data-downloader',
  templateUrl: './data-downloader.component.html',
  standalone: true,
  styleUrls: ['./data-downloader.component.css']
})
export class DataDownloaderComponent {
  startDate: Date;
  endDate: Date;
  weatherData: StationData[] = [];

  constructor(private weatherDataService: WeatherDataService) {
    this.startDate = new Date();
    this.startDate.setHours(17, 0, 0, 0);
    this.endDate = new Date();
    this.endDate.setHours(19, 59, 59, 999);

    this.weatherData = this.weatherDataService.getWeatherData(this.startDate, this.endDate);
    console.log(this.weatherData);
  }


}
