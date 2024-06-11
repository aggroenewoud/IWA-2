import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherdataService } from '../services/weatherdata.service';
import { StationData } from '../interfaces/weather.interfaces';
import { ApiUrlBuilderService } from '../services/api-url-builder.service';

@Component({
  selector: 'app-get-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-data.component.html',
  styleUrl: './get-data.component.css'
})

export class GetDataComponent {
  title = 'get-data';
  data: StationData[] = [];

  constructor(private weatherdata:WeatherdataService) {
    var url_builder = new ApiUrlBuilderService();
    url_builder.setStation("404150");
    this.weatherdata.GetData(url_builder.buildUrl()).subscribe(data=> {
      console.log(data);
      this.data = data;
    })
  }
}
