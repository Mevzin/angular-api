import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'selenium-webdriver';
import { ComicsApiService } from 'src/app/shared/comics-api.service';
import { ComicviewApiService } from '../../shared/comicview-api.service';

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
  description: string
};

@Component({
  selector: 'app-comicview',
  templateUrl: './comicview.component.html',
  styleUrls: ['./comicview.component.css']
})

    export class ComicviewComponent implements OnInit {
    comicResult: ResultsComic;
    comicId: string;

      constructor(private activatedRoute: ActivatedRoute,private comicviewSvc: ComicviewApiService) {
        this.comicResult = {} as ResultsComic;
        this.comicId= "";
      }

      ngOnInit(): void {
        this.searshComic();
        console.log(this.comicResult);
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

