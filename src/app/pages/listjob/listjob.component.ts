import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { PostjobService } from '../../services/firebase/postjob.service';
//import { PostJobc } from '../../services/firebase/postjob.model';
import { DateformatService } from '../../services/dateformat/dateformat.service';
import * as algoliasearch from 'algoliasearch';
import {isNumeric} from 'rxjs/util/isNumeric';
import { SEARCH_CONFIG } from '../../global-config';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { PagerService } from 'src/app/services/common/pager.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { LocationService } from 'src/app/services/location/location.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CityDetails } from './city.model';
import { NearestCityDetails } from './nearestcity.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
//import { EmploymentTypesList } from './empTypes.model';
import { EmploymenttypesService } from 'src/app/services/firebase/employmenttypes/employmenttypes.service';
import { EmploymentTypes } from 'src/app/services/firebase/employmenttypes/employmenttypes.model';
import { EmploymentTypesList } from './empTypes.model';
import { MatOption } from '@angular/material/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SavejobComponent } from './savejob/savejob.component';
//import { ZipCityState } from './zipcity.model';
//import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'listjob',
  templateUrl: './listjob.component.html',
  styleUrls: ['./listjob.component.css'],

})
export class ListjobComponent implements OnInit {
  @ViewChild('allSelectedEmpTypes') public allSelectedEmpTypes: MatOption;
  // @ViewChild('allSelectedWorkFromHome') public allSelectedWorkFromHome: MatOption;

  // headers = new HttpHeaders({
  //   // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  //   'Access-Control-Allow-Origin': "*",
  //   'Access-Control-Allow-Methods': 'GET',
  //   'Content-Type': 'application/json',
  //   "x-rapidapi-host": SEARCH_CONFIG.GEODB_API_HOST,
  //   "x-rapidapi-key": SEARCH_CONFIG.GEODB_API_KEY    
  //   // 'Accept': "application/ms-word"
  // });
  listJobForm: FormGroup;

  PostJobc: PostJobc[];
  PostJobcAll: PostJobc[];

  EmpTypes: EmploymentTypes[];
  //workFromHome: Array<Object>=[{name:"Yes"},{name:"Yes"}];
  //workFromHome: string[];


  //EmpTypesList: EmploymentTypesList[];

  // PostJobcFinal: PostJobc[] = [];
  // listjob = new ListJob();
  keyword: string;
  location: string;
  client: any;
  index: any;
  loading: boolean = false;

  length: any = SEARCH_CONFIG.LIST_JOB_DESC_WIDTH;
  cityModel: CityDetails;
  allCityUS = [];
  noResultFound: string='';
  startFilteroption = false;
  recordDetails=[{name:SEARCH_CONFIG.ALL_RECORDS},{name:SEARCH_CONFIG.LAST_10_DAYS},{name: SEARCH_CONFIG.LAST_30_DAYS}];

  // ALGOLIA_APP_ID = "8I5VGLVBT1";
  // ALGOLIA_API_KEY = "378eba06830cc91d1dad1550dd4a5244";
  //searchQuery: string ="sumitdey@yahoo.com" ;
  //jobs = [];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  pagesize = SEARCH_CONFIG.PAGE_SIZE;
  mobile: boolean=false;
  toppings:any;

