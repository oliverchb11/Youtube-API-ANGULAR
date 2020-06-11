import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { YoutubeModel } from '../models/youtube.model';
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
youtube:YoutubeModel[]=[];
private API_KEY = 'AIzaSyBwwReFO2iZIOwsYMyHN4diCZnb7CnW8uE';
private PLAY_LIST = 'UUhGCSvYMfOOnTvwWYBJWENA';
private URL_CONST = 'https://www.googleapis.com/youtube/v3'
private nextPageToken='';
  constructor(private http :HttpClient) { 
  }

    getVideos$(){
      const url_toda = `${this.URL_CONST}/playlistItems`;
      const params = new HttpParams()
      .set('part','snippet')
      .set('key',this.API_KEY)
      .set('playlistId',this.PLAY_LIST)
      .set('maxResults','10')
      .set('pageToken',this.nextPageToken)

     return this.http.get<YoutubeModel>(url_toda,{params}).pipe(
      map(data => {
        console.log(data)
       this.nextPageToken = data.nextPageToken;
       console.log(  this.nextPageToken)
      return data.items;
    }),
      map(items => items.map(video => video.snippet))
    );
  }


}
