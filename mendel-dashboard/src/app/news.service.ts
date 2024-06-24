import { Injectable } from '@angular/core';
import { NewsInterface } from './news-interface'; 

@Injectable({
  providedIn: 'root'
})
export class NewsService {
    protected newsList: NewsInterface[] = [
        {
            id: 1,
            title: 'First News',
            description: 'This is the first news'
        },
        {
            id: 2,
            title: 'Second News',
            description: 'This is the second news'
        }
    ];


    getAllNews(): NewsInterface[] {
        return this.newsList;
    }
  
}
