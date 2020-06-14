import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import * as algoliasearch from 'algoliasearch';

import { Router } from '@angular/router';
import { DateformatService } from '../../../services/dateformat/dateformat.service';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { PagerService } from 'src/app/services/common/pager.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../jobdetails/dialog/dialog.component';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'jobpoststatus',
  templateUrl: './jobpoststatus.component.html',
  styleUrls: ['./jobpoststatus.component.css']
})
export class JobpoststatusComponent implements OnInit {


  // monthsFull = [
  //   'January', 'February', 'March', 'April', 'May',
  //   'June', 'July', 'August', 'September',
  //   'October', 'November', 'December'
  //   ];

  // months = [
  //   'Jan', 'Feb', 'Mar', 'Apr', 'May',
  //   'Jun', 'Jul', 'Aug', 'Sep',
  //   'Oct', 'Nov', 'Dec'
  //   ];


  fileNameDialogRef: MatDialogRef<DialogComponent>;

  pjob: PostJobc[];
  pjoball: PostJobc[];
  postform;

  length: any = SEARCH_CONFIG.LIST_JOB_DESC_STATUS;
  pagesize = SEARCH_CONFIG.PAGE_SIZE;
  noOfRecordFirst = SEARCH_CONFIG.MORE_PAGE_RECORD_LIMIT;
  // pager object
  pager: any = {};
  startDt: any="";
  endDt: any;
  fewRecords:any;
  allRecords:any;
  noResultFound: string='';
  mobile: boolean = false;
  disabledDate : boolean = true;
  recordDetails=[{name:"fewRecords"},{name:"AllRecords"},{name: "Custom"}];
  activeDetails=[{name:"Active"},{name:"InActive"},{name:"All"}]
  //recordDetails=["fewRecords","AllRecords","Custom"];
  //ActiveInActive:any;


  // paged items
  pagedItems: any[];
  loading: boolean = false;

  constructor(private auth: AuthService,
      private postservice: PostjobService,
      private router: Router,
      public dformat: DateformatService,
      private dialog: MatDialog,
      fb: FormBuilder,
      private pagerService: PagerService) {

        window.scroll(0,0);
        this.postform = fb.group({
          startDate: [''],
          endDate: [''],
          RecordNumber: ['fewRecords'],
          ActiveInActive:['Active']
        })
    
        
    
        //let sdate = new Date();
        //this.startDt = new Date(sdate.getTime() - (2*24*60*60*1000));
        //this.startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+(sdate.getDate()-1));

        //this.startDt = new Date(new Date().setDate(new Date().getDate()-SEARCH_CONFIG.NO_OF_DAYS_RESULT));

        //let startDt = new Date(new Date().setDate(new Date().getDate()-3)); 
        //let edate = new Date();
        //this.startDt = new Date();
        this.endDt = new Date();
        
        //this.fewRecords = "fewRecords";
        
        //this.recordDetails.name
      
        

        //this.ActiveInActive = "All";
        //this.endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+edate.getDate()); 

      }

  ngOnInit() {
    window.scroll(0,0);
    if (window.screen.width <= 736) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }
    

    // let edate = new Date();
    // let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  

          // console.log(" startDt :::: "+this.startDt);
      // console.log(" endDt :::: "+endDt);
      // console.log(" this.auth.userProfile.name :::: "+this.auth.userProfile.name);

    this.CallingData('UDM','Active',true);

    // this.postservice.getPostJobsByUser(this.auth.userProfile.name, 'UDM','').subscribe(pjob=> {
    //   this.pjob = pjob; 
    //   //console.log("Last Updated ::: "+ Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000));
    //   // console.log("Last Updated ::: "+ this.getDateDiff(this.pjob[3].LastModifiedDate));
    //   if (this.pjob.length == 0) {
    //     //console.log("Company ::: "+this.aJob[0].company);
    //     //this.setPage(1);
    //     this.pjob = [];
    //     this.pagedItems = null;
    //     this.notfoundAnything();
    //   } 

