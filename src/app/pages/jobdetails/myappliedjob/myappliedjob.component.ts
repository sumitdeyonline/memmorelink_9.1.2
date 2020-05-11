import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/authentication/auth.service';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PagerService } from 'src/app/services/common/pager.service';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { DateformatService } from 'src/app/services/dateformat/dateformat.service';
import { SEARCH_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'app-myappliedjob',
  templateUrl: './myappliedjob.component.html',
  styleUrls: ['./myappliedjob.component.css']
})
export class MyappliedjobComponent implements OnInit {

  aJob: ApplyJob[];
  //userDetails: UserDetails[];
  applyform;
  pager: any = {};
  startDt: any;
  endDt: any;
  noResultFound: string='';

  // paged items
  pagedItems: any[];
  loading: boolean = false;
  pagesize = SEARCH_CONFIG.PAGE_SIZE;

  constructor(public auth: AuthService, private appjob: ApplyjobService,fb: FormBuilder, public dformat: DateformatService, private pagerService: PagerService) { 

    window.scroll(0,0);
    this.applyform = fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })

    

    let sdate = new Date();
    this.startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+(sdate.getDate()-1));
    let edate = new Date();
    this.endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+edate.getDate());  



  }

  ngOnInit(): void {

    this.loading = true;
    // if ((apjob.username.trim() != '') || (apjob.company.trim() != '')) {


      let edate = new Date();
      let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  

      // console.log(" startDt :::: "+this.startDt);
      // console.log(" endDt :::: "+endDt);
      // console.log(" this.auth.userProfile.name :::: "+this.auth.userProfile.name);

      this.appjob.getApplyJobByAdmin(this.auth.userProfile.name,'UD','', this.startDt, endDt).subscribe(udtl=> {

        this.aJob = udtl;

       // console.log(" Length :::: "+this.aJob.length);

          if (this.aJob.length == 0) {
            //console.log("Company ::: "+this.aJob[0].company);
            //this.setPage(1);
            this.aJob = [];
            this.pagedItems = null;
            this.notfoundAnything();
          } 
          //console.log("Company :::: "+this.aJob[0].company);
          this.loading = false;
          window.scroll(0,0);
          this.setPage(1);

      });

    // }

  }

  selectApplied(appliedJpb) {

      this.noResultFound = '';
      let callType='UD';
      //this.startenddate='';
      this.aJob =null;
      this.pagedItems =null;    
   
        
      //console.log("callType ::::: "+callType);
  
      this.loading = true;
      let sdate = new Date(appliedJpb.startDate);
      this.startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+sdate.getDate());
      let edate = new Date(appliedJpb.endDate);
      let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  
  
        // console.log(" Current startDt :::: "+this.startDt);
        // console.log(" Current endDt :::: "+this.endDt);

        this.appjob.getApplyJobByAdmin(this.auth.userProfile.name,callType,'', this.startDt, endDt).subscribe(udtl=> {
  
          this.aJob = udtl;
          console.log(" Length :::: "+this.aJob.length);
  
          if (this.aJob.length == 0) {
            
            //this.setPage(1);
            this.aJob = [];
            this.pagedItems = null;
            this.notfoundAnything();
          } 
          //console.log("Company :::==>>>> "+this.aJob[0].company);
          this.loading = false; 
          this.setPage(1);
        });
  
  


  }

  notfoundAnything() {
    this.noResultFound = "No Applied Job Found";
    this.loading = false; 

  }

  setPage(page: number) {
    //console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.aJob.length, page);
    //console.log("Page Count...1  ::: "+this.pager.length);
    // get current page of items
    this.pagedItems = this.aJob.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);
  }

  getDateDiff(dateIput) {
    return Math.round(Math.abs(new Date().getTime() - dateIput.toDate().getTime())/(24*60*60*1000));
    //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
  }
  
}
