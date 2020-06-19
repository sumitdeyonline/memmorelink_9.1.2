import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { PagerService } from 'src/app/services/common/pager.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DateformatService } from 'src/app/services/dateformat/dateformat.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {

  applyform;
  jobId: any;
  mobile: boolean=false;
  isActive: boolean=true;
  public aJob: ApplyJob[];
  // paged items
  pagedItems: any[];
  loading: boolean = false;
  pagesize = SEARCH_CONFIG.PAGE_SIZE;
  pager: any = {};
  noResultFound: string='';
  startDt: any="";
  endDt: any;
  jobTitle: any;
  jobID:any;

  constructor(private _activeRoute:ActivatedRoute,public dformat: DateformatService, private apply:ApplyjobService,private pagerService: PagerService,fb: FormBuilder ) { 
    window.scroll(0,0);
    this.applyform = fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
    //this.startDt = new Date(new Date().setDate(new Date().getDate()-SEARCH_CONFIG.NO_OF_DAYS_RESULT));
    //this.startDt = new Date(sdate.getTime() - (2*24*60*60*1000));

    //let edate = new Date();
    this.endDt = new Date();

  }

  ngOnInit(): void {
    this.loading = true;


    if (window.screen.width <= 768) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }


    
    this._activeRoute.queryParams.subscribe(params => {
      //console.log(params);
      this.jobTitle = params['jobtitle'];
      this.jobID = params['jobidserial'];

      // this.listjob.keyword = this.keyword;
      // this.listjob.location = this.location;
    })



    this._activeRoute.paramMap.subscribe(params => {
      this.jobId = params.get('jobid');
    //   console.log("Keyword " + this.jobId);

    //   //this.jobTitle = params['jobtitle'];
    //   this.jobTitle = params.get('jobtitle');
    //   console.log("Keyword :: jobtitle" + this.jobTitle);

    //  // this.jobID = params['jobidserial'];
    //   this.jobID = params.get('jobidserial');
    //   console.log("Key Value :::::::: "+this.jobID);
    });    

    this.apply.getApplyJobByAdmin(this.jobId,'AJID','', this.startDt, this.endDt).subscribe(ajob=> {
      this.aJob = ajob;

      if (this.aJob.length == 0) {
        //console.log("Company ::: "+this.aJob[0].company);
        //this.setPage(1);
        this.aJob = [];
        this.pagedItems = [];
        this.notfoundAnything();
      } else {
        this.jobTitle = this.aJob[0].JobTitle;
        this.jobID = this.aJob[0].JobIDSerial;
      }
      //console.log("Company :::: "+this.aJob[0].company);
      this.loading = false;
      window.scroll(0,0);
      this.setPage(1);
    })

  }


  selectApplied(appliedJpb) {

    this.noResultFound = '';
    //let callType='UD';
    //this.startenddate='';
    //this.aJob =null;
    this.pagedItems =null;    
 
      
    //console.log("callType ::::: "+callType);

    this.loading = true;
    let sdate = new Date(appliedJpb.startDate);
    //this.startDt = new Date(appliedJpb.startDate);
    this.startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+sdate.getDate());
    this.endDt = new Date(appliedJpb.endDate);
    //let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  

      //  console.log(" Current startDt :::: "+this.startDt);
      //  console.log(" Current endDt :::: "+this.endDt);

      this.apply.getApplyJobByAdmin(this.jobId,'AJID','', this.startDt, this.endDt).subscribe(udtl=> {

        this.aJob = udtl;
        //console.log(" Length :::: "+this.aJob.length);

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
    this.noResultFound = "No Applicant(s) Found";
    this.loading = false; 

  }

  coverLetterCheck(val) {
    if (val == null || val==undefined || val == '') {
      return "No Cover Letter"
    }
    return val;
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