    //   this.loading = false;
    //   // Math.round(Math.abs(new Date().getTime() - this.pjob[0].LastModifiedDate.toDate().getTime())/(24*60*60*1000)
    //   window.scroll(0,0);
    //   this.setPage(1);

    //   //console.log("List Service ..... 33333 ::::: "+this.pjob[1].id);
    // });
  }

  
  CallingData(type,active,issearch) {
    this.loading = true;
    this.postservice.getPostJobsByUser(this.auth.userProfile.name, type,'').subscribe(pjob=> {
      this.pjob = pjob;
      this.pjoball = pjob;
      //console.log("Last Updated ::: "+ Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000));
      // console.log("Last Updated ::: "+ this.getDateDiff(this.pjob[3].LastModifiedDate));
      if (this.pjob.length == 0) {
        //console.log("Company ::: "+this.aJob[0].company);
        //this.setPage(1);
        this.pjob = [];
        this.pagedItems = null;
        this.notfoundAnything();
      } else {
        this.applyFilter(active,issearch);
      }

      this.loading = false;
      // Math.round(Math.abs(new Date().getTime() - this.pjob[0].LastModifiedDate.toDate().getTime())/(24*60*60*1000)
      window.scroll(0,0);
      this.setPage(1);

      //console.log("List Service ..... 33333 ::::: "+this.pjob[1].id);
    });

  }

  selectPostedJob(appliedJpb) {

    // console.log("appliedJpb.ActiveInActive  before ::::: "+appliedJpb.ActiveInActive);


    // appliedJpb.ActiveInActive = this.activeDetails[0].name;
    // //this.postform.set('ActiveInActive').

    // this.postform.controls['ActiveInActive'].setValue('Active',{emitEvent:true});
    // this.activeDetails[0].name = "Active";

    // console.log("appliedJpb.ActiveInActive  after ::::: "+appliedJpb.ActiveInActive);
    // this.postform.controls.ActiveInActive.patchValue(this.activeDetails[0].name,{emitEvent:true});
    //console.log("appliedJpb.ActiveInActive  after ::::: "+appliedJpb.ActiveInActive);
    // this.noResultFound = '';
    // let callType='UD';
    // //this.startenddate='';
    // //this.aJob =null;
     this.pagedItems =null;    
    // //this.loading = true;
     this.disabledDate = true;
     this.endDt = new Date();
    // this.startDt='';

    //console.log("callType ::::: "+appliedJpb.RecordNumber);

    let isSearch:boolean;

    if (appliedJpb.ActiveInActive == 'Active') {
      isSearch = true;
    } else if (appliedJpb.ActiveInActive == 'InActive') {
      isSearch = false;
    } 


    if (appliedJpb.RecordNumber == 'AllRecords') {
      this.startDt = '';
      this.CallingData('U',appliedJpb.ActiveInActive,isSearch);
    } else if (appliedJpb.RecordNumber == 'fewRecords') {
      this.CallingData('UDM',appliedJpb.ActiveInActive,isSearch);
    } else if (appliedJpb.RecordNumber == 'Custom') {
      this.startDt = '';
      this.enableCustomFields(appliedJpb);
    }
    
    // else {
      
    //   let sdate = new Date(appliedJpb.startDate);
    //   this.startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+sdate.getDate());
    //   this.endDt = new Date(appliedJpb.endDate);
    //   //let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  

    //   //console.log(" Current startDt :::: "+this.startDt);
    //   //console.log(" Current endDt :::: "+this.endDt);

    //   this.postservice.getPostJobsByUser(this.auth.userProfile.name,callType,'', this.startDt, this.endDt).subscribe(udtl=> {

    //     this.pjob = udtl;
    //     //console.log(" Length :::: "+this.pjob.length);

    //     if (this.pjob.length == 0) {
          
    //       //this.setPage(1);
    //       this.pjob = [];
    //       this.pagedItems = null;
    //       this.notfoundAnything();
    //     } 
    //     //console.log("Company :::==>>>> "+this.aJob[0].company);
    //     this.loading = false; 
    //     this.setPage(1);
    //   });

    //   }

    }


    enableCustomFields(appliedJpb) {

      //appliedJpb.ActiveInActive = "All";
      this.disabledDate = false;
      let callType='UD';
      //if (appliedJpb.startDate == )
      //console.log("ppliedJpb.startDate ::::: "+appliedJpb.startDate+ " this.startDt :: "+this.startDt);

      if (this.startDt == '') {
        let sdate = new Date();
        this.startDt = new Date(new Date().setDate(new Date().getDate()-SEARCH_CONFIG.NO_OF_DAYS_RESULT));
        appliedJpb.startDate = this.startDt;

        //console.log("ppliedJpb.startDate :::::====>>>>> "+appliedJpb.startDate);
      } 

      if ((appliedJpb.startDate !=undefined) && (appliedJpb.endDate !=undefined))
      {
        this.loading = true;
        // console.log("ppliedJpb.startDate ::::: "+appliedJpb.startDate);
        // console.log("ppliedJpb.endDate ::::: "+appliedJpb.endDate);
        let sdate = new Date(appliedJpb.startDate);
        this.startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+sdate.getDate());
        this.endDt = new Date(appliedJpb.endDate);
        //let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  

        //console.log(" Current startDt :::: "+this.startDt);
        //console.log(" Current endDt :::: "+this.endDt);

        this.postservice.getPostJobsByUser(this.auth.userProfile.name,callType,'', this.startDt, this.endDt).subscribe(udtl=> {

          this.pjob = udtl;
          this.pjoball = udtl;
          //console.log(" Length :::: "+this.pjob.length);

          if (this.pjob.length == 0) {
            
            //this.setPage(1);
            this.pjob = [];
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
      //console.log("ppliedJpb.ActiveInActive ::::: "+appliedJpb.ActiveInActive);
      let isSearch:boolean;

      if (appliedJpb.ActiveInActive == 'Active') {
        isSearch = true;
      } else if (appliedJpb.ActiveInActive == 'InActive') {
        isSearch = false;
      } 

      this.applyFilter(appliedJpb.ActiveInActive,isSearch);


    }

    applyFilter(param,issearch) {
      this.loading = true;
      if ((param == 'Active') || (param == 'InActive')) {
        this.pjob= this.pjoball.filter(function(pjobfilter) {
          return pjobfilter.isSearchable == issearch;
        });
        //console.log("this.pjob ::: "+this.pjob.length);
      } else {
        this.pjob= this.pjoball;
      }
      this.setPage(1);
      this.loading = false;
    }

    getDateDiff(dateIput) {
      return Math.round(Math.abs(new Date().getTime() - dateIput.toDate().getTime())/(24*60*60*1000));
      //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
    }
    /*monthNumToSigName(monthnum) {
      // console.log("Months :::: "+monthnum);
      // console.log("Months ::::....1 "+ this.months[monthnum - 1]);
      return this.months[monthnum - 1] || '';
    }*/

    notfoundAnything() {
      this.noResultFound = "No Post Job Found";
      this.loading = false; 

    }

    goToDetails(id) {
      this.router.navigate(['jobdetails',id]);
    }

    setPage(page: number) {
      //console.log("Page Count");
      window.scroll(0,0);
      // get pager object from service
      this.pager = this.pagerService.getPager(this.pjob.length, page);
      //console.log("Page Count...1  ::: "+this.pager.length);
      // get current page of items
      this.pagedItems = this.pjob.slice(this.pager.startIndex, this.pager.endIndex + 1);
      //console.log("Page Count...1  ::: "+this.pagedItems.length);
    }


    onDelete(pjob) {
      //console.log("Pst Job ID :::: "+pjob.id);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = pjob.id;
        // dialogConfig.height = "4";
        // dialogConfig.width ="3";
        this.dialog.open(DialogComponent, dialogConfig);
      //  dialogConfig.disableClose = false;
      //  dialogConfig.autoFocus = true;

      //this.fileNameDialogRef = this.dialog.open(DialogComponent);
      //this.fileNameDialogRef = this.dialog.open(DialogComponent, dialogConfig);
      //this.postservice.deletePostJob(pjob);
    }


}
