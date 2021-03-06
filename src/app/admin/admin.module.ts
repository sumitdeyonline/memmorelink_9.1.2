//import { HomeComponent } from './../pages/home/home.component';
import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HttpClientModule }  from '@angular/http';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UserrolesComponent } from './userroles/userroles.component';
import { AdminGuardService } from '../services/authentication/admin-guard.service';
import { AuthService } from '../services/authentication/auth.service';
import { RouterModule } from '@angular/router';
import { UserroleassignmentComponent } from './userroleassignment/userroleassignment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserprofilesComponent } from './userprofiles/userprofiles.component';
import { PostjobvendorComponent } from './postjobvendor/postjobvendor.component';
import { CountryComponent } from './country/country.component';
import { CountryaddupdateComponent } from './country/countryaddupdate/countryaddupdate.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CountrydialogComponent } from './country/countrydialog/countrydialog.component';
import { StateComponent } from './state/state.component';
import { StateaddupdateComponent } from './state/stateaddupdate/stateaddupdate.component';
import { StatedialogComponent } from './state/statedialog/statedialog.component';
import { ApplyjobAdminComponent } from './applyjob-admin/applyjob-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UploadbulkprofileComponent } from './uploadbulkprofile/uploadbulkprofile.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AdmindialogComponent } from './postjobvendor/admindialog/admindialog.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ApplyjobdeletedialogComponent } from './applyjob-admin/applyjobdeletedialog/applyjobdeletedialog.component';
import { ApplyjobdeletealldialogComponent } from './applyjob-admin/applyjobdeletealldialog/applyjobdeletealldialog.component';
import { ApplyjobService } from '../services/firebase/applyjob/applyjob.service';
import { AdminDialogComponent } from './userroleassignment/admin-dialog/admin-dialog.component';
//import { AdmindialogComponent } from './admindialog/admindialog.component';
//import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule, 
        AngularFireDatabaseModule, 
        MatProgressSpinnerModule,
        BsDatepickerModule.forRoot(),
        NgbTypeaheadModule
        //NgDatepickerModule 

    ],
      declarations: [
      AdminhomeComponent,
      UserrolesComponent,
      UserroleassignmentComponent,
      UserprofilesComponent,
      PostjobvendorComponent,
      CountryComponent,
      CountryaddupdateComponent,
      CountrydialogComponent,
      StateComponent,
      StateaddupdateComponent,
      StatedialogComponent,
      ApplyjobAdminComponent,
      UploadbulkprofileComponent,
      AdmindialogComponent,
      ApplyjobdeletedialogComponent,
      ApplyjobdeletealldialogComponent,
      AdminDialogComponent
    ],
    entryComponents: [CountryaddupdateComponent, CountrydialogComponent, StatedialogComponent, StateaddupdateComponent],
    exports: [
      NgbTypeaheadModule
    ],
    providers: [
      AdminGuardService,
      ApplyjobService
    ]


})

export class AdminModule {}
