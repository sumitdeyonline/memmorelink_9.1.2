import { NgModule }  from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
//import { HttpClientModule }  from '@angular/http';

// import { AdminGuardService } from '../services/authentication/admin-guard.service';
// import { AuthService } from '../services/authentication/auth.service';
import { RouterModule } from '@angular/router';
//import { environment } from '../environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatDialogModule } from '@angular/material/dialog';
// import { MatInputModule } from '@angular/material/input';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';

// import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { EmailService } from '../services/email/email.service';
import { AuthService } from '../services/authentication/auth.service';
import { PostjobService } from '../services/firebase/postjob/postjob.service';
import { UserdetailsService } from '../services/firebase/userdetails/userdetails.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PostjobComponent, JobpoststatusComponent } from './postjob';
//import { JobpoststatusComponent } from './postjob/jobpoststatus';
import { ScopeGuardService } from '../services/authentication/scope-guard.service';
//import { DialogComponent } from './jobdetails/dialog/dialog.component';
import { TemplateModule } from '../template';
import { SignupConfirmComponent } from './signup/signup-confirm/signup-confirm.component';
import { SignupComponent } from './signup';
import { CommonProjectModule } from '../common';
import { ValueServicesComponent } from './value-services';
import { ContentfulrapperService } from '../services/contentful/contentfulrapper.service';
import { AboutComponent } from './about';
import { JobdetailsComponent, ApplyjobComponent, DialogComponent } from './jobdetails';
import { ListjobComponent } from './listjob';
import { LoginComponent, ResetpasswordComponent } from './login';
import { RecruitersFollowingComponent } from './recruiters-following';
import { RecruitersSolutionComponent } from './recruiters-solution';
import { ResumeServiceComponent } from './resume-service';
import { ResumesearchComponent, ResumedetailsComponent } from './resumesearch';
import { SalaryPredictorComponent } from './salary-predictor';
import { UploadresumeComponent } from './uploadresume';
import { UserProfileComponent } from './userprofile';
import { AuthGuardService } from '../services/authentication/auth-guard.service';
import { AlphabetNumerologyModule } from '../alphabetnumerology';
import { TechNewsComponent, TechNewsDetailsComponent, TechNewsPageComponent } from './tech-news';
import { MyappliedjobComponent } from './jobdetails/myappliedjob/myappliedjob.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EmploymenttypesService } from '../services/firebase/employmenttypes/employmenttypes.service';
import { UploadresumepageComponent } from './uploadresumepage/uploadresumepage.component';
//import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { RemoreuserComponent } from './remoreuser/remoreuser.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng5SliderModule } from 'ng5-slider';
import { SequencenumberService } from '../services/firebase/sequencenumber/sequencenumber.service';
import { ApplicantsComponent } from './applicants/applicants.component';
import { ApplicantappliedComponent } from './applicants/applicantapplied/applicantapplied.component';
import { MatSelectModule } from '@angular/material/select';
import { CandidateComponent } from './applicants/candidate/candidate.component';
import { FaqComponent } from './faq/faq.component';
import { SavejobsService } from '../services/firebase/savejobs/savejobs.service';
import { SavejobComponent } from './listjob/savejob/savejob.component';
import { SavejobdetailsComponent } from './listjob/savejobdetails/savejobdetails.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { CookiesComponent } from './cookies/cookies.component';
import { UserregistrationComponent } from './signup/userregistration/userregistration.component';
import { UploadResumeRegistrationComponent } from './signup/upload-resume-registration/upload-resume-registration.component';
import { EncrdecrserviceService } from '../services/EncriptDecript/encrdecrservice.service';
import { SignupverifyComponent } from './login/signupverify/signupverify.component';
import { RecaptchaService } from '../services/recaptcha/recaptcha.service';
import { RecaptchaselecterComponent } from './recaptchaselecter/recaptchaselecter.component';
// import { SelectAutocompleteModule } from 'mat-select-autocomplete';

// import { TechNewsComponent } from './tech-news';
// import { TechNewsDetailsComponent } from './tech-news/tech-news-details';
//import { AdvertisementComponent } from './advertisement/advertisement.component';

//import { SearchheaderComponent } from '../template';


@NgModule({
    imports: [
        TemplateModule,
        CommonModule,
        // HttpClientModule,
        RouterModule,
        FormsModule,
        CommonProjectModule,
        AlphabetNumerologyModule,
        // ReactiveFormsModule,
        // MatDialogModule,
        // MatInputModule,
        // MatTableModule,
        // MatPaginatorModule,
        // MatSortModule, 
        AngularFireDatabaseModule, 
        // SelectAutocompleteModule,
        MatSelectModule,

        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        //NgxEditorModule,
        CKEditorModule,
        //AngularFontAwesomeModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        BsDatepickerModule.forRoot(),
        // MultiSelectAllModule,
        NgSelectModule,
        Ng5SliderModule



    ],
      declarations: [
        PostjobComponent,
        JobpoststatusComponent,
        SignupComponent,
        SignupConfirmComponent,
        ValueServicesComponent,
        AboutComponent,
        JobdetailsComponent,
        ApplyjobComponent,
        DialogComponent,
        ListjobComponent,
        LoginComponent,
        ResetpasswordComponent,
        RecruitersFollowingComponent,
        RecruitersSolutionComponent,
        ResumeServiceComponent,
        ResumesearchComponent,
        ResumedetailsComponent,
        SalaryPredictorComponent,
        UploadresumeComponent,
        UserProfileComponent,
        TechNewsComponent,
        TechNewsDetailsComponent,
        TechNewsPageComponent,
        MyappliedjobComponent,
        UploadresumepageComponent,
        RemoreuserComponent,
        ApplicantsComponent,
        ApplicantappliedComponent,
        CandidateComponent,
        FaqComponent,
        SavejobComponent,
        SavejobdetailsComponent,
        PrivacypolicyComponent,
        CookiesComponent,
        UserregistrationComponent,
        UploadResumeRegistrationComponent,
        SignupverifyComponent,
        RecaptchaselecterComponent
        
        // SignupConfirmComponent
      // AdminhomeComponent,
      // UserrolesComponent,
      // UserroleassignmentComponent,
      // UserprofilesComponent,
      // PostjobvendorComponent,
      // CountryComponent,
      // CountryaddupdateComponent,
      // CountrydialogComponent,
      // StateComponent,
      // StateaddupdateComponent,
      // StatedialogComponent,
      // ApplyjobAdminComponent,
      // UploadbulkprofileComponent
      // SearchheaderComponent,
    //   JobpredictionComponent
    ],
     //entryComponents: [JobpredictionComponent],
     //entryComponents: [],  
     entryComponents: [DialogComponent, ApplyjobComponent],
     //entryComponents: [DialogComponent],         
      exports: [

      ],
    providers: [
      EmailService,
      AuthService,
      PostjobService,
      UserdetailsService,
      DatePipe,
      ScopeGuardService,
      ContentfulrapperService,
      AuthGuardService,
      EmploymenttypesService,
      SequencenumberService,
      SavejobsService,
      EncrdecrserviceService,
      RecaptchaService

      //AlphabetNumerologyService
      //AdminGuardService
    ]


})

export class PagesModule {}
