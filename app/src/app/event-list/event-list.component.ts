import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

class Event{
  title: string;
  description: string;
  introduction: string;
  time: string;
  phone: string;
  email: string;
  address: string;
  url: string;
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: Array<Event> = new Array<Event>();

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.httpClient.get("http://localhost:3000/eventlist").subscribe(data => {
      //alert(JSON.stringify(data));
      //this.events = events;
      //alert("OK");

      for(var key in data){
        var eventObj = data[key];
        var event:Event = Object.assign(new Event(), JSON.parse(JSON.stringify(eventObj)));
        event.url = "/detail/" + key;
        alert(JSON.stringify(event));
        this.events.push(event);
      }

      //this.events = Object.assign(new Event(), JSON.parse(JSON.stringify(data)));

    }, err => {
      alert(JSON.stringify(err));
    });
  }
}
