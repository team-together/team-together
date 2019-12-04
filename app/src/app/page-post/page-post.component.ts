import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { } from 'googlemaps';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';


declare module 'googlemaps';

@Component({
  selector: 'app-page-post',
  templateUrl: './page-post.component.html',
  styleUrls: ['./page-post.component.scss']
})
export class PagePostComponent implements OnInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  checkoutForm;
  initLat: number = 37.349693;
  initLng: number = -121.940329;
  apiKey = 'AIzaSyDynfTkjf4B5VdGrP5VNvEcQGe7BtNa5eY';

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      address: '',
      title: '',
      description: '',
      time: '',
      introduction: '',
      email: '',
      phone: '',
    });
  }


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

    //this.initMap(this.initLat, this.initLng);

    // window.addEventListener('load', function() {

    // }, false);

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  onSubmit(customerData) {

    var allValid = true;
    var forms = document.getElementsByClassName('needs-validation');
    Array.prototype.filter.call(forms, function (form) {
      if (form.checkValidity() === false) {
        allValid = false;
      }
    });

    if (allValid) {
      var url = "http://localhost:3000/AddEvent";
      url += "?title=" + customerData.title;
      url += "&description=" + customerData.description;
      url += "&introduction=" + customerData.introduction;
      url += "&time=" + customerData.time;
      url += "&phone=" + customerData.phone;
      url += "&email=" + customerData.email;
      url += "&address=" + customerData.address;

      this.httpClient.get(url).subscribe(data => {
        alert("Submission Successful!");
        this.router.navigateByUrl("list")
      }, err => {
        alert("Submission Failed!");
      });
    }


    // Process checkout data here
    //alert(JSON.stringify(customerData));
    //alert(JSON.stringify(event));

    //   "event1": {
    //     "title": "I know a place good at cooking Chinese food. Would you like to come?",
    //     "description": "Chinese cuisine is an important part of Chinese culture, which includes cuisine originating from the diverse regions of China, as well as from Chinese people in other parts of the world.",
    //     "introduction": "I have been working as a Sales Professional for 5 years now. I joined as a Sales executive and worked my way up to the position of Sales Manager within 3 years.",
    //     "time": "12/04/2019 3:30 PM",
    //     "phone": "(669)295-3846",
    //     "email": "LDing2@scu.edu",
    //     "address": "61 Washington St, Santa Clara, CA 95050",
    //     "image": "../../assets/event1.png"
    //  },

    //this.items = this.cartService.clearCart();
    //this.checkoutForm.reset();
  }

}
