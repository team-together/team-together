import { Component, OnInit } from '@angular/core';
import { events } from '../page-list/events';
import { HttpClient } from "@angular/common/http";
import { Event } from "../service/event";

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  completedEvents = events;
  events: Array<Event> = new Array<Event>();

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {

    this.httpClient.get("http://localhost:3000/eventlist").subscribe(data => {

      for(var key in data){
        var eventObj = data[key];
        var event:Event = Object.assign(new Event(), JSON.parse(JSON.stringify(eventObj)));
        event.url = "/detail/" + key;

        if(event.join){
          this.events.push(event);
        }
      }

    }, err => {
      alert(JSON.stringify(err));
    });
  }

}
