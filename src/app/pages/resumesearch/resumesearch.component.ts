import { Component, OnInit, Input } from '@angular/core';
import { DateformatService } from '../../services/dateformat/dateformat.service';

import * as algoliasearch from 'algoliasearch';
import {isNumeric} from 'rxjs/util/isNumeric';
import { SEARCH_CONFIG } from '../../global-config';
import { UserProfile } from 'src/app/services/firebase/userprofile/userprofile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PagerService } from 'src/app/services/common/pager.service';
import { EmploymenttypesService } from 'src/app/services/firebase/employmenttypes/employmenttypes.service';
import { EmploymentTypes } from 'src/app/services/firebase/employmenttypes/employmenttypes.model';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { WorkAuthorization } from 'src/app/services/firebase/userprofile/workauthorization.model';

@Component({
  selector: 'resumesearch',
  templateUrl: './resumesearch.component.html',
  styleUrls: ['./resumesearch.component.css']
})
export class ResumesearchComponent implements OnInit {

  
  @Input() ResumeSearchVal: string='';

  UserProfile: UserProfile[];
  //UserProfileFinal: UserProfile[] = [];

  client: any;
  index: any;
  length: any = SEARCH_CONFIG.LIST_JOB_DESI_POSITION_SKILLSET;

  // pager object
  pager: any = {};
  searchResumeForm;
  // paged items
  pagedItems: any[];
  EmpTypes: EmploymentTypes[];
  workauthArray : WorkAuthorization[];
  loading: boolean = false;
  pagesize = SEARCH_CONFIG.PAGE_SIZE;
  noResultFound: string='';
  mobile: boolean=false;
  EmpTypesList: string[];
  WorkAuthList: string[];
  singleDropDownloadList: string[];

  constructor(private route: ActivatedRoute, private pagerService: PagerService, private router: Router,fb: FormBuilder, private etypeserv: EmploymenttypesService,public uProfile: UserprofileService ) { 
    this.searchResumeForm = fb.group({
      ResumeSearch: [this.ResumeSearchVal, Validators.required],
      empTypes:[this.EmpTypes],
      Relocate:[],
      TravelReq:[],
      Workuthorization:[this.workauthArray],
      SecurityClearance:[]
    })

    this.route.queryParams.subscribe(params => {
      //console.log(params);
      if ((params['ResumeSearch'] != null) || ( params['ResumeSearch'] != undefined)) {
        this.ResumeSearchVal = params['ResumeSearch'].toString();
        this.searchResumeForm.controls['ResumeSearch'].setValue(this.ResumeSearchVal);
        this.resumeSearch(this.ResumeSearchVal);
        //console.log("ResumeSearch " + this.ResumeSearchVal);
      }

      //console.log("Location " + this.location);
      //this.getPostJobsAlgolia(this.keyword,this.location);

      // this.listjob.keyword = this.keyword;
      // this.listjob.location = this.location;
    });
    this.getWorkAutjorization();
    this.getEmpTypes();

    this.singleDropDownloadList = ['Any','Yes', 'No'];
    this.searchResumeForm.controls['Relocate'].setValue('Any');
    this.searchResumeForm.controls['TravelReq'].setValue('Any');
    this.searchResumeForm.controls['SecurityClearance'].setValue('Any');
  }

