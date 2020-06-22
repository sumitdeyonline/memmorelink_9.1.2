import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ApplyjobComponent } from './applyjob/applyjob.component';
import { JobpredictionComponent } from 'src/app/alphabetnumerology';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { SavejobComponent } from '../listjob/savejob/savejob.component';
import { SavejobsService } from 'src/app/services/firebase/savejobs/savejobs.service';
import { SaveJob } from 'src/app/services/firebase/savejobs/savejobs.model';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
//import { PostJobc } from '../../services/firebase/postjob.model';
//import { PostjobService } from '../../services/firebase/postjob.service';

@Component({
  selector: 'jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css']
})
export class JobdetailsComponent implements OnInit {

  id: any; 
  public pjob: PostJobc;
  pjobtemp: PostJobc[];
  aJobCheck: ApplyJob[];
  keyword: string;
  location: string;
  travelReq: string;
  mobile: boolean=false;
  isActive: boolean=true;
  sjobscheck: SaveJob[];
  isSaveJob:boolean = false;
  saveJobButtonMsg:string='Save for Later';

  isApplyJob:boolean = false;
  ApplyJobButtonMsg:string='Apply Now';
  //fileNameDialogRef: MatDialogRef<ApplyjobComponent>;

  constructor(private _activeRoute:ActivatedRoute, private router: Router,private appjob: ApplyjobService, private sjob:SavejobsService, private postservice: PostjobService, private dialog: MatDialog, public auth: AuthService) {
    window.scroll(0,0);
    // console.log("Test :::: ");

    this._activeRoute.queryParams.subscribe(params => {
      //console.log(params);
      this.keyword = params['keyword'];
     // console.log("Keyword " + this.keyword);
      this.location = params['location'];
      //console.log("Location " + this.location);
      //this.getPostJobsAlgolia(this.keyword,this.location);
      // this.listjob.keyword = this.keyword;
      // this.listjob.location = this.location;
    })

  }

  ngOnInit() { 

    if (window.screen.width <= 768) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }


