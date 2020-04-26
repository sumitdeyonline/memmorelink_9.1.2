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

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      FormsModule,
      NgbTypeaheadModule
    ],
    declarations: [ FooterComponent,NavbarComponent,SearchheaderComponent ],
    exports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      FormsModule,
      NgbTypeaheadModule,
      FooterComponent,
      NavbarComponent,
      SearchheaderComponent
    ],  providers: [
        AuthService,
        LocationService
    ]
  })
  export class TemplateModule {
  }