import { Router, RouterModule  }     from '@angular/router';
import { PostjobComponent } from './postjob';
import { JobpoststatusComponent } from './postjob/jobpoststatus';
import { ScopeGuardService as ScopeGuard } from '../services/authentication/scope-guard.service';
import { SignupComponent } from './signup';
import { ValueServicesComponent } from './value-services';

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


export const pagesRouting = RouterModule.forChild([
    // {
    //     path: 'jobprediction',
    //     component: JobpredictionComponent
    //  }
    {
        path: 'postjob',
        component: PostjobComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}

    },
    {
        path: 'postjob/:id',
        component: PostjobComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}

    },
    {
        path: 'jobpoststatus',
        component: JobpoststatusComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'valueservices',
        component: ValueServicesComponent
    }
]);
