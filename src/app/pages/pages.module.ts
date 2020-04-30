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
import { PostjobComponent } from './postjob';
import { JobpoststatusComponent } from './postjob/jobpoststatus';
import { ScopeGuardService } from '../services/authentication/scope-guard.service';
import { DialogComponent } from './jobdetails/dialog/dialog.component';
import { TemplateModule } from '../template';
import { SignupConfirmComponent } from './signup/signup-confirm/signup-confirm.component';
import { SignupComponent } from './signup';
import { CommonProjectModule } from '../common';
import { ValueServicesComponent } from './value-services';
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
        // ReactiveFormsModule,
        // MatDialogModule,
        // MatInputModule,
        // MatTableModule,
        // MatPaginatorModule,
        // MatSortModule, 
        AngularFireDatabaseModule, 
        // MatProgressSpinnerModule

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
    



    ],
      declarations: [
        PostjobComponent,
        JobpoststatusComponent,
        SignupComponent,
        SignupConfirmComponent,
        ValueServicesComponent,

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
     entryComponents: [],  
     //entryComponents: [DialogComponent],         
      exports: [

      ],
    providers: [
      EmailService,
      AuthService,
      PostjobService,
      UserdetailsService,
      DatePipe,
      ScopeGuardService  

      //AlphabetNumerologyService
      //AdminGuardService
    ]


})

export class PagesModule {}