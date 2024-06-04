import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherdataService } from '../services/weatherdata.service';

@Component({
  selector: 'app-get-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-data.component.html',
  styleUrl: './get-data.component.css'
})
export class GetDataComponent {
  title = 'get-data';
  data = {};
  constructor(private weatherdata:WeatherdataService) {
    this.weatherdata.GetData().subscribe(data=> {
      console.log(data);//TODO: Fix typing issue
      this.data = data;
    })
  }
}
