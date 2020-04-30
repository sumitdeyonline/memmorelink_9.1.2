import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer';
import { NavbarComponent } from './navbar';
import { AuthService } from '../services/authentication/auth.service';
import { LocationService } from '../services/location/location.service';
import { SearchheaderComponent } from './searchheader';
import {NgbTypeaheadModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdvertisementComponent } from './advertisement';
import { CommonProjectModule } from '../common';
import { TechNewsComponent } from './tech-news';
import { TechNewsDetailsComponent } from './tech-news/tech-news-details';
import { ContentfulService } from '../services/contentful/contentful.service';

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      FormsModule,
      NgbTypeaheadModule,
      CommonProjectModule
    ],
    declarations: [ FooterComponent,NavbarComponent,SearchheaderComponent, AdvertisementComponent, TechNewsComponent, TechNewsDetailsComponent ],
    exports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      FormsModule,
      NgbTypeaheadModule,
      FooterComponent,
      NavbarComponent,
      TechNewsComponent,
      TechNewsDetailsComponent,
      SearchheaderComponent,
      AdvertisementComponent,
      CommonProjectModule
    ],  providers: [
        AuthService,
        LocationService,
        ContentfulService
    ]
  })
  export class TemplateModule {
  }