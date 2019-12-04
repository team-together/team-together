import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {} from 'googlemaps';

//import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';


declare module 'googlemaps';

@Component({
  selector: 'app-page-post',
  templateUrl: './page-post.component.html',
  styleUrls: ['./page-post.component.scss']
})

export class PagePostComponent implements AfterViewInit {
    constructor(private http: HttpClient) { }
    @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

    initLat: number = 37.349693;
    initLng: number = -121.940329;

    apiKey = 'AIzaSyDynfTkjf4B5VdGrP5VNvEcQGe7BtNa5eY';

    initMap(lat: number, lng: number) {
        var map: google.maps.Map;
        var initCoordinate = new google.maps.LatLng(lat, lng);
        var initMapOptions: google.maps.MapOptions = {
              center: initCoordinate,
              zoom: 17,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        var map = new google.maps.Map(this.gmap.nativeElement, initMapOptions);
    }

    ngAfterViewInit() {
        this.initMap(this.initLat, this.initLng);
        //this.getRequest();
    }

    //TODO: POST rest API to get coordinates
    getRequest(place) {
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${this.apiKey}&location=${this.initLat},${this.initLng}&radius=500&name=${place}`;
        //console.log("get url: ", url)
        //console.log("google map get request",this.http.get(url));

        //console.log(this.http.get(url).map(res => res.json()).subscribe(val => console.log(val)));
        //console.log(this.http.get(url).map((res: Response) => res.json()));

        //var jsonResult = this.http.get(url).map((res: Response) => res.json());

        //console.log(this.http.get(url));

        // dummy json result
        var jsonResult = {
                            "html_attributions": [],
                            "results": [
                                {
                                    "geometry": {
                                        "location": {
                                            "lat": 37.3514167,
                                            "lng": -121.9421215
                                        }
                                    },
                                    "name": "SCU Parking",
                                    "vicinity": "1065 Alviso St, Santa Clara"
                                }
                                ],
                            "status": "OK"
                            }
        //console.log(jsonResult.results[0].geometry.location)
        if (jsonResult.status == 'OK') {
            return [jsonResult.results[0].geometry.location, jsonResult.results[0].name, jsonResult.results[0].vicinity];
        }
        else {
            console.log(jsonResult.status);
            //TODO: prompt alert window
        }
    }

    placeMarker(placeInfo, map) {
        var coordinates = placeInfo[0];
        var lat = coordinates.lat;
        var lng = coordinates.lng;
        var initCoordinate = new google.maps.LatLng(lat, lng);

        var marker = new google.maps.Marker({
              position: initCoordinate,
              map: map,
              title: placeInfo[1]
            });

        marker.setMap(map);
    }

    googleSearch(place) {
        var placeInfo: any[] = this.getRequest(place);
        console.log(coordinates);
        var coordinates = placeInfo[0];
        var lat = coordinates.lat;
        var lng = coordinates.lng;
        var map = this.initMap(lat, lng);
        this.placeMarker(placeInfo, map);
    }
}
