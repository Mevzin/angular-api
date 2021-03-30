import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicviewApiService {
  COMICID = "";
  PUBLIC_KEY = 'c553fb26181e641d05a1886a131bd7cc';
  HASH = 'f48412d49c784075a4599040bf8ed908';
  URL_API = `https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&orderBy=title&ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

  constructor(private http: HttpClient) { }

  getComic(id: string): Observable<any>{
    console.log(this.URL_API + "&id=" + id);
    return this.http.get<any>(this.URL_API + "&id=" + id);

  }
}
