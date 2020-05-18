import { Component, OnInit } from '@angular/core';

import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { UploadResume } from 'src/app/services/firebase/uploadresume/uploadresume.model';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';

@Component({
  selector: 'employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})
export class EmployeepageComponent implements OnInit {

  aJob: ApplyJob[];
  loading: boolean = false;
  uresume: UploadResume[];

  constructor(public auth: AuthService,private appjob: ApplyjobService, private uresumeservice: UploadResumeService) { }

  ngOnInit(): void {

    this.loading = true;
    let sdate = new Date();
    //let startDt = new Date(sdate.getTime() - (5*24*60*60*1000));
    let startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+(sdate.getDate()-5));
    //console.log("5 Days Back ::: "+startDt);
    let endDt = new Date();
    //let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  
    //console.log("end date ::: "+endDt);

    this.appjob.getApplyJobByAdmin(this.auth.userProfile.name,'CUD','', startDt, endDt).subscribe(udtl=> {
  
      this.aJob = udtl;
      //console.log(" Length :::: "+this.aJob.length);

      if (this.aJob.length == 0) {
        
        //this.setPage(1);
        this.aJob = [];

      } 
      //console.log("Company :::==>>>> "+this.aJob[0].company);
      this.loading = false; 
    }); 


    this.uresumeservice.getResumeDetails(this.auth.userProfile.name).subscribe(resume=> {
  
      this.uresume = resume;
      //console.log(" Length :::: "+this.aJob.length);

      if (this.uresume.length == 0) {
        
        //this.setPage(1);
        this.uresume = [];

      } 
      //console.log("Company :::==>>>> "+this.aJob[0].company);
      this.loading = false; 
    });     

  }


}
