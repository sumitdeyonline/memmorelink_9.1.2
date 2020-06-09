import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ApplyjobComponent } from './applyjob/applyjob.component';
import { JobpredictionComponent } from 'src/app/alphabetnumerology';
import { AuthService } from 'src/app/services/authentication/auth.service';
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
  keyword: string;
  location: string;
  travelReq: string;
  mobile: boolean=false;
  isActive: boolean=true;
  //fileNameDialogRef: MatDialogRef<ApplyjobComponent>;

  constructor(private _activeRoute:ActivatedRoute, private postservice: PostjobService, private dialog: MatDialog, public auth: AuthService) {
    window.scroll(0,0);
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
      //alert("Last Modifed Date :::::: "+this.pjob.LastModifiedDate);
      //console.log("List Service ..... 33333 ::::: "+this.pjob.Compensation);
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

  getDateDiff(dateIput) {
    let lastModifyDate = new Date(dateIput);
    //console.log("Get Time :::::::===> "+dateIput.toDate().getTime());
    //alert("Last Modifed Date :::::: "+this.pjob.LastModifiedDate);
    //return Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(24*60*60*1000));
    return Math.round(Math.abs(new Date().getTime() - dateIput.toDate().getTime())/(24*60*60*1000));
    //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
  }

}
