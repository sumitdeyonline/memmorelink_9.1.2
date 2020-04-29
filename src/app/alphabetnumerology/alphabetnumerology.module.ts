
import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HttpClientModule }  from '@angular/http';

// import { AdminGuardService } from '../services/authentication/admin-guard.service';
// import { AuthService } from '../services/authentication/auth.service';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatDialogModule } from '@angular/material/dialog';
// import { MatInputModule } from '@angular/material/input';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';

// import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { JobpredictionComponent } from './jobprediction/jobprediction.component';
import { EmailService } from '../services/email/email.service';
import { AlphabetNumerologyService } from '../services/firebase/alphabetnumerology/alphabet-numerology.service';
//import { SearchheaderComponent } from '../template';


@NgModule({
    imports: [
        CommonModule,
        // HttpClientModule,
        RouterModule,
        FormsModule,
        // ReactiveFormsModule,
        // MatDialogModule,
        // MatInputModule,
        // MatTableModule,
        // MatPaginatorModule,
        // MatSortModule, 
        AngularFireDatabaseModule, 
        // MatProgressSpinnerModule

    ],
      declarations: [
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
      JobpredictionComponent],
     entryComponents: [JobpredictionComponent],
      exports: [

      ],
    providers: [
      EmailService,
      AlphabetNumerologyService
      //AdminGuardService
    ]


})

export class AlphabetNumerologyModule {}
