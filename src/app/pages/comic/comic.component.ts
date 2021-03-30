import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ComicsApiService} from '../../shared/comics-api.service';
import {HttpClient} from '@angular/common/http';


interface ResultsComics {
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
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})

export class ComicComponent implements OnInit {
  allComics: ResultsComics[];
  comicIndex: number;

  constructor(private comicsApiService: ComicsApiService) {
    this.comicIndex = 0;
    this.allComics = [];
   }

  ngOnInit(): void {
    this.getAllComics();
    console.log(this.allComics);
  }

  openModal(i: number) {
    this.comicIndex = i;
  }

  getAllComics() {
    this.comicsApiService.getAllComics()
    .subscribe(post => {
      this.allComics = post.data.results;
    })
  }

}
