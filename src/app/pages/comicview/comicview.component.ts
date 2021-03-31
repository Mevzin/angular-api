import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'selenium-webdriver';
import { ComicsApiService } from 'src/app/shared/comics-api.service';
import { ComicviewApiService } from '../../shared/comicview-api.service';
import { Loader } from "@googlemaps/js-api-loader"

interface ResultsComic {
  id: number;
  title: string,
  thumbnail: {
    path: string;
    extension: string;
  },
  images: [
    {
      path: string;
      extension: string;
    }
  ]
  description: string,
  pageCount: number,
  format: string,
  textObjects:[{
    language:string;
  }]
  prices:[{
    type:string;
    price:number;
  }]
  creators:{
    items:[
      {
        name:string;
        role:string;
    }
  ]
  }
};

@Component({
  selector: 'app-comicview',
  templateUrl: './comicview.component.html',
  styleUrls: ['./comicview.component.css']
})

    export class ComicviewComponent implements OnInit {
    comicResult: ResultsComic[];
    comicId: string;
    loader = new Loader({
      apiKey: "AIzaSyAn7DVQeyxMDd_w39uD-ydMM2pnk54D-Ys",
      version: "weekly",
    });
    map: any;

      constructor(private activatedRoute: ActivatedRoute,private comicviewSvc: ComicviewApiService) {
        this.comicResult = [];
        this.comicId= "";
      }

      ngOnInit(): void {
        this.searshComic();

        this.loader.load().then(() => {
          console.log("entrou");
          this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          });
        }).catch(() =>{
          console.log("erro mapa");
        });

      }



      searshComic(){
        const idComicSelect = this.activatedRoute.snapshot.paramMap.get('idComicSelect');
        if(idComicSelect != null){
          this.comicId = idComicSelect;
        }
        this.comicviewSvc.getComic(this.comicId).subscribe(post => {
          this.comicResult = post.data.results;
        })
      }

}

