import { Component, OnInit, Inject } from '@angular/core';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { EmailService } from 'src/app/services/email/email.service';
import { SaveJob } from 'src/app/services/firebase/savejobs/savejobs.model';
import { SavejobsService } from 'src/app/services/firebase/savejobs/savejobs.service';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { UserProfile } from 'src/app/services/firebase/userprofile/userprofile.model';
import { Login } from '../../login/Login';
import { AUTH_CONFIG } from 'src/app/global-config';



@Component({
  selector: 'app-savejob',
  templateUrl: './savejob.component.html',
  styleUrls: ['./savejob.component.css']
})
export class SavejobComponent implements OnInit {

  title = '';
  form;
  error='';
  login = new Login();
  loginError = '';
  mobile: boolean=false;

  Isdelete: boolean=false;
  deletedSaveJob:boolean = false;
  deleteJobMsg: string='';



  pjob: PostJobc;
  sJobs: SaveJob;
  sjobscheck: SaveJob[];
  userProfile: UserProfile[];
  message:string='';
  constructor(private dialogRef: MatDialogRef<SavejobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, 
    public auth: AuthService,private sjob:SavejobsService, private uDetails:UserprofileService,  private sEmail: EmailService) { 

      this.form = fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    }
  
    

  ngOnInit(): void { 
    this.message = '';
    this.pjob = this.data;
    //console.log("this.JobID ::: "+this.pjob.id);

    if (this.auth.isAuthenticated()) {

      //console.log("this.sjobscheck.auth  :::: ");

      this.sjob.getUserCompanyByAdminTakeOne(this.auth.userProfile.name,this.pjob.id).subscribe(sjob=>{
        this.sjobscheck = sjob; 
        //console.log("this.sjobscheck.auth 2  :::: "+this.sjobscheck.length);
        if (this.sjobscheck.length == 0){
          this.Isdelete=false;
          this.deletedSaveJob = false;
          //console.log("this.sjobscheck.length  :::: "+this.sjobscheck.length);
          this.uDetails.getUserDetails(this.auth.userProfile.name,'U').subscribe(udetail=>{
            this.userProfile = udetail;
    
            if (this.userProfile.length>0) {
    
              this.sJobs = { FirstName: this.userProfile[0].FirstName,
                LastName: this.userProfile[0].LastName,
                JobID: this.pjob.id,
                JobIDSerial: ""+this.pjob.JobID,
                JobTitle:  this.pjob.JobTitle,
                username: this.auth.userProfile.name,
                joblocation: this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry,
                company: this.pjob.Company,
                CreatedDate: new Date()
              };
              this.sjob.addUpdateSaveJobs(this.sJobs);
              this.message = ' has been saved.';
              //console.log("You have save the job : "+this.sJobs);
    
            } 
            // \else {
            //   this.applyJobForm.controls['Email'].setValue(this.auth.userProfile.name);
            // }
    
          });
        } else {
          //console.log("this.sjobscheck "+this.sjobscheck[0].id);
          //this.message = " has been saved already. You don't want to keep this job save?";
          this.Isdelete=true;

        }
      })




    }    

  }


  close() {
    this.dialogRef.close();
  }

  deleteSaveJob(id) {
    //console.log("Deleted... "+id);
    this.sjob.deleteSaveJobWithID(id);
    this.deletedSaveJob = true;
  }

  // Login(loginComponent) {
  //   //console.log("UserName and PAssword");
  //   //this._auth.setLoginError('');

  //   //console.log("Login Componenet *******");
  //   this.loginError ='';
  //   this.auth.login(loginComponent.username, loginComponent.password);
 
    
  //    setTimeout(() =>{
  //     if (this.auth.isAuthenticated()) {
  //       //console.log("Authenticated ....");
  //     } else {
  //       //this.login.username = '';


  //         this.login.password = '';
  //         //this.loginError ='Wrong Username or Password';
  //         this.loginError = localStorage.getItem(AUTH_CONFIG.authErrorMeg);
  //         localStorage.removeItem(AUTH_CONFIG.authErrorMeg);
  //       //console.log("ERROR ::::::::: --->>>>>"+this._auth.getLoginErrorMsg());
  //       //console.log("ERROR ::::::::: --->>>>>"+this.loginError);
  //     }
  //    }, 1000);    
  //   //this._authService.login();
  //   //this._authService.getProfile();
  // }

}
