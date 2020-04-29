import { Router, RouterModule  }     from '@angular/router';
import { JobpredictionComponent } from './jobprediction/jobprediction.component';
// import { AdminhomeComponent } from './adminhome/adminhome.component';
// import { AdminGuardService } from '../services/authentication/admin-guard.service';
// import { UserrolesComponent } from './userroles/userroles.component';
// import { UserroleassignmentComponent } from './userroleassignment/userroleassignment.component';
// import { UserprofilesComponent } from './userprofiles/userprofiles.component';
// import { PostjobvendorComponent } from './postjobvendor/postjobvendor.component';
// import { CountryComponent } from './country/country.component';
// import { StateComponent } from './state/state.component';
// import { ApplyjobAdminComponent } from './applyjob-admin/applyjob-admin.component';
// import { UploadbulkprofileComponent } from './uploadbulkprofile/uploadbulkprofile.component';


export const alphabetNumerologyRouting = RouterModule.forChild([
    {
        path: 'jobprediction',
        component: JobpredictionComponent
     }
    
]);
