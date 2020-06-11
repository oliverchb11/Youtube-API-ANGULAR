import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from '../../models/youtube.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
video: Video [] = [];
  constructor(private youtubeService:YoutubeService) { }

  ngOnInit(): void {
    this.getVideosCom();
  }

  getVideosCom(){
   this.youtubeService.getVideos$().subscribe((data) => {
     this.video.push(...data);
     console.log( this.video);
   });
  }

  verVideo(video:Video){
  Swal.fire({
  title: video.title,
  text: 'Modal with a custom image.',
  html:`<iframe 
  width="100%"
   height="315" 
   src="https://www.youtube.com/embed/${video.resourceId.videoId}" 
  frameborder="0" 
  allow="accelerometer; 
  autoplay; encrypted-media; 
  gyroscope; picture-in-picture" 
  allowfullscreen>
  </iframe>`,
  cancelButtonColor: '#d33'
})
  
  }

  siguienteVideo(){
    this.getVideosCom();
  }

}