    this._activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      //console.log("Key Value :::::::: "+this.id);
    });
    this.postservice.getPostJobsById(this.id).subscribe(pjob=> {
      this.pjob = pjob;
      //alert(this.pjob.isTeleComute);

      if (this.pjob == null || this.pjob == undefined) {
        this.isActive = false;
      }

      if (!this.pjob?.isSearchable) {
        this.isActive = false;
      }

      if (""+this.pjob?.isTeleComute == 'true') {
        this.pjob.isTeleComute = true;
      } else if (""+this.pjob?.isTeleComute == 'false'){
        this.pjob.isTeleComute = false;
      }
      //console.log("this.pjob?.isTeleComute "+this.pjob?.isTeleComute);
      //console.log("Boolean(this.pjob?.isTeleComute) : "+Boolean(this.pjob?.isTeleComute));
      if (this.pjob?.isTeleComute == true) {
        this.travelReq = "Work from home available";
      } else {
        this.travelReq = "Work from home not available";
      }

      if (this.auth.isAuthenticated()) {
        this.verifySaveJob();
        this.verifyApplyJob();
      }

      //console.log("saveJobButtonMsg ::: "+this.saveJobButtonMsg);

      
      //alert("Last Modifed Date :::::: "+this.pjob.LastModifiedDate);
      //console.log("List Service ..... 33333 ::::: "+this.pjob.Compensation);
    })

  }


  verifySaveJob() {
    //console.log("ID:::: "+this.id);
    this.sjob.getUserCompanyByAdminTakeOne(this.auth.userProfile.name,this.id).subscribe(sjob=>{
      this.sjobscheck = sjob;

      //console.log("this.sjobscheck.auth 2  :::: "+this.sjobscheck.length);
      if (this.sjobscheck.length == 0){  
        this.isSaveJob = false;
        this.saveJobButtonMsg='Save for Later';
      } else {
        //console.log("this.sjobscheck "+this.sjobscheck[0].id);
        //this.message = " has been saved already. You don't want to keep this job save?";
        this.isSaveJob = true;
        this.saveJobButtonMsg='Job Saved';

      }
      //console.log("saveJobButtonMsg ::: 22::::: "+this.saveJobButtonMsg);
    })
  }

  verifyApplyJob() {
    //console.log("ID:::: "+this.id);
    this.appjob.getApplyJobByUserJobIDCandidate(this.auth.userProfile.name,'UJ',this.id).subscribe(ajob=>{
      this.aJobCheck = ajob;

      //console.log("this.sjobscheck.auth 2  :::: "+this.sjobscheck.length);
      if (this.aJobCheck.length == 0){  
        this.isApplyJob = false;
        this.ApplyJobButtonMsg ='Apply Now';
      } else {
        //console.log("this.sjobscheck "+this.sjobscheck[0].id);
        //this.message = " has been saved already. You don't want to keep this job save?";

        this.isApplyJob = true;
        this.ApplyJobButtonMsg ='Applied';

      }
    })
  }



  jobList() {
     //console.log("Search Componenet ******* "+jobsearchComponent.keyword+" Location "+jobsearchComponent.location);
    // this.router.navigate(['/jobdetails',jobid], { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
     //this.router.navigate(['/listjob'], { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
  }

  onApply() {
    //console.log("Pst Job ID :::: "+this.pjob.ApplyToEmail);
      const dialogConfig = new MatDialogConfig();
      
      // dialogConfig.data = this.pjob.ApplyToEmail;
      this.pjob.id = this.id;
      dialogConfig.data = this.pjob;
      // dialogConfig.height = "4";
      // dialogConfig.width ="3";      
       dialogConfig.height = "87%";
       if (this.mobile)
        dialogConfig.width ="90%";
       else 
        dialogConfig.width ="60%";
      this.dialog.open(ApplyjobComponent, dialogConfig);
    //  dialogConfig.disableClose = false;
    //  dialogConfig.autoFocus = true;

    //this.fileNameDialogRef = this.dialog.open(DialogComponent);
    //this.fileNameDialogRef = this.dialog.open(DialogComponent, dialogConfig);
    //this.postservice.deletePostJob(pjob);
  }

  onPredict() {
    //console.log("Pst Job ID :::: "+this.pjob.ApplyToEmail);
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.data = this.pjob.ApplyToEmail;
      this.pjob.id = this.id;
      dialogConfig.data = this.pjob;
       
       if (this.mobile) {
        dialogConfig.width ="95%";
        dialogConfig.height = "98%";
       }
       else {
        dialogConfig.width ="60%";
        dialogConfig.height = "87%";
       }

      this.dialog.open(JobpredictionComponent, dialogConfig);
    //  dialogConfig.disableClose = false;
    //  dialogConfig.autoFocus = true;

    //this.fileNameDialogRef = this.dialog.open(DialogComponent);
    //this.fileNameDialogRef = this.dialog.open(DialogComponent, dialogConfig);
    //this.postservice.deletePostJob(pjob);
  }

  favoriteJob() {
    //console.log("Pst Job ID :::: "+listjob.id);

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = this.pjob.ApplyToEmail;
    // let pjobtemp: PostJobc[] = [{id:this.pjob.id,
    //                           JobID: this.pjob.JobID,
    //                           JobTitle:this.pjob.JobTitle,
    //                           JobCity:this.pjob.JobCity,
    //                           JobState:this.pjob.JobState,
    //                           JobCountry:this.pjob.JobCountry,
    //                           Company:this.pjob.Company
    //                           }];
    this.pjob.id = this.id;
    dialogConfig.data = this.pjob;

    // dialogConfig.height = "4";
    // dialogConfig.width ="3";      
     dialogConfig.height = "25%";
     if (this.mobile)
      dialogConfig.width ="90%";
     else 
      dialogConfig.width ="30%";
    this.dialog.open(SavejobComponent, dialogConfig);
  }

  editJob() {
    // console.log("Edit Job ..."+id);
    this.router.navigate(['/postjob',this.id]);
  }

  getDateDiff(dateIput) {
    let lastModifyDate = new Date(dateIput);
    //console.log("Get Time :::::::===> "+dateIput.toDate().getTime());
    //alert("Last Modifed Date :::::: "+this.pjob.LastModifiedDate);
    //return Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(24*60*60*1000));
    return Math.round(Math.abs(new Date().getTime() - dateIput.toDate().getTime())/(24*60*60*1000));
    //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
  }

  // getDateDiff(dateIput) {
  //   //console.log("dateIput :: "+dateIput);
  //   let hleft=0;
  //   let lastModifyDate = new Date(dateIput);
  //   let finalResult='';
  //   let resultLessthan24 = '';
  //   let hr=0,min=0;
  //   //console.log("lastModifyDate ::: "+lastModifyDate);
  //   let hour=  Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(60*60*1000));
  //   let day = Math.round(hour/24);
  //   if (hour >=24){
  //     hleft = hour-day*24;
  //   } else {
  //     hleft = Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(60*1000));
  //     if (hleft > 60 ) {
  //       let hr =  Math.round(hleft/60);
  //       let min = hleft - hr*60;
  //       if (min < 0) min=60+min;
  //       resultLessthan24 = hr+" hours "+min+ " minutes ago";
  //     } else {
  //       resultLessthan24 = Math.abs(hleft)+" minutes ago";
  //     } 
  //   }

  //   if (hour<24?finalResult=resultLessthan24:finalResult= ""+day+" days "+Math.abs(hleft)+" hours ago") 
  //   // {
  //   //   finalResult=""+hleft+" hours ago";
  //   // } else {
  //   //   finalResult= ""+day+" days "+hleft+" hours ago";
  //   // }
  //     //let hleft= hour-day*24;

  //   //console.log("day ::: "+ day+ " Hour left : "+hleft);
  //   return finalResult;
  //   //return Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(24*60*60*1000));
  //   //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
  // }
  

}
