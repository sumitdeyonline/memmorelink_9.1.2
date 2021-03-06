import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { DropdownDirective } from './dropdown.directive';

//import { NavbarComponent } from './template/navbar/navbar.component';
//import { FooterComponent } from './template/footer/footer.component';
import { TemplateModule, templateRouting } from './template';
//import { HomeComponent } from './pages/home/home.component';
//import { NotfoundComponent } from './common/notfound/notfound.component';
import { routing } from './app.routing';

//import { LoginComponent } from './pages/login/login.component';
//import { HttpModule } from '@angular/http';
//import { LogComponent } from './common/logger/log.component';
import { CallbackComponent } from './common/callback/callback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/authentication/auth.service';
//import { SignupComponent } from './pages/signup/signup.component';
//import { SignupConfirmComponent } from './pages/signup/signup-confirm/signup-confirm.component';
//import { SearchheaderComponent } from './template/searchheader/searchheader.component';
//import { PostjobComponent } from './pages/postjob/postjob.component';
import { AuthGuardService } from './services/authentication/auth-guard.service';
import { ScopeGuardService } from './services/authentication/scope-guard.service';
import { PostjobService } from './services/firebase/postjob/postjob.service';
//import { ListjobComponent } from './pages/listjob/listjob.component';
import { ToastrService } from 'ngx-toastr';
//import { JobpoststatusComponent } from './pages/postjob/jobpoststatus/jobpoststatus.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
//import { JobdetailsComponent } from './pages/jobdetails/jobdetails.component';
import { DateformatService } from './services/dateformat/dateformat.service';

//import { UserProfileComponent } from './pages/userprofile/userprofile.component';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { UploadResumeService } from './services/firebase/uploadresume/upload-resume.service';
import { UserdetailsService } from './services/firebase/userdetails/userdetails.service';
import { UserprofileService } from './services/firebase/userprofile/userprofile.service';
//import { UploadresumeComponent } from './pages/uploadresume/uploadresume.component';
//import { ResumesearchComponent } from './pages/resumesearch/resumesearch.component';
//import { ResumedetailsComponent } from './pages/resumesearch/resumedetails/resumedetails.component';
import { ContentfulService } from './services/contentful/contentful.service';
//import { MiddleimageComponent } from './pages/home/middleimage/middleimage.component';
//import { MdToHtmlPipe } from './services/contentful/md-to-html.pipe';
//import { TechNewsComponent } from './pages/tech-news/tech-news.component';
// import { TechNewsDetailsComponent } from './pages/tech-news/tech-news-details/tech-news-details.component';
//import { AdvertisementComponent } from './pages/advertisement/advertisement.component';
//import { ResetpasswordComponent } from './pages/login/resetpassword/resetpassword.component';
import { PagerService } from './services/common/pager.service';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
//import { DialogComponent } from './pages/jobdetails/dialog/dialog.component';
//import { NgxEditorModule } from 'ngx-editor';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//import { AboutComponent } from './pages/about/about.component';
//import { RecruitersSolutionComponent } from './pages/recruiters-solution/recruiters-solution.component';
//import { RecruitersFollowingComponent } from './pages/recruiters-following/recruiters-following.component';
//import { ResumeServiceComponent } from './pages/resume-service/resume-service.component';
//import { SalaryPredictorComponent } from './pages/salary-predictor/salary-predictor.component';
//import { ApplyjobComponent } from './pages/jobdetails/applyjob/applyjob.component';
import { ValueServicesComponent } from './pages/value-services/value-services.component';
//import { MidsearchComponent } from './pages/home/midsearch/midsearch.component';
//import { CommondialogComponent } from './common/commondialog/commondialog.component';
import { ApplyjobService } from './services/firebase/applyjob/applyjob.service';
import { AdminModule } from './admin/admin.module';
import { adminRouting } from './admin/admin.routing';
import { EmailService } from './services/email/email.service';
import { LocationService } from './services/location/location.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxTypeaheadModule } from 'ngx-typeahead';
// import { TypeaheadModule } from 'ngx-bootstrap/typeahead'; 
// import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
//import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
//import { TechNewsDetailsComponent } from './pages/tech-news/tech-news-details/tech-news-details.component';
import { CommonProjectModule } from './common';
//import { alphabetNumerologyRouting  } from './alphabetnumerology/alphabetnumerology.routing';
import { AlphabetNumerologyModule,alphabetNumerologyRouting } from './alphabetnumerology';
import { pagesRouting, PagesModule } from './pages';
import { HomeComponent } from './home/home.component';
import { EmployerpageComponent } from './home/employerpage/employerpage.component';
import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AdminpageComponent } from './home/adminpage/adminpage.component';
import { EmployeepageComponent } from './home/employeepage/employeepage.component';
import { AuthlandingpageComponent } from './home/authlandingpage/authlandingpage.component';
import { SavedialogComponent } from './home/employeepage/savedialog/savedialog.component';
import { RouterModule } from '@angular/router';

