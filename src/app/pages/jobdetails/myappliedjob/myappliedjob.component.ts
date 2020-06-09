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
  aJobAll: ApplyJob[];
  //userDetails: UserDetails[];
  applyform;
  pager: any = {};
  startDt: any;
  endDt: any;
  noResultFound: string='';
  disabledDate = true;
  fewRecords:any;
  mobile: boolean = false;
  

  // paged items
  pagedItems: any[];
  loading: boolean = false;
  pagesize = SEARCH_CONFIG.PAGE_SIZE;
  noOfRecordFirst = SEARCH_CONFIG.MORE_PAGE_RECORD_LIMIT;
  recordDetails=[{name:"fewRecords"},{name:"AllRecords"},{name: "Custom"}];

  constructor(public auth: AuthService, private appjob: ApplyjobService,fb: FormBuilder, public dformat: DateformatService, private pagerService: PagerService) { 

    window.scroll(0,0);
    this.applyform = fb.group({
      startDate: [''],
      endDate: [''],
      RecordNumber: ['fewRecords'],
      JobTitle: ['']
    })
   

    //let sdate = new Date();
    //let startDt = new Date(sdate.getTime() - (2*24*60*60*1000));
    //this.startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+(sdate.getDate()-SEARCH_CONFIG.NO_OF_DAYS_RESULT));
    //this.startDt = new Date(new Date().setDate(new Date().getDate()-SEARCH_CONFIG.NO_OF_DAYS_RESULT));
    //this.startDt = new Date(sdate.getTime() - (2*24*60*60*1000));

    //let edate = new Date();
    this.endDt = new Date();
    //this.fewRecords = "fewRecords";
    //this.endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+edate.getDate());  



  }

  ngOnInit(): void {

    window.scroll(0,0);
    if (window.screen.width <= 735) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }
 
    // if ((apjob.username.trim() != '') || (apjob.company.trim() != '')) {


      //let edate = new Date();
      //let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  

      // console.log(" startDt :::: "+this.startDt);
      // console.log(" endDt :::: "+endDt);
      // console.log(" this.auth.userProfile.name :::: "+this.auth.userProfile.name);
      this.CallingData('UDM',"");
      // this.appjob.getApplyJobByAdmin(this.auth.userProfile.name,'UDM','').subscribe(udtl=> {

      //   this.aJob = udtl;

      //  // console.log(" Length :::: "+this.aJob.length);

      //     if (this.aJob.length == 0) {
      //       //console.log("Company ::: "+this.aJob[0].company);
      //       //this.setPage(1);
      //       this.aJob = [];
      //       this.pagedItems = [];
      //       this.notfoundAnything();
      //     } 
      //     //console.log("Company :::: "+this.aJob[0].company);
      //     this.loading = false;
      //     window.scroll(0,0);
      //     this.setPage(1);

      // });

    // }

  }


  CallingData(type,appliedJpb) {
    this.loading = true;
    this.appjob.getApplyJobByAdmin(this.auth.userProfile.name,type,'').subscribe(udtl=> {

      this.aJob = udtl;
      this.aJobAll = udtl;

     // console.log(" Length :::: "+this.aJob.length);

        if (this.aJob.length == 0) {
          //console.log("Company ::: "+this.aJob[0].company);
          //this.setPage(1);
          this.aJob = [];
          this.pagedItems = [];
          this.notfoundAnything();
        } else {
          this.setFilterValue(appliedJpb);
        }
        //console.log("Company :::: "+this.aJob[0].company);
        this.loading = false;
        window.scroll(0,0);
        this.setPage(1);

    });
  }

  selectApplied(appliedJpb) {

      // this.noResultFound = '';
      // let callType='UD';
      // //this.startenddate='';
      // //this.aJob =null;
      this.pagedItems =null;    
      // //this.loading = true;
      this.disabledDate = true;
       this.endDt = new Date();
      // this.startDt='';   
   

      // if (appliedJpb.RecordNumber == 'AllRecords') {
      //   this.startDt = '';
      //   this.CallingData('U',appliedJpb);
      // } else if (appliedJpb.RecordNumber == 'fewRecords') {
      //   this.CallingData('UDM',appliedJpb);
      // }


      if (appliedJpb.RecordNumber == 'AllRecords') {
          this.startDt = '';
          this.CallingData('U',appliedJpb);
      } else if (appliedJpb.RecordNumber == 'fewRecords') {
          this.CallingData('UDM',appliedJpb);
      } else if (appliedJpb.RecordNumber == 'Custom') {
          this.startDt = '';
          this.enableCustomFields(appliedJpb);
      }


      //console.log("callType ::::: "+callType);
  
      // this.loading = true;
      // let sdate = new Date(appliedJpb.startDate);
      // //this.startDt = new Date(appliedJpb.startDate);
      // this.startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+sdate.getDate());
      // this.endDt = new Date(appliedJpb.endDate);
      // //let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  
  
      //   //  console.log(" Current startDt :::: "+this.startDt);
      //   //  console.log(" Current endDt :::: "+this.endDt);

      //   this.appjob.getApplyJobByAdmin(this.auth.userProfile.name,callType,'', this.startDt, this.endDt).subscribe(udtl=> {
  
      //     this.aJob = udtl;
      //     //console.log(" Length :::: "+this.aJob.length);
  
      //     if (this.aJob.length == 0) {
            
      //       //this.setPage(1);
      //       this.aJob = [];
      //       this.pagedItems = null;
      //       this.notfoundAnything();
      //     } 
      //     //console.log("Company :::==>>>> "+this.aJob[0].company);
      //     this.loading = false; 
      //     this.setPage(1);
      //   });

  }

  enableCustomFields(appliedJpb) {

    let startwith:string;


    this.disabledDate = false;
    let callType='UD';
    //console.log("Date ::::: "+appliedJpb.startDate);

    if (this.startDt == '') {
      let sdate = new Date();
      this.startDt = new Date(new Date().setDate(new Date().getDate()-SEARCH_CONFIG.NO_OF_DAYS_RESULT));
      appliedJpb.startDate = this.startDt;
      appliedJpb.endDate = this.endDt;


      //console.log("ppliedJpb.startDate :::::====>>>>> "+appliedJpb.startDate);
    }

   if ((appliedJpb.startDate !=undefined) && (appliedJpb.endDate !=undefined))
   {
     //console.log("Start Date ::"+this.startDt);
    this.loading = true;
    let sdate = new Date(appliedJpb.startDate);
    //this.startDt = new Date(appliedJpb.startDate);
    this.startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+sdate.getDate());
    this.endDt = new Date(appliedJpb.endDate);
    //let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  

      //  console.log(" Current startDt :::: "+this.startDt);
      //  console.log(" Current endDt :::: "+this.endDt);

      this.appjob.getApplyJobByAdmin(this.auth.userProfile.name,callType,'', this.startDt, this.endDt).subscribe(udtl=> {

        this.aJob = udtl;
        this.aJobAll = udtl;
        //console.log(" Length :::: "+this.aJob.length);

        if (this.aJob.length == 0) {
          
          //this.setPage(1);
          this.aJob = [];
          this.pagedItems = null;
          this.notfoundAnything();
        } else {
          this.setFilterValue(appliedJpb);
        }
        //console.log("Company :::==>>>> "+this.aJob[0].company);
        this.loading = false; 
        this.setPage(1);
      });
   }


  }


  setFilterValue(appliedJpb) {

    if (appliedJpb != undefined && appliedJpb !=null && appliedJpb !="") {
      //console.log("ppliedJpb.JobTitle ::::: "+appliedJpb.JobTitle);
      this.loading = true;
  
      this.aJob = this.aJobAll.filter(function(ajobfilter) {
        // return ajobfilter.JobTitle = appliedJpb.JobTitle;
        //console.log("ajobfilter.JobTitle.indexOf(appliedJpb.JobTitle) "+ajobfilter.JobTitle.indexOf(appliedJpb.JobTitle));
        return (ajobfilter.JobTitle.toUpperCase().indexOf(appliedJpb.JobTitle.toUpperCase()) > -1) || (ajobfilter.JobIDSerial===appliedJpb.JobTitle);
      });
  
      this.loading = false; 
      this.setPage(1);
    }


    // let isSearch:boolean;

    // if (appliedJpb.ActiveInActive == 'Active') {
    //   isSearch = true;
    // } else if (appliedJpb.ActiveInActive == 'InActive') {
    //   isSearch = false;
    // } 

    // this.applyFilter(appliedJpb.ActiveInActive,isSearch);


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