  //toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  EmpTypesList: string[];
  workFromHomeTravelReqList: string[];
  searchParameter:boolean=false;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private postjob: PostjobService, 
              public dformat: DateformatService, 
              private pagerService: PagerService,
              private http: HttpClient,
              private locserv: LocationService,
              private etypeserv: EmploymenttypesService,
              fb: FormBuilder,
              private dialog: MatDialog,
              public auth: AuthService) {
              // private SpinnerService: NgxSpinnerService) {

    window.scroll(0,0);
    //this.toppings = new FormControl();




    this.listJobForm =  fb.group({
      RecordNumber: [SEARCH_CONFIG.ALL_RECORDS],
      empTypes:[this.EmpTypes],
      workFromHome:[],
      TravelReq:[]
  
    });
    this.getEmpTypes();
    this.workFromHomeTravelReqList = ['Any','Yes', 'No'];
    //console.log("workFromHomeList "+this.workFromHomeList.map(item => item));

    this.listJobForm.controls['workFromHome'].setValue('Any');
    this.listJobForm.controls['TravelReq'].setValue('Any');

    // this.listJobForm.controls.workFromHome
    // .patchValue([...this.workFromHomeList.map(item => item), 0]);

    //this.PostJobc = null;



    //console.log("FireBase List : .....&&&&&&&&& :::::::-> 1 ");
    // this.postjob.getPostJobs(this.keyword,this.location).subscribe(PostJobc => {
    //   this.PostJobc = PostJobc;
    //   //console.log("List Service ..... 33333 ::::: "+this.PostJobc[1].JobTitle);
    //   //console.log("List Service ..... 4444 ::::: "+this.PostJobc[1].JobCity);
    // });

    // console.log("FireBase List : .....&&&&&&&&& :::::::-> 1 ");
    // this.postjob.getPostJobsAlgolia(this.keyword,this.location).subscribe(PostJobc => {
    //   this.PostJobc = PostJobc;
    //   console.log("List Service ..... 33333 ::::: "+this.PostJobc[1].JobTitle);
    //   console.log("List Service ..... 4444 ::::: "+this.PostJobc[1].JobCity);
    // });

    //this.PostJobc = this.postjob.getPostJobsAlgolia(this.keyword,this.location);

    // this.client = algoliasearch(this.ALGOLIA_APP_ID, this.ALGOLIA_API_KEY,
    //   { protocol: 'https:' });
    //   console.log("Test 1 ....1" );



    //   this.index = this.client.initIndex("PostJob");
    //   console.log("Test 1 ....2" );
    //   //this.index.searchQuery

    //   // this.index.search({
    //   //   facetFilters: ["JobState=CA"]
    //   // });
    //   // this.index.searchForFacetValues({
    //   //   facetName: 'JobState',
    //   //   facetQuery: 'CA',
    //   this.index.search({
    //     //filters: "{JobState:CA}",
    //     //filters:  'CA'
    //     // searchfiltersarameters: {
    //     //   filters: '{JobState:CA}'
    //     // }
    //     //facetFilters: "{JobState:CA}",
    //     //searchParameters: '[JobState=CA]'
    //     query: this.keyword,
    //     //query: '{ JobState:CA }',
    //     //attributesToRetrieve: ['JobTitle', 'JobDesc']

    //     // restrictSearchableAttributes: [
    //     //   'JobTitle',
    //     //   'JobDesc'
    //     // ]
    //     //filters: 'JobState=CA'

    //   }).then((data) => {

    //     this.PostJobc = data.hits;
    //     for(let i=0;i<this.PostJobc.length;i++) {
    //       console.log("Algolia Job ::::::::: =>  "+this.PostJobc[i].JobState);
    //       console.log("Algolia Job ::::::::: =>  "+this.PostJobc[i].JobTitle);
    //     }

    //   })

    this.route.queryParams.subscribe(params => {
      //console.log(params);
      this.keyword = params['keyword'];
      //console.log("Keyword " + this.keyword);
      this.location = params['location'];
      //console.log("Location " + this.location);
      this.getPostJobsAlgolia(this.keyword,this.location);

      // this.listjob.keyword = this.keyword;
      // this.listjob.location = this.location;
    })

  }

  ngOnInit() {

    window.scroll(0,0);
    if (window.screen.width <= 736) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }
  }

  
  toggleAllSelection() {
    this.loading = true;
    // if (type=='EmpTypes') {
      if (this.allSelectedEmpTypes.selected) {
        this.listJobForm.controls.empTypes
          .patchValue([...this.EmpTypesList.map(item => item.toString()), 0]);
      } else {
        this.listJobForm.controls.empTypes.patchValue([]);
      }
      this.allfilterValue();
      this.loading = false; 
      this.setPage(1);
   }

  allFilterChanges(type) {
    this.loading = true;
    //console.log("Type :::::: ===>>>> "+type);

    //All filter change 

    // if (type=='EmpTypes') {
    //   if (this.allSelectedEmpTypes.selected) {  
    //     this.allSelectedEmpTypes.deselect();
    //     //return false;
    //   }
    //   if(this.listJobForm.controls.empTypes.value.length==this.EmpTypesList.length)
    //     this.allSelectedEmpTypes.select();
    // }


    //console.log("Emp Type :::::: "+this.listJobForm.controls.empTypes.value);
    this.allfilterValue();
    //this.workFromHomeFilterValue(this.listJobForm.controls.workFromHome.value);
    //this.PostJobc = this.PostJobcTmp;
    this.loading = false; 
    this.setPage(1);
  }


  allfilterValue() {
     //console.log("XXXXXXX ::: "+filterVal);
     let toggle=false;
     let filterval='Not Found';
     let workFromHome = this.listJobForm.controls['workFromHome'].value;
     let travelRequirement  = this.listJobForm.controls['TravelReq'].value;
     let empTypeVal = this.listJobForm.controls['empTypes'].value;
    //  console.log(" workFromHome ::: "+workFromHome);
    //  console.log(" travelRequirement ::: "+travelRequirement);
    //  console.log(" empTypeVal ::: "+empTypeVal);          
 

     if ((empTypeVal == null) || (empTypeVal == undefined) || (empTypeVal.length == 0)) {
      //console.log("Empty :::::: &&^^**");
      this.PostJobc= [];
     } else {
        this.PostJobc= this.PostJobcAll.filter(function(pjobfilter) {
          //toggle = this.checkEmpType(empTypeVal,pjobfilter);
          //console.log("pjobfilter.EmploymentTypes.toString().toUpperCase() "+pjobfilter.EmploymentTypes.toString().toUpperCase());
          for(let i=0;i<empTypeVal.length;i++) {
            //console.log(filterVal[i].toUpperCase());
            //console.log("filterVal[i] :: "+filterVal[i]);
            if (empTypeVal[i].toString() !='0'){
              if (pjobfilter.EmploymentTypes.toString().toUpperCase().indexOf(empTypeVal[i].toString().toUpperCase()) > -1 ){

                filterval= empTypeVal[i].toString().toUpperCase();
                //toggle=true;
                break;
              } else {
                filterval='Not Found';
              }
            }

          
          }
          // if (toggle) {
            //toggle = false;
            return (pjobfilter.EmploymentTypes.toString().toUpperCase().indexOf(filterval) > -1) &&
            //return (toggle==true) &&            
            ((workFromHome == 'Yes')?(pjobfilter.isTeleComute==true 
            || pjobfilter.isTeleComute.toString().toLowerCase()=='true'):workFromHome == 'No'
            ?(pjobfilter.isTeleComute==false || pjobfilter.isTeleComute.toString().toLowerCase()=='false'):pjobfilter) &&
            ((travelRequirement == 'Yes')?(pjobfilter.TravelRequirements!='No Travel'):travelRequirement == 'No'
            ?(pjobfilter.TravelRequirements=='No Travel'):pjobfilter);
          // }
      });
     }


     this.loading = false; 
    // this.PostJobc= this.PostJobcAll.filter(function(pjobfilter) {
    //   pjobfilter.EmploymentTypes.toUpperCase().
    //   return pjobfilter.isSearchable == issearch;

    //   ajobfilter.JobTitle.toUpperCase().indexOf(appliedJpb.JobTitle.toUpperCase()) > -1
    // });
   }

  //  checkEmpType(empTypeVal,pjobfilter):boolean {
  //     let toggle=false;
  //     for(let i=0;i<empTypeVal.length;i++) {
  //       //console.log(filterVal[i].toUpperCase());
  //       //console.log("filterVal[i] :: "+filterVal[i]);
  //       if (empTypeVal[i].toString() !='0'){
  //         if (pjobfilter.EmploymentTypes.toString().toUpperCase().indexOf(empTypeVal[i].toString().toUpperCase()) > -1 ){

  //           //filterval= empTypeVal[i].toString().toUpperCase();
  //           toggle=true;
  //           break;
  //         }
  //       }
  //     }
  //     return toggle;
  //   }

  //  selectListWorkFromHome(wfromhome) {
  //   //console.log("Work from home  ::: "+wfromhome);
  //   this.workFromHomeFilterValue(wfromhome);
  //  }

  //  workFromHomeFilterValue(filterVal) {
  //   //console.log("File Value ::: "+filterVal.toString());
  //   //  this.loading = true;
  //   //  let telComule:boolean;

  //  // this.PostJobc= this.PostJobcAll.filter(function(pjobfilter) {
  //    //return (pjobfilter.isTeleComute.toUpperCase().indexOf(appliedJpb.JobTitle.toUpperCase()) > -1) || (ajobfilter.JobIDSerial===appliedJpb.JobTitle);
  //    this.PostJobcTmp= this.PostJobcAll.filter(function(pjobfilter) {

  //     if (filterVal=='Yes') {
  //       //console.log("Yes   ::: pjobfilter.isTeleComute ::: "+pjobfilter.isTeleComute);
  //       //if (pjobfilter.isTeleComute=='true') 
  //       //console.log("Yes ==  ::: pjobfilter.isTeleComute ::: "+pjobfilter.isTeleComute + "  :::: "+pjobfilter.isTeleComute);
  //       return pjobfilter.isTeleComute==true || pjobfilter.isTeleComute.toString()=='true';
  //     } else if (filterVal=='No') {
  //       //console.log("No   ::: pjobfilter.isTeleComute ::: "+pjobfilter.isTeleComute);
  //       return pjobfilter.isTeleComute==false || pjobfilter.isTeleComute.toString()=='false';
  //     } else if (filterVal=='All') {
  //       //console.log("ALL   ::: pjobfilter.isTeleComute ::: "+pjobfilter.isTeleComute);
  //       return pjobfilter;
  //       //return pjobfilter.isTeleComute==true || pjobfilter.isTeleComute.toString()=='true' || pjobfilter.isTeleComute.toString() =='false' || pjobfilter.isTeleComute==false ;
  //     }

  //     //  for(let i=0;i<filterVal.length;i++) {
  //     //    if (filterVal[i] == 'Yes') {
  //     //      console.log()
  //     //      return pjobfilter.isTeleComute==true;
  //     //    } else if (filterVal[i] == 'No') {
  //     //      return pjobfilter.isTeleComute==false;
  //     //    } 

  //     //  }

  //  });
  // //  this.loading = false; 
  // //  this.setPage(1);
  // }

  //  selectListTravellReq(travelreq) {
  //   console.log("Travel Req  ::: "+travelreq);
  //   this.TravelFilterValue(travelreq);
  //  }

  //  TravelFilterValue(filterVal) {
  //   //console.log("File Value ::: "+filterVal.toString());
  //    this.loading = true;
  //    let telComule:boolean;

  //  // this.PostJobc= this.PostJobcAll.filter(function(pjobfilter) {
  //    //return (pjobfilter.isTeleComute.toUpperCase().indexOf(appliedJpb.JobTitle.toUpperCase()) > -1) || (ajobfilter.JobIDSerial===appliedJpb.JobTitle);
  //    this.PostJobc= this.PostJobcAll.filter(function(pjobfilter) {

  //     if (filterVal=='Yes') {
  //       //console.log("Yes   ::: pjobfilter.isTeleComute ::: "+pjobfilter.isTeleComute);
  //       //if (pjobfilter.isTeleComute=='true') 
  //       //console.log("Yes ==  ::: pjobfilter.isTeleComute ::: "+pjobfilter.isTeleComute + "  :::: "+pjobfilter.isTeleComute);
  //       return pjobfilter.TravelRequirements!='No Travel';
  //     } else if (filterVal=='No') {
  //       //console.log("No   ::: pjobfilter.isTeleComute ::: "+pjobfilter.isTeleComute);
  //       return pjobfilter.TravelRequirements=='No Travel';
  //     } else if (filterVal=='All') {
  //       //console.log("ALL   ::: pjobfilter.isTeleComute ::: "+pjobfilter.isTeleComute);
  //       return pjobfilter;
  //       //return pjobfilter.isTeleComute==true || pjobfilter.isTeleComute.toString()=='true' || pjobfilter.isTeleComute.toString() =='false' || pjobfilter.isTeleComute==false ;
  //     }

  //     //  for(let i=0;i<filterVal.length;i++) {
  //     //    if (filterVal[i] == 'Yes') {
  //     //      console.log()
  //     //      return pjobfilter.isTeleComute==true;
  //     //    } else if (filterVal[i] == 'No') {
  //     //      return pjobfilter.isTeleComute==false;
  //     //    } 

  //     //  }

  //  });
  //  this.loading = false; 
  //  this.setPage(1);
  // }


  // tosslePerOne(all) { 
  //   //console.log("Value ::: "+this.listJobForm.controls.empTypes.value);

  //   // if (type=='EmpTypes') {
  //     this.empTypesfilterValue(this.listJobForm.controls.empTypes.value);
  //     if (this.allSelectedEmpTypes.selected) {  
  //       this.allSelectedEmpTypes.deselect();
  //       return false;
  //     }
  //     if(this.listJobForm.controls.empTypes.value.length==this.EmpTypesList.length)
  //       this.allSelectedEmpTypes.select();


  //  }


  getPostJobsAlgolia(keyword, location) {

 /****** Need to open Later ********/
    this.noResultFound = '';
    this.PostJobc= [];
    this.pagedItems=[];
    this.pager = {};
    
    this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
      { protocol: SEARCH_CONFIG.PROTOCOLS });

      let filter = 'isSearchable:true', state='', city='';
      // let filter = '', state='', city='';
      //this.PostJobc = [];
      this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME);

      //console.log(" keyword :::: "+keyword+"location :::: "+location);
      //this.SpinnerService.show(); 
      this.loading = true;
      let locationLocal = location.trim();
      let keywordLocal = keyword.trim();
      if ((keywordLocal == "") && (locationLocal == "")) {
        //console.log("Nothing ... ");
        this.index.search({
          filters: filter
        }).then((data) => {
          //let j=0;
          //this.PostJobcFinal = [];
          this.PostJobc = data.hits;
          this.PostJobcAll = data.hits;
          //this.getEmpTypes();

          //console.log("All Data" +this.PostJobc[0].CompanyLogoURL);
          if (this.PostJobc.length == 0)  {
            this.searchParameter = true;
            this.notfoundAnything(); 
          }
          else {
            this.searchParameter = false;
          }             
          // this.SpinnerService.hide();
          this.loading = false; 
          this.setPage(1);
        });        
      } else {
        if ((keywordLocal != "") || (locationLocal != "")) {
          if (locationLocal != "") {
  
            if (isNumeric(locationLocal)) {
              //console.log("This is number");
              this.getZipCodeSearch(locationLocal,keywordLocal);
              filter = 'JobZip:'+locationLocal+' AND isSearchable:true';
              /* Zipcode location service */
              // this.locserv.getCityState(location).subscribe((data)=>{
              //   console.log(data);
              //   city = data['city'];
              //   state = data['state'];
              //   console.log("City ::::: "+city+"   State :::::: "+state);
              // });
  
              
  
  
            } else {
  
              // Separated out state and city 
              if (locationLocal.indexOf(",") > -1) {
                state = this.isNull(locationLocal.split(",")[1].trim());
                city = this.isNull(locationLocal.split(",")[0].trim());
              } else {
                city = this.isNull(locationLocal.trim());
              }
              
            
  
              if ((state !="") && (city !="")) {

                //console.log("City state")
                this.getCityStateSearch(city, state,keywordLocal);
                //console.log("City state 1")

                //filter = 'JobCity:"'+city+'" AND JobState:"'+state+'"';
                } 
                else if ((state == "") && (city !="")) {
                  filter = 'JobCity:"'+city+'"';
                  this.executeSearchFunction(keywordLocal,filter);
                } else if ((state != "") && (city =="")){
                  filter = 'JobState:"'+state+'"';
                  this.executeSearchFunction(keywordLocal,filter);
               } else {
                //filter ='JobCity:"'+city+'" OR JobState:"'+state+'"';
                // filter ='JobCity:"'+city+'"';
                //this.executeSearchFunction(keywordLocal,filter);
                  filter ='';
                  this.executeSearchFunction(keywordLocal,filter);
              }
              // console.log("Filter :::: "+filter);
              // console.log("keyword  :::: "+keywordLocal);              
            }
          } else {
            filter ='';
            this.executeSearchFunction(keywordLocal,filter);  //Execute the search 
          }
          
 
        //console.log("Filter :::::: => "+filter);
  
          // if (filter == '') {
          //   this.index.search({
          //     query: keywordLocal
    
          //   }).then((data) => {
          //     //let j=0;
          //     //this.PostJobcFinal = [];
          //     this.PostJobc = data.hits;
          //     //console.log("No City State");
          //     //this.SpinnerService.hide(); 
          //     this.loading = false; 
          //     this.setPage(1);
          //   });
          // } else  {
    
          //   this.index.search({
          //     query: keywordLocal,
          //     filters: filter
          //   }).then((data) => {
          //     //let j=0;
          //     //this.PostJobcFinal = [];
          //     this.PostJobc = data.hits;
          //     //this.SpinnerService.hide(); 
          //     //console.log("City or State");
          //     this.loading = false; 
          //     this.setPage(1);
    
          //   });
    
          // }


        }
      }

  }

  getZipCodeSearch(zipcode,keywordLocal) {
    //let getCcZipity  = new ZipCityState();
    //let getCity = SEARCH_CONFIG.GET_CITY_WITH_ZIP+zipcode;
    //console.log("Zip URL :::: "+getCity);
    //this.executeSearchFunction(keywordLocal,filter);  //Execute the search 
    //this.http.get(getCity,{responseType: 'json'}).subscribe((data: any[]) => {
      this.locserv.getCityStateFromZip(zipcode).subscribe((data: any[]) => {  
      // this.http.get(getCityID,{responseType: 'json',headers: headers})
      //          .map((data: any[]) => {
  
        const array = JSON.parse(JSON.stringify(data)) as any[];
        //console.log(array);

        this.getCityStateSearch(array['city'],array['state'],keywordLocal);

    });

  }

  getCityStateSearch(city, state,keywordLocal) {
    let cityD = new CityDetails();
    let check:boolean=false; 
    //console.log("this.cityModel.city");
    //let getCityID = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&limit=5&offset=0&hateoasMode=false";
    // let getCityID = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&countryIds="+SEARCH_CONFIG.GEODB_COUNTRY_ID+"&limit=20&offset=0&hateoasMode=false";
    // //console.log("this.cityModel.city  ::: "+getCityID);
    //this.http.get(getCityID,{responseType: 'json',headers: this.headers}).subscribe((data: any[]) => {
      this.locserv.getCityStateSearch(city).subscribe((data: any[]) => {

      // this.http.get(getCityID,{responseType: 'json',headers: headers})

    //          .map((data: any[]) => {

      const array = JSON.parse(JSON.stringify(data)) as any[];
      //console.log(array['data']);

      for(let i=0;i<array['data'].length;i++) {
        cityD = array['data'][i];

        if ((cityD.type.toLocaleUpperCase() == 'CITY') 
            && (cityD.countryCode.toUpperCase() == 'US')
            && (cityD.regionCode.toUpperCase() == state.toUpperCase())
            && (cityD.city.toUpperCase().startsWith(city.toUpperCase()))) {

              // console.log("ID : "+cityD.id);
              // console.log("City : "+cityD.city);
              // //console.log("name : "+this.cityModel.name);
              // console.log("countryCode : "+cityD.countryCode);
              // console.log("regionCode : "+cityD.regionCode);
              check=true;

              this.getNearByCities(cityD.id,city, state,keywordLocal);
              return;
        }
      }
      if (!check)
        this.getCitySearhOnly(array,city, state,keywordLocal);
      return;

    });
    // .toPromise();

  }

  getCitySearhOnly(array,city, state,keywordLocal) {
    let filter = 'JobCity:"'+city+'"';
    this.executeSearchFunction(keywordLocal,filter)

    // let cityD = new CityDetails();
    // for(let i=0;i<array['data'].length;i++) {
    //   cityD = array['data'][i];

    //   if ((cityD.type.toLocaleUpperCase() == 'CITY') 
    //       && (cityD.countryCode.toUpperCase() == 'US')
    //       && (cityD.city.toUpperCase().startsWith(city.toUpperCase()))) {

    //         //console.log("ID : "+cityD.id);
    //         // console.log("City : "+cityD.city);
    //         // //console.log("name : "+this.cityModel.name);
    //         // console.log("countryCode : "+cityD.countryCode);
    //         // console.log("regionCode : "+cityD.regionCode);

    //         this.getNearByCities(cityD.id,city, state,keywordLocal);
    //         return;
    //   }
    // }
    // this.notfoundAnything()
  }

  notfoundAnything() {
    this.noResultFound = "No Record(s) Found";
    this.loading = false; 

  }

  getNearByCities(cityID,city, state,keywordLocal) {
    let ncityD = new NearestCityDetails();
    //let filter = '(JobCity:"'+city+'" AND JobState:"'+state+'")';
    let filter = '((JobCity:"'+city+'")';

    //console.log("this.cityModel.city");
    //let getCityID = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&limit=5&offset=0&hateoasMode=false";
    //let getCityID = SEARCH_CONFIG.GEODB_API_URL+"/"+cityID+"/nearbyCities?radius=100&limit=20&offset=0&hateoasMode=false&countryIds="+SEARCH_CONFIG.GEODB_COUNTRY_ID;
    //console.log("this.cityModel.city  ::: "+getCityID);
    //this.http.get(getCityID,{responseType: 'json',headers: this.headers}).subscribe((data: any[]) => {
      this.locserv.getNearByCities(cityID).subscribe((data: any[]) => {
      // this.http.get(getCityID,{responseType: 'json',headers: headers})
      //          .map((data: any[]) => {
  
        const array = JSON.parse(JSON.stringify(data)) as any[];
        //console.log("Nearest City ::: "+array);
        
        for(let i=0;i<array['data'].length;i++) {
          filter = filter+' OR (JobCity:"'+ncityD.city+'")';
          //filter = filter+' OR (JobCity:"'+ncityD.city+'" AND JobState:"'+ncityD.regionCode+'")';
          ncityD = array['data'][i];
          //  console.log("ID : "+ncityD.id);
          //  console.log("City : "+ncityD.city);
          //  console.log("City : "+ncityD.regionCode);
          // console.log("City : "+ncityD.distance);
        }
        filter = filter+') AND (JobState:"'+state+'")';
        //console.log("filter ::: "+filter);
        this.executeSearchFunction(keywordLocal,filter);

    });
    return;
  }

  executeSearchFunction(keywordLocal,filter) {

    //console.log("filter ::: "+filter);
    if (filter == '') {
      //console.log("filter ::: Blank "+filter);
      this.index.search({
        query: keywordLocal,
        filters: 'isSearchable:true'
      }).then((data) => {
        //let j=0;
        //this.PostJobcFinal = [];
        this.PostJobc = data.hits;
        this.PostJobcAll = data.hits;
        //this.getEmpTypes();
        //console.log("No City State");
        //this.SpinnerService.hide(); 
        if (this.PostJobc.length == 0)  {
          this.searchParameter = true;
          this.notfoundAnything();
        }
        else {
          this.searchParameter = false;
        }   
        this.loading = false; 

        this.setPage(1);
      });
    } else  {
      filter = filter+" AND isSearchable:true"
     // console.log("filter ::: "+filter);
      this.index.search({
        query: keywordLocal,
        filters: filter
      }).then((data) => {
        //let j=0;
        //this.PostJobcFinal = [];
        this.PostJobc = data.hits;
        this.PostJobcAll = data.hits;
        // this.getEmpTypes();
        //this.SpinnerService.hide(); 
        //console.log("City or State");
        if (this.PostJobc.length == 0)  {
          this.searchParameter = true;
          this.notfoundAnything();
        }
        else {
          this.searchParameter = false;
        }
        this.loading = false; 
        this.setPage(1);

      });

    }
  }


  getEmpTypes() {

    //let tmpstr='([';
    this.EmpTypesList = new Array();
    this.etypeserv.getEmploymentTypesByUse("P").subscribe(etype => {
      this.EmpTypes = etype;
      
      for(let i=0;i<this.EmpTypes.length;i++) {
        //console.log("this.EmpTypeDropDown[i] : "+ this.EmpTypes[i].emptypeName);
        this.EmpTypesList[i] = this.EmpTypes[i].emptypeName;
        //console.log("this.EmpTypesList[i] : "+ this.EmpTypesList[i]);
        //this.EmpTypeDropDown[i].name = this.EmpTypes[i].emptypeName;
        //this.EmpTypesList[i] = this.EmpTypes[i].emptypeName
        //tmpstr = tmpstr+'{Name:'+this.EmpTypes[i].emptypeName+'},';
        
      }
      this.listJobForm.controls.empTypes
      .patchValue([...this.EmpTypesList.map(item => item.toString()), 0]);



      // console.log("this.EmpTypes  ::: "+this.EmpTypes.length);
      // //let tmpStr = JSON.parse(this.EmpTypes.toString());
      // for(let i=0;i<this.EmpTypes.length;i++) {
      //   //this.EmpTypeDropDown[i].name = this.EmpTypes[i].emptypeName;
      //   this.EmpTypeDropDown[i] = this.EmpTypes[i].emptypeName
      //   //tmpstr = tmpstr+'{Name:'+this.EmpTypes[i].emptypeName+'},';
      //   //console.log("this.EmpTypeDropDown[i] : "+ this.EmpTypeDropDown[i]);
      // }
      // tmpstr = tmpstr+'])'
      // //this.EmpTypeDropDown[i]
      // this.EmpTypeDropDown[i] = tmpstr.;
      // console.log("tmpStr  ::: "+tmpstr);
    });
  }

  favoriteJob(listjob) {
    //console.log("Pst Job ID :::: "+listjob.id);

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = this.pjob.ApplyToEmail;
    listjob.RequiredRefresh = "No"
    dialogConfig.data = listjob;
    // dialogConfig.height = "4";
    // dialogConfig.width ="3";      
     dialogConfig.height = "35%";
     if (this.mobile)
      dialogConfig.width ="90%";
     else 
      dialogConfig.width ="30%";
    this.dialog.open(SavejobComponent, dialogConfig);
  }
  
  setPage(page: number) {
    //console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.PostJobc.length, page);
    //console.log("Page Count...1  ::: "+this.pager.pages.length);
    // get current page of items
    this.pagedItems = this.PostJobc.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);
  }

  jobDetails(jobid) {
    //console.log("Job ID::::: +",jobid);
    // console.log("Search Componenet ******* "+jobsearchComponent.keyword+" Location "+jobsearchComponent.location);
    // this.router.navigate(['/jobdetails',jobid], { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
    this.router.navigate(['/jobdetails',jobid], { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
    // this.router.navigateByUrl('/jobdetails/'+jobid, { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
  }


  isNull(value) {
    if (value == null) { return "" }
    else { return value }
  }

  getDateDiff(dateIput) {
    //console.log("dateIput :: "+dateIput);
    let hleft=0;
    let lastModifyDate = new Date(dateIput);
    let finalResult='';
    let resultLessthan24 = '';
    let hr=0,min=0;
    //console.log("lastModifyDate ::: "+lastModifyDate);
    let hour=  Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(60*60*1000));
    let day = Math.round(hour/24);
    if (hour >=24){
      hleft = hour-day*24;
    } else {
      hleft = Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(60*1000));
      if (hleft > 60 ) {
        let hr =  Math.round(hleft/60);
        let min = hleft - hr*60;
        if (min < 0) min=60+min;
        resultLessthan24 = hr+" hours "+min+ " minutes ago";
      } else {
        resultLessthan24 = Math.abs(hleft)+" minutes ago";
      } 
    }

    if (hour<24?finalResult=resultLessthan24:finalResult= ""+day+" days "+Math.abs(hleft)+" hours ago") 
    // {
    //   finalResult=""+hleft+" hours ago";
    // } else {
    //   finalResult= ""+day+" days "+hleft+" hours ago";
    // }
      //let hleft= hour-day*24;

    //console.log("day ::: "+ day+ " Hour left : "+hleft);
    return finalResult;
    //return Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(24*60*60*1000));
    //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
  }


}
