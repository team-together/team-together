import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-page-post',
  templateUrl: './page-post.component.html',
  styleUrls: ['./page-post.component.scss']
})
export class PagePostComponent implements OnInit {

  checkoutForm;

  constructor(private formBuilder: FormBuilder, private httpClient:HttpClient, private router: Router) {
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

  ngOnInit() {
    // window.addEventListener('load', function() {
      
    // }, false);

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
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
    Array.prototype.filter.call(forms, function(form) {
      if (form.checkValidity() === false) {
        allValid = false;
      }
    });
    
    if(allValid){
      var url = "http://localhost:3000/AddEvent";
      url+= "?title=" + customerData.title;
      url+= "&description=" + customerData.description;
      url+= "&introduction=" + customerData.introduction;
      url+= "&time=" + customerData.time;
      url+= "&phone=" + customerData.phone;
      url+= "&email=" + customerData.email;
      url+= "&address=" + customerData.address;
  
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