//import { MiddleimageComponent } from './home/middleimage/middleimage.component';
// import { HomeComponent } from './homepage/home/home.component';
// import { MiddleimageComponent } from './homepage/home/middleimage/middleimage.component';
// import { AdvertisementComponent } from './homepage/advertisement';
// import { TechNewsComponent } from './homepage/tech-news';
// import { TechNewsDetailsComponent } from './homepage/tech-news/tech-news-details';

//import { AdvertisementModule } from './advertisement';
//import { AlphabetNumerologyModule, alphabetNumerologyRouting } from './alphabetnumerology';
// import { TechNewsModule } from './pages/tech-news/tech-news.module';
// import { technewsRouting } from './pages/tech-news/tech-news.routing';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AppComponent,
    // DropdownDirective,
    //NavbarComponent,
    //MidsearchComponent,
    //FooterComponent,
    HomeComponent,
    EmployerpageComponent,
    AdminpageComponent,
    EmployeepageComponent,
    AuthlandingpageComponent,
    SavedialogComponent,

    //NotfoundComponent,
    //LoginComponent,
    //LogComponent,
    //MdToHtmlPipe,
    //CallbackComponent,
    //SignupComponent,
    //SignupConfirmComponent,
    //SearchheaderComponent,
    //PostjobComponent,
    //ListjobComponent,
    //JobpoststatusComponent,
    //JobdetailsComponent,
    //UserProfileComponent,
    //UploadresumeComponent,
    //ResumesearchComponent,
    //ResumedetailsComponent,
    //MiddleimageComponent,
    // TechNewsComponent,
    // TechNewsDetailsComponent,
    // AdvertisementComponent,
    //ResetpasswordComponent,
    //DialogComponent,
    //AboutComponent,
    //RecruitersSolutionComponent,
    //RecruitersFollowingComponent,
    //ResumeServiceComponent,
    //SalaryPredictorComponent,
    //ApplyjobComponent,
    //ValueServicesComponent
    //CommondialogComponent
  ],
  //entryComponents: [DialogComponent, ApplyjobComponent, CommondialogComponent],
  //entryComponents: [DialogComponent, ApplyjobComponent],
  imports: [
    //AdvertisementModule,
    AdminModule,
    adminRouting,
    AlphabetNumerologyModule,
    alphabetNumerologyRouting,
    TemplateModule,
    templateRouting,

    pagesRouting,
    PagesModule,
    // TechNewsModule,
    // technewsRouting,
    BrowserModule,
    routing,
    MatProgressSpinnerModule,
    // CdkTableModule, ScrollingModule, MatTableModule,
    // FormsModule,
    // ReactiveFormsModule,
    // HttpClientModule,
    // AngularFireDatabaseModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // MatDialogModule,
    // MatInputModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,

    // CKEditorModule,

    // HttpClientModule,
    // ToastrModule.forRoot(),
    // BrowserAnimationsModule,
    // MatProgressSpinnerModule,
    // MatProgressBarModule,
    // NgxSpinnerModule,
    // NgxTypeaheadModule,
    // NgbTypeaheadModule,
    //FontAwesomeModule
    //TypeaheadModule
    //AngularFontAwesomeModule,
    //NgxEditorModule,
    CommonProjectModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService,
    
    // AuthGuardService,
    // ScopeGuardService,
    // PostjobService,
    // UploadResumeService,
    // AngularFirestore,
    // UserdetailsService,
    // UserprofileService,
    // ApplyjobService,
    // ToastrService,
    // DatePipe,
    // DateformatService,
    // AngularFireDatabase,
    // ContentfulService,
    // PagerService,
    // EmailService,
    // HttpClient,
    // LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
