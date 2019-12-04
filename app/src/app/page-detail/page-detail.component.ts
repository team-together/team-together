import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Event } from "../service/event";
import { single } from 'rxjs-compat/operator/single';

import { } from 'googlemaps';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';


declare module 'googlemaps';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  event: Event;
  initLat: number = 37.349693;
  initLng: number = -121.940329;
  apiKey = 'AIzaSyDynfTkjf4B5VdGrP5VNvEcQGe7BtNa5eY';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private httpClient:HttpClient) { }

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
  
      var result = this.httpClient.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${this.apiKey}&location=${this.initLat},${this.initLng}&radius=500000&name=${place}`);
      result.subscribe(data => {
        //alert(JSON.stringify(data["results"]));
        var coordinates = data["results"][0]["geometry"]["location"];
        var lat = coordinates.lat;
        var lng = coordinates.lng;
        var map = this.initMap(lat, lng);
  
        var placeInfo = [data["results"][0]["geometry"]["location"], data["results"][0]["name"], data["results"][0]["vicinity"]];
  
        this.placeMarker(placeInfo, map);
      })
    }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get("http://localhost:3000/GetEvent/" + id).subscribe(data => {

      this.event = Object.assign(new Event(), JSON.parse(JSON.stringify(data)));

      this.googleSearch(this.event.address);

    }, err => {
      alert(JSON.stringify(err));
    });
  }

  signUp(){
    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get("http://localhost:3000/SignEvent/" + id).subscribe(data => {
      alert("Submission Successful!");
      this.router.navigateByUrl("list");
    }, err => {
      alert("Submission Successful!");
      this.router.navigateByUrl("list");
    });
  }

}
