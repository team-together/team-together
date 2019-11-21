import { Component, OnInit } from '@angular/core';
import { events } from '../page-list/events';


@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  events = events;

  constructor() { }

  ngOnInit() {
  }

}
