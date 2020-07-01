import { Router, RouterModule  }     from '@angular/router';
import { PostjobComponent, JobpoststatusComponent } from './postjob';
//import { JobpoststatusComponent } from './postjob/jobpoststatus';
import { ScopeGuardService as ScopeGuard } from '../services/authentication/scope-guard.service';
import { SignupComponent } from './signup';
import { ValueServicesComponent } from './value-services';
import { AboutComponent } from './about';
import { JobdetailsComponent, MyappliedjobComponent } from './jobdetails';
import { ListjobComponent } from './listjob';
import { LoginComponent, ResetpasswordComponent } from './login';
import { RecruitersFollowingComponent } from './recruiters-following';
import { RecruitersSolutionComponent } from './recruiters-solution';
import { ResumeServiceComponent } from './resume-service';
import { ResumesearchComponent, ResumedetailsComponent } from './resumesearch';
import { SalaryPredictorComponent } from './salary-predictor';
import { UserProfileComponent } from './userprofile';
import { AuthGuardService } from '../services/authentication/auth-guard.service';
import { TechNewsDetailsComponent, TechNewsPageComponent } from './tech-news';
import { UploadresumepageComponent } from './uploadresumepage/uploadresumepage.component';
import { RemoreuserComponent } from './remoreuser/remoreuser.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { ApplicantappliedComponent } from './applicants/applicantapplied/applicantapplied.component';
import { CandidateComponent } from './applicants/candidate/candidate.component';
import { FaqComponent } from './faq/faq.component';
import { SavejobdetailsComponent } from './listjob/savejobdetails/savejobdetails.component';
import { CookiesComponent } from './cookies/cookies.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { UserregistrationComponent } from './signup/userregistration/userregistration.component';
import { UploadResumeRegistrationComponent } from './signup/upload-resume-registration/upload-resume-registration.component';
import { SignupverifyComponent } from './login/signupverify/signupverify.component';

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
        path: 'technewspage',
        component: TechNewsPageComponent
    },    
    {
        path: 'technewsdetails/:id',
        component: TechNewsDetailsComponent
    },
    {
        path: 'signin',
        component: LoginComponent
    },
    {
        path: 'resetpassword',
        component: ResetpasswordComponent
    },
    {
        path: 'faq',
        component: FaqComponent
    },  
    {
        path: 'privacypolicy',
        component: PrivacypolicyComponent
    }, 
    {
        path: 'cookies',
        component: CookiesComponent
    }, 
    {
        path: 'userregistration',
        component: UserregistrationComponent
    }, 
    {
        path: 'uploadresumeregistration',
        component: UploadResumeRegistrationComponent
    },
    {
        path: 'signupverify',
        component: SignupverifyComponent
    },
    

    {
        path: 'userprofile',
        component: UserProfileComponent,
        canActivate: [AuthGuardService]
    },      
    {
        path: 'uploadresumepage',
        component: UploadresumepageComponent,
        canActivate: [AuthGuardService]
    }, 
    {
        path: 'savejobdetails',
        component: SavejobdetailsComponent,
        canActivate: [AuthGuardService]
    }, 
    {
        path: 'removeuser',
        component: RemoreuserComponent,
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
        path: 'applicants/:jobid',
        component: ApplicantsComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}

    },  
    {
        path: 'appliedjob',
        component: MyappliedjobComponent,
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
        path: 'applicantapplied/:emailid',
        component: ApplicantappliedComponent,
        canActivate: [ScopeGuard],
        data: { expectedScopes: ['write:messages']}
    },
    {
        path: 'candidate',
        component: CandidateComponent,
        canActivate: [AuthGuardService]
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
