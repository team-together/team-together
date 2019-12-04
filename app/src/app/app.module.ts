import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { RouterModule } from '@angular/router';
import { PagePostComponent } from './page-post/page-post.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { PageListComponent } from './page-list/page-list.component';
import { PageMainComponent } from './page-main/page-main.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { EventListComponent } from './event-list/event-list.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SearchBarComponent,
    GoogleMapComponent,
    PagePostComponent,
    PageDetailComponent,
    PageListComponent,
    PageMainComponent,
    PageLoginComponent,
    EventListComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path:'', 
        children: [
          { path:'', component: PageMainComponent },
          { path:'post', component: PagePostComponent },
          { path:'login', component: PageLoginComponent },
          { path:'list', component: PageListComponent },
          { path:'about', component: AboutUsComponent },
          { path:'detail/:id', component: PageDetailComponent },
        ] },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
