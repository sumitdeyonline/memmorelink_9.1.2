import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, NgForm } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import {Observable} from 'rxjs';
import { take } from 'rxjs/operators';


import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { ToastrService } from 'ngx-toastr';
import {formatDate} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { Country } from 'src/app/services/firebase/userprofile/country.model';
import { State } from 'src/app/services/firebase/userprofile/state.model';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
//import { CommondialogComponent } from 'src/app/common/commondialog/commondialog.component';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { UserDetails } from 'src/app/services/firebase/userdetails/userdetails.model';
import { EmailService } from 'src/app/services/email/email.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEDITOR_CONF, SEARCH_CONFIG } from 'src/app/global-config';
import { CommondialogComponent } from 'src/app/common';
import { EmploymentTypes } from 'src/app/services/firebase/employmenttypes/employmenttypes.model';
import { EmploymenttypesService } from 'src/app/services/firebase/employmenttypes/employmenttypes.service';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import { CityDetails } from '../listjob/city.model';
import { isNumeric } from 'rxjs/util/isNumeric';
import { LocationService } from 'src/app/services/location/location.service';
import { stringify } from 'querystring';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Options } from 'ng5-slider';
//import { Sequence } from 'src/app/services/firebase/postjob/sequence.model';
import { SequencenumberService } from 'src/app/services/firebase/sequencenumber/sequencenumber.service';
import { Sequence } from 'src/app/services/firebase/sequencenumber/sequence.model';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-decoupled-document'; 

  
@Component({
  selector: 'postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {
  //@ViewChild('formField')   
  public mulObj: MultiSelectComponent; 

  searchvar =[];
  // formatter = (result: string) => result.toUpperCase();
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.trim().length < SEARCH_CONFIG.MAX_CHARACTER_TYPE_AHEAD  ? []
        : this.searchvar.filter(v => v.toLowerCase().indexOf(term.trim().toLowerCase()) > -1).slice(0, 10))
    )

    value: number = 0;
    options: Options = {
      floor: 0,
      ceil: 100,
      step: 5,
      showTicks: true
    };

  PostJobForm: any;
  // postjob = new PostJobc();
  postjobMessage: string;
  postjobSucessMessage: string;
  postJob:  PostJobc;
  //public pjob: PostJobc;
  id: any;
  postJobList: [any];
  countries: Country[];
  EmpTypes: EmploymentTypes[];
  //tmpstr:[];
  EmpTypeDropDown: string[];
  //EmpTypeDropDownTmp: string[];

  public localFields: Object = { text: 'Name' };
  state: State[];
  userDetails: UserDetails[];
  public sequence: Sequence[];
  isJobLength: boolean = false;
  postJobCount: number = 0;
  //selectedEmpTypes: String;
  // public signupMessage: string;
  // public signupSucessMessage:string;
  public Editor = ClassicEditor;
  EmploymentTypesField: string;
  mobile: boolean=false;

  constructor(private _activeRoute: ActivatedRoute, public _auth: AuthService, fb: FormBuilder, public postjobService: PostjobService,
              private toastrservice: ToastrService,
              private uProfile: UserprofileService,
              private router: Router,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              private udetails: UserdetailsService,
              private sEmail: EmailService,
              private etypeserv: EmploymenttypesService,
              private locserv: LocationService,
              private seqser: SequencenumberService) {
        window.scroll(0,0);
        this.getCountry();
        this.getEmpTypes();
        this.value = 0;

    // this.PostJobForm = fb.group({
    //   // email: ['', Validators.required,Validators.email],
    //   // password: ['', Validators.required,Validators.minLength(5)],
    //   // repassword: ['',Validators.required,Validators.minLength(5)]
    // })

    //console.log("Date :::::::: "+formatDate(new Date(), 'MM/dd/yyyy', 'en'));
    //this.signupMessage='';
    this._activeRoute.paramMap.subscribe(params => {
      this.id = params.get("id");
      //console.log("Key Value :::::::: "+this.id);
    });


    ClassicEditor
    // .create( document.querySelector( '#Editor' ), {
    .defaultConfig = {
      toolbar: {
        items: CKEDITOR_CONF.ITEMS
      },
      image: {
        toolbar: CKEDITOR_CONF.TOOLBAR
      },
      table: {
        contentToolbar: CKEDITOR_CONF.CONTENT_TOOLBAR // [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
      },
      language: CKEDITOR_CONF.LANGUAGE //'en'
    //});      
    };


    this.resetForm();

    // this.Editor.editorConfig.removePlugins = ['Image'];
    // console.log("We are in toolbar");
    // this.Editor.editorConfig = function( config ) {

    //   config.removePlugins = ['Image'];
    //   config.placeholder = 'Type the content here!';
    // };
    //console.log("NEW FORM ....1");
    this.udetails.getUserDetails(this._auth.userProfile.name,'U').subscribe(udtl=> {
//console.log("NEW FORM ....2 ::::: "+this.id);

      if ((this.id == null) || (this.id == '')) {
        //console.log("NEW FORM ....");
        this.value = 0;
        
        //console.log("this.value :: "+this.value+ " this.postjobService.selectedPostJobc.TravelRequirements : "+this.postjobService.selectedPostJobc.TravelRequirements);
        this.postjobService.selectedPostJobc.isSearchable = true;
        this.userDetails = udtl;
        if (this.userDetails.length > 0) {
          this.postjobService.selectedPostJobc.Company = this.userDetails[0].company;
          this.postjobService.selectedPostJobc.ApplyToEmail = this.userDetails[0].userName;
          if (this.userDetails[0].CompanyLogoURL !==undefined){
            this.postjobService.selectedPostJobc.CompanyLogoURL = this.userDetails[0].CompanyLogoURL;
          }

          if (this.userDetails[0].postjobCount !== undefined) {
            this.postJobCount = this.userDetails[0].postjobCount;
          }
          this.postjobService.selectedPostJobc.JobDesc = null;
          this.postjobService.selectedPostJobc.Skills = null;
          // console.log("Number of Job Count "+this.postJobCount);
          //console.log("ID :::::: "+ this.postjobService.selectedPostJobc.JobDesc);
        }
      } else {
        //console.log("UPDATE FORM ....");

        this.postjobService.getPostJobsById(this.id).subscribe(postJob=> {
          
          this.postJob = postJob;
          this.getFieldForUpdate();
          this.getState(this.postJob.JobCountry);
          this.isPayrate(this.postJob.JobPayRate);
          //console.log("UPDATE FORM ....111111111122222 "+this.postJob.EmploymentTypes);
          //this.selectedEmpTypes = this.postJob.EmploymentTypes;
        })
      }


    });

  }

  ngOnInit() {
    // let dateFormat = require('mm/dd/yyyy');
    window.scroll(0,0);
    if (window.screen.width <= 736) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }


  }

  myjobList() {
    this.router.navigate(['/jobpoststatus']);  //, { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });    
  }

  JobPostSubmit(postJobForm : NgForm) {
    let type;
    let jobIDTemp;
    let updatedmsg;
    //console.log ("postJobForm.value.Email ::: "+postJobForm.value.Email);
    // postJobForm.value.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    // console.log ("Datatat ::: "+postJobForm.value.CreatedDate);
    if (postJobForm.value.JobLength === undefined) {
      postJobForm.value.JobLength = null;
    }

    if (postJobForm.value.JobPayRate != 'Hourly') {
      postJobForm.value.JobLength = null;
    }

    if (postJobForm.value.CCToEmail === undefined) {
      postJobForm.value.CCToEmail = '';
    }

    if (postJobForm.value.ApplyToURL === undefined) {
      postJobForm.value.ApplyToURL = '';
    }

    if (postJobForm.value.country === undefined) {
      postJobForm.value.country = '';
    }
    if (postJobForm.value.state === undefined) {
      postJobForm.value.state = '';
    }

    if (postJobForm.value.JobZip === undefined) {
      postJobForm.value.JobZip = '';
    }    

    if (postJobForm.value.EmploymentTypes === undefined) {
      postJobForm.value.EmploymentTypes = '';
    } 

    if (postJobForm.value.JobPayRate === undefined) {
      postJobForm.value.JobPayRate = '';
    } 

    if (postJobForm.value.Compensation === undefined) {
      postJobForm.value.Compensation = '';
    } 
    if (postJobForm.value.TravelRequirements === undefined) {
      postJobForm.value.TravelRequirements = '';
    } 
    if (postJobForm.value.CompanyLogoURL === undefined) {
      postJobForm.value.CompanyLogoURL = '';
    } 

    //console.log("postJobForm.value.isTeleComute :::::===>>>> "+postJobForm.value.isTeleComute);

    if (postJobForm.value.isTeleComute === undefined) {
      postJobForm.value.isTeleComute = false;
    }     
    
    // postJobForm.value.EmploymentTypes = this.mulObj.value; // For other drop down
    if (postJobForm.value.TravelRequirements == 0) {
      postJobForm.value.TravelRequirements = 'No Travel';
    } else {
      postJobForm.value.TravelRequirements = postJobForm.value.TravelRequirements+'% Travel'
    }
    //console.log("postJobForm.value.TravelRequirements : "+postJobForm.value.TravelRequirements);

    let pjob:PostJobc = {JobTitle:postJobForm.value.JobTitle,
      JobDesc:postJobForm.value.JobDesc,
      Skills:postJobForm.value.Skills,
      Company:postJobForm.value.Company,
      CompanyLogoURL:postJobForm.value.CompanyLogoURL,
      ApplyToEmail:postJobForm.value.ApplyToEmail,
      CCToEmail:postJobForm.value.CCToEmail,
      ApplyToURL:postJobForm.value.ApplyToURL,
      JobCity:postJobForm.value.JobCity,
      JobState:postJobForm.value.JobState,
      JobCountry:postJobForm.value.JobCountry,
      JobZip:postJobForm.value.JobZip,
      EmploymentTypes:postJobForm.value.EmploymentTypes,   
      JobPayRate:postJobForm.value.JobPayRate,  
      Compensation:postJobForm.value.Compensation,  
      JobLength:postJobForm.value.JobLength,  
      TravelRequirements:postJobForm.value.TravelRequirements,  
      isTeleComute:postJobForm.value.isTeleComute,  
      isSearchable:postJobForm.value.isSearchable,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
     }

    if ((this.id == null) || (this.id == '')) {

      this.postJobCount = this.postJobCount + 1;
      this.userDetails[0].postjobCount = this.postJobCount;
      //console.log("Employee type :: "+this.mulObj.value);
      // console.log("Form Value ::: JobTitle"+postJobForm.value.JobTitle);
      // console.log("Form Value ::: city"+postJobForm.value.city);
      // console.log("Form Value ::: state"+postJobForm.value.state);
      // console.log("Form Value ::: country"+postJobForm.value.country);
      // console.log("Form Value ::: company"+postJobForm.value.company);
      // console.log("Form Value :::JobDesc "+postJobForm.value.JobDesc);
      // console.log("Form Value ::: Skills"+postJobForm.value.Skills);
      // console.log("Form Value ::: employmenttypes"+postJobForm.value.employmenttypes);
      // console.log("Form Value ::: Compensation"+postJobForm.value.Compensation);
      // console.log("Form Value :::TravelRequirements "+postJobForm.value.TravelRequirements);
      // console.log("Form Value ::: isTeleComute"+postJobForm.value.isTeleComute);





      //let id = 'O7TvY8yrEsJY0UHonBDr';
      //let number = this.seqser.getUpdateSequenceNumber(id);
      //console.log("Number ::: "+number);
      this.seqser.getUpdateSequenceNumber().subscribe(sequence=>{
        this.sequence = sequence;
        //console.log("Sequence ::: "+this.sequence[0].SeqNum);
        //let num = this.sequence[0].SeqNum+1;
        //this.postjobService.updateData(id,this.sequence[0].SeqNum+1);


//postJobForm.value.CreatedDate = new Date();

        pjob.CreatedDate =  new Date();

//pjobc.CreatedDate = new Date();

//console.log("Job Count :::: "+uDetails.CompanyLogoURL);

//postJobForm.value.CreatedBy = this._auth.userProfile.name;

        pjob.CreatedBy=this._auth.userProfile.name;

//postJobForm.value.JobID = ""+this.sequence.SeqNum;
        pjob.JobID = ""+this.sequence[0].SeqNum;

// if (uDetails.company.length > 10) {
//   pjobc.JobID = uDetails.company.replace(/[^a-zA-Z0-9]/g,'').substring(0,10).toUpperCase()+"-"+uDetails.postjobCount;
// } else {
//   pjobc.JobID = uDetails.company.replace(/[^a-zA-Z0-9]/g,'').toUpperCase()+"-"+uDetails.postjobCount;
// }


        //this.postjobService.addUpdatePostJobs(postJobForm.value,this.id, new Date(), "", this.userDetails[0],1510);
        this.postjobService.addUpdatePostJobs(pjob,this.id, new Date(), "", this.userDetails[0]);
        type = "Created";
        return;
      });

      // console.log("postJobForm.value.isSearchable : "+postJobForm.value.isSearchable);
      // this.postjobService.addUpdatePostJobs(postJobForm.value,this.id, new Date(), "", this.userDetails[0]);
      // console.log("NEW FORM ....");
      type = "Created";
      updatedmsg = "You have posted your job";
    } else {
      type = "Updated";

      pjob.JobID = ""+this.postJob.JobID;
      //this.userDetails[0]={};
      //this.postjobService.addUpdatePostJobs(postJobForm.value,this.id,this.postJob.CreatedDate, this.postJob.CreatedBy, null);
      this.postjobService.addUpdatePostJobs(pjob,this.id,this.postJob.CreatedDate, this.postJob.CreatedBy, null);
      updatedmsg = "You have edited your job";
    }

    //console.log("$Key VALUE :::::: "+postJobForm.value.$key);

    //this.faqservice.updateFaq(faqForm.value);
    /*this.faqservice.insertFaq(faqForm.value);
    this.resetForm(faqForm);
    console.log("Submit Data "+faqForm.value);*/


    //console.log("Pst Job ID :::: "+pjob.id);


    // if ((this.id == null) || (this.id == '')) {

    //   //this.toastrservice.success('Added Sucessfully', '');
    //   //this.toastrservice.success(FIREBASE_CONFIG.AddedSucessfully, '');
    //   //console.log("Added Sucessfully");
    // } else {
    //   //this.toastrservice.success('UpdatedSucessfully', '');
    //   //this.toastrservice.success(FIREBASE_CONFIG.UpdatedSucessfully, '');
    //   //console.log("Updated Sucessfully");
    // }

    // dialogConfig.height = "4";
    // dialogConfig.width ="3";


      /* Email Start */
      let subject='';
      let body= '';
      if ((this.id == null) || (this.id == '')) {
        subject = 'You have posted your job: '+postJobForm.value.JobTitle;
        body = 'Thank you <b>'+postJobForm.value.ApplyToEmail+'</b> for posting the job <br/><br/> <b>Job Title: </b>'+postJobForm.value.JobTitle+'  <br/> <b>Job Location: </b>'+postJobForm.value.JobCity+', '+postJobForm.value.JobState+', '+postJobForm.value.JobCountry+'<br /> <b>Job Description : </b>'+postJobForm.value.JobDesc+' <br />  <br><br> <b>Thank you <br>MemoreLink Team</b>'
    
      } else {
        subject = 'You have updated your job: '+postJobForm.value.JobTitle;
        body = 'Thank you <b>'+postJobForm.value.ApplyToEmail+'</b> for updating the job <br/><br/> <b>Job Title: </b>'+postJobForm.value.JobTitle+'  <br/> <b>Job Location: </b>'+postJobForm.value.JobCity+', '+postJobForm.value.JobState+', '+postJobForm.value.JobCountry+'<br /> <b>Job Description : </b>'+postJobForm.value.JobDesc+' <br />  <br><br> <b>Thank you <br>MemoreLink Team</b>'

      }

    this.sEmail.sendEmail(postJobForm.value.ApplyToEmail,'',subject,body,'job');

    if ((postJobForm.value.CCToEmail != null) && (postJobForm.value.CCToEmail != undefined)) {
      if (postJobForm.value.CCToEmail.trim() !='') {
        this.sEmail.sendEmail(postJobForm.value.CCToEmail,'',subject,body,'job');
      } else {
        //console.log("No CC email");
      }
    }    
 
    setTimeout(() => {
      window.scroll(0,0);
      const dialogConfig = new MatDialogConfig();
      //dialogConfig.data = type+"||jobpoststatus||You have posted your job";
      dialogConfig.data = type+"||jobpoststatus||"+updatedmsg;
      
      this.dialog.open(CommondialogComponent, dialogConfig);
      this.resetForm(postJobForm);
  
      this.router.navigate(['/jobpoststatus']);
    }, 500);

    /*setTimeout(() => {

      this.dialog.closeAll();
      window.scroll(0,0);
      this.router.navigate(["jobpoststatus"]);
      window.scroll(0,0);
    }, 1000);*/

    //this.router.navigate(["jobpoststatus"]);

    //this.router.navigate([FIREBASE_CONFIG.FaqURL]);
  }

  getCountry() {
    this.uProfile.getCountry().subscribe(cprop => {
      this.countries = cprop;
      //console.log("Country :::::::: => "+this.countries.length);
    })
  }

  
  // onMultipleChange() {
  //   console.log("EmploymentTypesField  "+this.mulObj.value);
  // }

  getEmpTypes() {
    let tmpstr='([';
    this.EmpTypeDropDown = new Array();
    this.etypeserv.getEmploymentTypesByUse("P").subscribe(etype => {
      this.EmpTypes = etype;
      
      // console.log("this.EmpTypes  ::: "+this.EmpTypes.length);
      // //let tmpStr = JSON.parse(this.EmpTypes.toString());
      for(let i=0;i<this.EmpTypes.length;i++) {
        //this.EmpTypeDropDown[i].name = this.EmpTypes[i].emptypeName;
        this.EmpTypeDropDown[i] = this.EmpTypes[i].emptypeName
        //tmpstr = tmpstr+'{Name:'+this.EmpTypes[i].emptypeName+'},';
        //console.log("this.EmpTypeDropDown[i] : "+ this.EmpTypeDropDown[i]);
      }
      // tmpstr = tmpstr+'])'
      // //this.EmpTypeDropDown[i]
      // this.EmpTypeDropDown[i] = tmpstr.;
      // console.log("tmpStr  ::: "+tmpstr);
    })

  }


  getState(country,selectstate?) {

    if (selectstate == undefined || selectstate == null || this.postjobService.selectedPostJobc.JobState != selectstate) {

      this.uProfile.getStateDetails(country).subscribe(sprop => {
        this.state = sprop;
        if (selectstate !=null && selectstate !=undefined){
          this.postjobService.selectedPostJobc.JobState= selectstate;
        }
        //console.log("State :::::::: => "+this.state.length);
      })
    }
  }

  setCountryState(location) {

    const item = location.item.split(',');
    let countyCode='';
    // if (item.regionCode === 'regionCode') {
    //  this.form.query = item.value;
    // }


    // console.log("City ::: "+item[0]);
    // console.log("State ::: "+item[1]);
    // console.log("Country ::: "+item[2]);
    if (item[2] == 'US') countyCode = 'USA';
     this.postjobService.selectedPostJobc.JobCity = item[0];
     this.postjobService.selectedPostJobc.JobCountry = countyCode;
    this.getState(countyCode,item[1]);
    // console.log("this.postjobService.selectedPostJobc.JobCity item[0] "+item[0]);
    // if (this.postjobService.selectedPostJobc.JobCity == item[0]) {
    //   this.postjobService.selectedPostJobc.JobCity = item[0]+'';
    //   console.log("this.postjobService.selectedPostJobc.JobCity Inside 1"+this.postjobService.selectedPostJobc.JobCity);
    //   //this.postjobService.selectedPostJobc.JobCity = item[0];
    //   console.log("this.postjobService.selectedPostJobc.JobCity Inside 2 "+this.postjobService.selectedPostJobc.JobCity);
    // } else {
    //   this.postjobService.selectedPostJobc.JobCity = item[0];
    // }
    // console.log("this.postjobService.selectedPostJobc.JobCity  "+this.postjobService.selectedPostJobc.JobCity);

    // console.log("this.postjobService.selectedPostJobc.JobCity  After :: "+this.postjobService.selectedPostJobc.JobCity);
    //this.postjobService.selectedPostJobc.JobState= item[1];


  }

  isPayrate(empprate) {
     if (empprate == 'Hourly')
      this.isJobLength = true;
    else {
      this.isJobLength = false;

    }


  }


  resetForm(postJobForm?: NgForm) {
    if (postJobForm !=null)
    postJobForm.reset();
      this.postjobService.selectedPostJobc = {
        //id: '',
        // question: '',
        // answer: '',
        // category: '',
        // details: ''
      }
      this.postjobService.selectedPostJobc.isTeleComute=true;
      //this.postjobService.selectedPostJobc.TravelRequirements='No Travel';
      if (this.postjobService.selectedPostJobc.TravelRequirements == undefined) {
        this.postjobService.selectedPostJobc.TravelRequirements = "0";
      }
      //this.mulObj.value = [];
  }


  checkSecureImageURL(urlVal: string) {

    if ((urlVal == null) || (urlVal == 'undefined')) {
      // console.log("urlVal 1 : "+urlVal);
      return true;
    }
    else {
      if (urlVal.trim() == '') {  return true;}
      else if (urlVal.trim().startsWith('https://'))  { return true;}
      else { return false;} 
    }
    return true;
  }



  getFieldForUpdate() {
    
//console.log("this.postJob========>>>>>"+this.postJob.JobID);

    this.postjobService.selectedPostJobc.JobID = this.postJob.JobID;
    this.postjobService.selectedPostJobc.id = this.id;
    this.postjobService.selectedPostJobc.JobTitle = this.postJob.JobTitle;
    this.postjobService.selectedPostJobc.JobDesc = this.postJob.JobDesc;
    this.postjobService.selectedPostJobc.Skills = this.postJob.Skills;
    this.postjobService.selectedPostJobc.Company = this.postJob.Company;
    this.postjobService.selectedPostJobc.CompanyLogoURL = this.postJob.CompanyLogoURL;

    this.postjobService.selectedPostJobc.ApplyToEmail = this.postJob.ApplyToEmail;
    this.postjobService.selectedPostJobc.CCToEmail = this.postJob.CCToEmail;
    this.postjobService.selectedPostJobc.ApplyToURL = this.postJob.ApplyToURL;
    this.postjobService.selectedPostJobc.JobCity = this.postJob.JobCity;
    this.postjobService.selectedPostJobc.JobState = this.postJob.JobState;
    this.postjobService.selectedPostJobc.JobCountry = this.postJob.JobCountry;
    this.postjobService.selectedPostJobc.JobZip = this.postJob.JobZip;

    this.postjobService.selectedPostJobc.EmploymentTypes = this.postJob.EmploymentTypes;

    //console.log("this.postJob.EmploymentTypes :: "+this.postJob.EmploymentTypes.toString().split(','));
    //this.mulObj.value = this.postJob.EmploymentTypes.toString().split(',');
    //this.EmpTypeDropDownTmp = this.postJob.EmploymentTypes.toString().split(',');  // for other drop down 

    this.postjobService.selectedPostJobc.JobPayRate = this.postJob.JobPayRate;
    this.postjobService.selectedPostJobc.Compensation = this.postJob.Compensation;
    this.postjobService.selectedPostJobc.JobLength = this.postJob.JobLength;

    //console.log("this.postjobService.selectedPostJobc.TravelRequirements ::===> "+this.postJob.TravelRequirements);

    let treq = this.postJob.TravelRequirements.substr(0,this.postJob.TravelRequirements.indexOf('%'));
    if (treq == "") {
      this.value = 0;
    } else {
      this.value = Number(treq); 
    }

    //this.postjobService.selectedPostJobc.TravelRequirements = this.postJob.TravelRequirements;
    this.postjobService.selectedPostJobc.isTeleComute = this.postJob.isTeleComute;
    this.postjobService.selectedPostJobc.isSearchable = this.postJob.isSearchable;

    if ((this.id == null) || (this.id == '')) {
      this.postjobService.selectedPostJobc.CreatedBy = this.postJob.CreatedBy;
      this.postjobService.selectedPostJobc.CreatedDate = this.postJob.CreatedDate;
    }
    this.postjobService.selectedPostJobc.LastModifiedBy = this.postJob.LastModifiedBy;
    this.postjobService.selectedPostJobc.LastModifiedDate = this.postJob.LastModifiedDate;

  }


  zipcodeCitySearch(localtionval) {
    let getcity='';
    let array=[];
    let cityD : CityDetails;
    // this.locserv.getCityStateFromZip(zipcode).then(() => {
    //   this.UploadResumeProfileBulk(uname,ResumeURL,ResumeFileName,contenttype,csvRecords); 
    // });
    //console.log("Zipcode :: "+zipcode);
    //console.log("XXXX==> : "+localtionval);

    if (localtionval.trim().length > SEARCH_CONFIG.MAX_CHARACTER_TYPE_AHEAD) {
      let inputval = localtionval.trim();
      if (isNumeric(inputval)) {
        if (localtionval.trim().length == SEARCH_CONFIG.MAX_CHARACTER_TYPE_AHEAD_ZIPCODE){
          this.locserv.getCityStateFromZip(inputval).subscribe((data: any[])=>{ 
            this.searchvar = [data['city']+","+data['state']];
            //console.log("Get value : "+this.form.controls['location'].getValue());

            //this.location = data['city']+","+data['state'];

            //return ['Livermore,CA'];
            //return [data['city']+","+data['state']];
          });
        }

      } else {
        this.locserv.getCityStateSearch(localtionval.trim()).subscribe((data: any[]) => {
          // this.http.get(getCityID,{responseType: 'json',headers: headers})
          //          .map((data: any[]) => {
      
            const array = JSON.parse(JSON.stringify(data)) as any[];
            //console.log(array['data']);
            
            for(let i=0;i<array['data'].length;i++) {
              cityD = new CityDetails();
              cityD = array['data'][i];
              this.searchvar[i] = cityD.city+","+cityD.regionCode+","+cityD.countryCode;

            }

        })

      }

    }
  }


}
