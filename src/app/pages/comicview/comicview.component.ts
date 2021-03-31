import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ComicviewApiService } from '../../shared/comicview-api.service';
import { MapsAPILoader } from '@agm/core';


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
        name:string,
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

    title: string = 'AGM project';
    latitude!: number;
    longitude!: number;
    zoom!:number;
    address!: string;
    private geoCoder: any;

    @ViewChild('search')
    public searchElementRef!: ElementRef;

      constructor(private activatedRoute: ActivatedRoute,
        private comicviewSvc: ComicviewApiService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone) {
        this.comicResult = [];
        this.comicId= "";
      }

      ngOnInit(): void {
        this.searshComic();

        this.mapsAPILoader.load().then(() => {
          this.setCurrentLocation();
          this.geoCoder = new google.maps.Geocoder;

          let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              //get the place result
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();

              //verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }

              //set latitude, longitude and zoom
              this.latitude = place.geometry.location.lat();
              this.longitude = place.geometry.location.lng();
              this.zoom = 12;
            });
          });
        });
      }

      private setCurrentLocation() {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 15;
          });
        }
      }

      markerDragEnd($event: google.maps.MouseEvent) {
        console.log($event);
        this.latitude = $event.latLng.lat();
        this.longitude = $event.latLng.lng();
        this.getAddress(this.latitude, this.longitude);
      }

      getAddress(latitude: any, longitude: any) {
        this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
          console.log(results);
          console.log(status);
          if (status === 'OK') {
            if (results[0]) {
              this.zoom = 12;
              this.address = results[0].formatted_address;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }

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

