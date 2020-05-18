import { Component, OnInit, ViewChild } from '@angular/core';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';





@Component({
  selector: 'employerpage',
  templateUrl: './employerpage.component.html',
  styleUrls: ['./employerpage.component.css']
})
export class EmployerpageComponent implements OnInit {
  pjob: PostJobc[];
  aJob: ApplyJob[];
  loading: boolean = false;
  constructor(private postservice: PostjobService,public auth: AuthService,private appjob: ApplyjobService) { }

  ngOnInit(): void {

    this.loading = true;
    let sdate = new Date();
    //let startDt = new Date(sdate.getTime() - (24*60*60*1000));
    //console.log("newDate :::: "+newDate);

    let startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+(sdate.getDate()-1));
    //console.log("Start Date ::: "+startDt);
    let endDt = new Date();
    //let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  
    // console.log(" this.auth.userProfile.name :::: "+this.auth.userProfile.name);

    this.postservice.getPostJobsByUser(this.auth.userProfile.name, 'UD','',startDt, endDt).subscribe(pjob=> {
      this.pjob = pjob;
      //console.log("Last Updated ::: "+ Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000));
      // console.log("Last Updated ::: "+ this.getDateDiff(this.pjob[3].LastModifiedDate));
      if (this.pjob.length == 0) {
        //console.log("Company ::: "+this.aJob[0].company);
        //this.setPage(1);
        this.pjob = [];
      } 

      this.loading = false;
      // Math.round(Math.abs(new Date().getTime() - this.pjob[0].LastModifiedDate.toDate().getTime())/(24*60*60*1000)
      window.scroll(0,0);

      //console.log("List Service ..... 33333 ::::: "+this.pjob[1].id);
    }); 
    
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


  }


}
