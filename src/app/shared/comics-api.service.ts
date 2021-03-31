import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComicsApiService {
  PUBLIC_KEY = 'c553fb26181e641d05a1886a131bd7cc';
  HASH = 'f48412d49c784075a4599040bf8ed908';
  URL_API = `https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&limit=21&noVariants=true&orderBy=title&ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

  constructor(private http: HttpClient) { }

  getAllComics(): Observable<any>{
    return this.http.get<any>(this.URL_API);
  }

  getComic(id: string): Observable<any>{
    console.log("opa");
    return this.http.get<any>(this.URL_API + '&id=' + id);
  }
}
