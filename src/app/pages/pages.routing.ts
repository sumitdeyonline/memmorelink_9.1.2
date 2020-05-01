import { Router, RouterModule  }     from '@angular/router';
import { PostjobComponent, JobpoststatusComponent } from './postjob';
//import { JobpoststatusComponent } from './postjob/jobpoststatus';
import { ScopeGuardService as ScopeGuard } from '../services/authentication/scope-guard.service';
import { SignupComponent } from './signup';
import { ValueServicesComponent } from './value-services';
import { AboutComponent } from './about';
import { JobdetailsComponent } from './jobdetails';
import { ListjobComponent } from './listjob';
import { LoginComponent, ResetpasswordComponent } from './login';
import { RecruitersFollowingComponent } from './recruiters-following';
import { RecruitersSolutionComponent } from './recruiters-solution';
import { ResumeServiceComponent } from './resume-service';
import { ResumesearchComponent, ResumedetailsComponent } from './resumesearch';
import { SalaryPredictorComponent } from './salary-predictor';
import { UserProfileComponent } from './userprofile';
import { AuthGuardService } from '../services/authentication/auth-guard.service';

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
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'resetpassword',
        component: ResetpasswordComponent
    },

    {
        path: 'userprofile',
        component: UserProfileComponent,
        canActivate: [AuthGuardService]
    },      
    {
        path: 'jobdetails/:id',
        component: JobdetailsComponent
        // canActivate: [ScopeGuard] ,
        // data: { expectedScopes: ['write:messages']}
    },
    {
        path: 'listjob',
        component: ListjobComponent
    },
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
        path: 'salarypredictor',
        component: SalaryPredictorComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'valueservices',
        component: ValueServicesComponent
    },
    {
        path: 'resumeservice',
        component: ResumeServiceComponent
    },
    {
        path: 'resumedetails/:id',
        component: ResumedetailsComponent,
        canActivate: [ScopeGuard],
        data: { expectedScopes: ['write:messages']}
    },    
    {
        path: 'resumesearch',
        component: ResumesearchComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}
    },    
    {
        path: 'recruiterssolution',
        component: RecruitersSolutionComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}
    },    
    {
        path: 'recruitersfollowing',
        component: RecruitersFollowingComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}
    }
]);
