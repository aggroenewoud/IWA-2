import { Component } from '@angular/core';
import {WeatherdataService} from "../services/weatherdata.service";
import {ApiUrlBuilderService} from "../services/api-url-builder.service";

@Component({
  selector: 'app-data-downloader',
  standalone: true,
  imports: [],
  templateUrl: './data-downloader.component.html',
  styleUrl: './data-downloader.component.css'
})
export class DataDownloaderComponent {
  startDate: Date;
  endDate: Date;

  constructor(private weatherdata: WeatherdataService, private url_builder: ApiUrlBuilderService) {
    this.startDate = new Date();
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate = new Date();
    this.endDate.setHours(23, 59, 59, 999);

    this.downloadData();
  }

  downloadData() {
    console.log(this.startDate.toISOString());
    console.log(this.endDate.toISOString());

    this.url_builder.setStartDate(this.startDate.toISOString());
    this.url_builder.setEndDate(this.endDate.toISOString());

    const url = this.url_builder.buildUrl();
    this.weatherdata.GetData(url).subscribe((data) => {
      console.log(data);
      // data contains a array of stations. stations have a object data whitch is an array of data points
      // make a new object whith the station name, Lat, Long, and all hours within the start and end date and create the avarages for each hour with the data points
      // save the new object to a file


    });
  }

}
