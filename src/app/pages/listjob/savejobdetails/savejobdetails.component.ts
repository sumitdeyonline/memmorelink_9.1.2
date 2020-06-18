import { Component, OnInit } from '@angular/core';
import { SaveJob } from 'src/app/services/firebase/savejobs/savejobs.model';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormBuilder } from '@angular/forms';
import { DateformatService } from 'src/app/services/dateformat/dateformat.service';
import { PagerService } from 'src/app/services/common/pager.service';
import { SavejobsService } from 'src/app/services/firebase/savejobs/savejobs.service';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SavedialogComponent } from 'src/app/home/employeepage/savedialog/savedialog.component';

@Component({
  selector: 'app-savejobdetails',
  templateUrl: './savejobdetails.component.html',
  styleUrls: ['./savejobdetails.component.css']
})
export class SavejobdetailsComponent implements OnInit {

  sJob: SaveJob[];
  sJobAll: SaveJob[];
  aJobTemp: ApplyJob[];
  //userDetails: UserDetails[];
  saveform;
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


  constructor(public auth: AuthService, fb: FormBuilder, public dformat: DateformatService,private dialog: MatDialog,private appjob: ApplyjobService, private sjob:SavejobsService, private pagerService: PagerService) { 
    window.scroll(0,0);
    this.saveform = fb.group({
      startDate: [''],
      endDate: [''],
      RecordNumber: ['fewRecords'],
      JobTitle: ['']
    })

    this.endDt = new Date();
  }

  ngOnInit(): void {
    window.scroll(0,0);
    if (window.screen.width <= 736) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }
    this.appjob.getApplyJobByUserJobIDCandidate(this.auth.userProfile.name,'U','').subscribe(ajob=> {
      this.aJobTemp = ajob;
      this.CallingData('UCF',"");
    });    


  } 

  CallingData(type,saveJpb) {
    this.loading = true;
    this.sjob.getSaveJobByAdmin(this.auth.userProfile.name,type,'').subscribe(savejob=> {
      this.sJob = savejob;
      this.sJobAll = savejob;

     // console.log(" Length :::: "+this.aJob.length);

        if (this.sJob.length == 0) {
          //console.log("Company ::: "+this.aJob[0].company);
          //this.setPage(1);
          this.sJob = [];
          this.pagedItems = [];
          this.notfoundAnything();
        } else {

          
          this.setFilterValue(saveJpb);
          for (let i=0;i<this.sJob.length;i++) {
            let applyjob  = this.aJobTemp.find(apply=>apply.JobID == this.sJob[i].JobID);
            if (applyjob !=undefined || applyjob !=null) {
              //console.log("applyjob ::::: "+applyjob.JobID);
              this.sJob[i].ApplyJob = true;
            }
          }
        }
        //console.log("Company :::: "+this.aJob[0].company);
        this.loading = false;
        window.scroll(0,0);
        this.setPage(1);

    });
  }



  selectApplied(saveJpb) {

    // this.noResultFound = '';
    // let callType='UD';
    // //this.startenddate='';
    // //this.aJob =null;
    this.pagedItems =null;    
    // //this.loading = true;
    this.disabledDate = true;
     this.endDt = new Date();
    // this.startDt='';   

    if (saveJpb.RecordNumber == 'AllRecords') {
        this.startDt = '';
        this.CallingData('U',saveJpb);
    } else if (saveJpb.RecordNumber == 'fewRecords') {
        this.CallingData('UCF',saveJpb);
    } else if (saveJpb.RecordNumber == 'Custom') {
        this.startDt = '';
        this.enableCustomFields(saveJpb);
    }

  }



  enableCustomFields(saveJpb) {

    let startwith:string;


    this.disabledDate = false;
    let callType='UD';
    //console.log("Date ::::: "+appliedJpb.startDate);

    if (this.startDt == '') {
      let sdate = new Date();
      this.startDt = new Date(new Date().setDate(new Date().getDate()-SEARCH_CONFIG.NO_OF_DAYS_RESULT));
      saveJpb.startDate = this.startDt;
      saveJpb.endDate = this.endDt;


      //console.log("ppliedJpb.startDate :::::====>>>>> "+appliedJpb.startDate);
    }

  if ((saveJpb.startDate !=undefined) && (saveJpb.endDate !=undefined))
  {
    //console.log("Start Date ::"+this.startDt);
    this.loading = true;
    let sdate = new Date(saveJpb.startDate);
    //this.startDt = new Date(appliedJpb.startDate);
    this.startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+sdate.getDate());
    this.endDt = new Date(saveJpb.endDate);
    //let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  

      //  console.log(" Current startDt :::: "+this.startDt);
      //  console.log(" Current endDt :::: "+this.endDt);

      this.sjob.getSaveJobByAdmin(this.auth.userProfile.name,callType,'', this.startDt, this.endDt).subscribe(udtl=> {

        this.sJob = udtl;
        this.sJobAll = udtl;
        //console.log(" Length :::: "+this.aJob.length);

        if (this.sJob.length == 0) {
          
          //this.setPage(1);
          this.sJob = [];
          this.pagedItems = null;
          this.notfoundAnything();
        } else {
          this.setFilterValue(saveJpb);
        }
        //console.log("Company :::==>>>> "+this.aJob[0].company);
        this.loading = false; 
        this.setPage(1);
      });
  }


  }


  setFilterValue(saveJpb) {

    if (saveJpb != undefined && saveJpb !=null && saveJpb !="") {
      //console.log("ppliedJpb.JobTitle ::::: "+appliedJpb.JobTitle);
      this.loading = true;
  
      this.sJob = this.sJobAll.filter(function(ajobfilter) {
        // return ajobfilter.JobTitle = appliedJpb.JobTitle;
        //console.log("ajobfilter.JobTitle.indexOf(appliedJpb.JobTitle) "+ajobfilter.JobTitle.indexOf(appliedJpb.JobTitle));
        return (ajobfilter.JobTitle.toUpperCase().indexOf(saveJpb.JobTitle.toUpperCase()) > -1) || (ajobfilter.JobIDSerial===saveJpb.JobTitle);
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

  onDelete(aj) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = aj.id;
    // dialogConfig.height = "4";
    // dialogConfig.width ="3";
     this.dialog.open(SavedialogComponent, dialogConfig);
  }

  notfoundAnything() {
    this.noResultFound = "No Saved Job Found";
    this.loading = false; 

  }

  setPage(page: number) {
    //console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.sJob.length, page);
    //console.log("Page Count...1  ::: "+this.pager.length);
    // get current page of items
    this.pagedItems = this.sJob.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);
  }

  getDateDiff(dateIput) {
    return Math.round(Math.abs(new Date().getTime() - dateIput.toDate().getTime())/(24*60*60*1000));
    //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
  }

}