  ngOnInit() { 
    window.scroll(0,0);
    if (window.screen.width <= 735) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }
  }

  allFilterChanges(type) {

console.log("Type :::: "+type);

    // this.loading = true;


    // this.loading = false; 
    // this.setPage(1);
  }




  resumeSearch(searchStr:string) {
    this.noResultFound = '';
    const filter = 'isSearchable:true';
    this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
      { protocol: SEARCH_CONFIG.PROTOCOLS });


      this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME_PROFILE);

      this.loading = true;
      this.index.search({
        query: searchStr,
        filters: filter


      }).then((data) => {
        //console.log(data);
        //let j=0;
        //this.UserProfileFinal = [];
        this.UserProfile = data.hits;
        if (this.UserProfile.length == 0)  {
          this.notfoundAnything();
        }        
        this.loading = false;
        this.setPage(1);


      })

  }

  getResumeSearchAlgolia(searchResume: NgForm) {

    this.resumeSearch(searchResume.value.ResumeSearch);

     /****** Need to open Later ********/

    //("Search Parameter ::::: "+searchResume.value.ResumeSearch);
    // this.noResultFound = '';
    // const filter = 'isSearchable:true';
    // this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
    //   { protocol: SEARCH_CONFIG.PROTOCOLS });


    //   this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME_PROFILE);

    //   this.loading = true;
    //   this.index.search({
    //     query: searchResume.value.ResumeSearch,
    //     filters: filter


    //   }).then((data) => {
    //     //console.log(data);
    //     //let j=0;
    //     //this.UserProfileFinal = [];
    //     this.UserProfile = data.hits;
    //     if (this.UserProfile.length == 0)  {
    //       this.notfoundAnything();
    //     }        
    //     this.loading = false;
    //     this.setPage(1);


    //   })

    /****** End  ********/

    //   this.companyIndex.search({
    //     query: this.whatSearchQuery,
    //     filters: 'category:Hotel'

    // }, function searchDone(err, content) {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     for (var h in content.hits) {
    //         console.log(
    //             `Hit(${content.hits[h].objectID}): ${content.hits[h].toString()}`
    //         );
    //     }
    // });}



  }


  getEmpTypes() {

    //let tmpstr='([';
    this.EmpTypesList = new Array();
    this.etypeserv.getEmploymentTypesByUse("").subscribe(etype => {
      this.EmpTypes = etype;
      
      for(let i=0;i<this.EmpTypes.length;i++) {
        //console.log("this.EmpTypeDropDown[i] : "+ this.EmpTypes[i].emptypeName);
        this.EmpTypesList[i] = this.EmpTypes[i].emptypeName;
        //console.log("this.EmpTypesList[i] : "+ this.EmpTypesList[i]);
        //this.EmpTypeDropDown[i].name = this.EmpTypes[i].emptypeName;
        //this.EmpTypesList[i] = this.EmpTypes[i].emptypeName
        //tmpstr = tmpstr+'{Name:'+this.EmpTypes[i].emptypeName+'},';
        
      }
      this.searchResumeForm.controls.empTypes
      .patchValue([...this.EmpTypesList.map(item => item.toString()), 0]);


    });


  }


  getWorkAutjorization() {
    this.WorkAuthList = new Array();
    this.uProfile.getWorkAuthorization("C").subscribe(wauth => {
      this.workauthArray = wauth;
      for(let i=0;i<this.workauthArray.length;i++) {
        this.WorkAuthList[i] = this.workauthArray[i].name;
      }
      this.searchResumeForm.controls.Workuthorization
      .patchValue([...this.WorkAuthList.map(name => name), 0]);
    });

  }



  notfoundAnything() {
    this.noResultFound = "No Record Found";
    this.loading = false; 

  }

  isNull(value) {
    if (value == null) { return "" }
    else { return value }
  }

  setPage(page: number) {
    //console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.UserProfile.length, page);
    //console.log("Page Count...1  ::: "+this.pager.length);
    // get current page of items
    this.pagedItems = this.UserProfile.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);
  }
  getDateDiff(dateIput) {
    let lastModifyDate = new Date(dateIput);
    return Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(24*60*60*1000));
    //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
  }


  resumeDetails(jobid) {
    //console.log("Job ID::::: +",jobid);
    // console.log("Search Componenet ******* "+jobsearchComponent.keyword+" Location "+jobsearchComponent.location);
    // this.router.navigate(['/jobdetails',jobid], { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
    //this.router.navigate(['/jobdetails',jobid], { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
    this.router.navigate(['/resumedetails',jobid]);


    // this.router.navigateByUrl('/jobdetails/'+jobid, { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
  }

}
