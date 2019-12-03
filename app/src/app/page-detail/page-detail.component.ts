import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Event } from "../service/event";

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent implements OnInit {

  event: Event;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private httpClient:HttpClient) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.httpClient.get("http://localhost:3000/GetEvent/" + id).subscribe(data => {

      this.event = Object.assign(new Event(), JSON.parse(JSON.stringify(data)));;

    }, err => {
      alert(JSON.stringify(err));
    });
  }

}
