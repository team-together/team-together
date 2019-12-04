import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Event } from "../service/event";

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss']
})
export class PageMainComponent implements OnInit {

  events: Array<Event> = new Array<Event>();

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.httpClient.get("http://localhost:3000/eventlist").subscribe(data => {

      for(var key in data){
        var eventObj = data[key];
        var event:Event = Object.assign(new Event(), JSON.parse(JSON.stringify(eventObj)));
        event.url = "/detail/" + key;
        this.events.push(event);
      }

    }, err => {
      alert(JSON.stringify(err));
    });
  }

}
