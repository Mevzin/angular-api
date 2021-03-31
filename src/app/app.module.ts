import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComicviewComponent } from './pages/comicview/comicview.component';
import { ComicComponent } from './pages/comic/comic.component';
import {HttpClientModule} from '@angular/common/http';
//import { GoogleMapsModule } from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    ComicviewComponent,
    ComicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBjT_1JqB2Sc0eUBZX_tR5irQJYKL0fjD4',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

