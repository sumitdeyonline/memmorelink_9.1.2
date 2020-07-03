import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SEARCH_CONFIG, AUTH_CONFIG } from 'src/app/global-config';
import { UserProfile } from 'src/app/services/firebase/userprofile/userprofile.model';
import { EmploymentTypes } from 'src/app/services/firebase/employmenttypes/employmenttypes.model';
import { Country } from 'src/app/services/firebase/userprofile/country.model';
import { State } from 'src/app/services/firebase/userprofile/state.model';
import { AngularUtilityComponent } from 'src/app/common';
import { WorkAuthorization } from 'src/app/services/firebase/userprofile/workauthorization.model';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { LocationService } from 'src/app/services/location/location.service';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { EmailService } from 'src/app/services/email/email.service';
import { MatDialog } from '@angular/material/dialog';
import { EmploymenttypesService } from 'src/app/services/firebase/employmenttypes/employmenttypes.service';
import { NgForm } from '@angular/forms';
import { CityDetails } from '../../listjob/city.model';
import { isNumeric } from 'rxjs/util/isNumeric';
import * as CryptoJS from 'crypto-js';
import { EncrdecrserviceService } from 'src/app/services/EncriptDecript/encrdecrservice.service';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent implements OnInit { 
  @ViewChild('recaptcha', {static: false }) recaptchaElement: ElementRef;
  
  userid='';
  searchvar =[];
  // formatter = (result: string) => result.toUpperCase();
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.trim().length < SEARCH_CONFIG.MAX_CHARACTER_TYPE_AHEAD  ? []
        : this.searchvar.filter(v => v.toLowerCase().indexOf(term.trim().toLowerCase()) > -1).slice(0, 10))
    )

  id: any;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  fileUploads: any[];
  uPloadFileKey: String;
  uProfileMessage: String ='';
  userProfile: UserProfile[];
  EmpTypes: EmploymentTypes[];
  isUpdate: boolean = false;
  isUpdateProfile: boolean = false;
  editProfileText: string ="Edit Profile";
  countries: Country[];
  states: State[];
  utility = new AngularUtilityComponent();
  isWorkAuthHide: boolean =false;
  mobile: boolean=false;
  userEmail:String='';

  workauthArray : WorkAuthorization[];

  constructor(private route: ActivatedRoute,
              private rUploadService: UploadResumeService, 
              private locserv: LocationService, 
              private changeDetector : ChangeDetectorRef, 
              public uProfile: UserprofileService, 
              private router: Router, 
              //public auth: AuthService, 
              private sEmail: EmailService, 
              private dialog: MatDialog,
              private etypeserv: EmploymenttypesService,
              private EncrDecr: EncrdecrserviceService) { 

    this.route.queryParams.subscribe(params => {
      this.userEmail = params['ur'];
      this.userid = this.EncrDecr.get(AUTH_CONFIG.secureKey,this.userEmail.trim());

      //console.log(" this.userid "+this.userid);
      //console.log("Keyword " + this.keyword);

    });

    this.getWorkAutjorization();
    this.uProfile.getUserDetails(this.userid,'U').subscribe(uprop=> {
      this.userProfile = uprop;
      this.resetForm();
      //this.countries = ['USA', 'Canada', 'Uk'];
      this.getCountry();
      this.getEmpTypes();
      //console.log("TEEESSSTTTTTTTTTT ===>>>>>>>>> "+this.userProfile.length);
      if (this.userProfile.length == 0) {

        //console.log("NEW FORM ....");
        this.isUpdate = false;
        this.isUpdateProfile = true;
        this.uProfile.selectedUserProfile.Email = this.userid;

        //console.log("NEW FORM ....");
      } else {
        //console.log("Edit FORM .... FOR "+this.userProfile.length+" ::::: ID :::::: => "+this.userProfile[0].id);
        //this.fileUploadEnabled = true;
        //console.log(" this.userProfile[0].EmploymentType ::: "+ this.userProfile[0].WorkAuthorization);
        //let result = this.workauthArray.find(tree => tree.name == this.userProfile[0].WorkAuthorization);



        //console.log("Result ::: "+result.name);
        //this.empTypeArray.find(this.userProfile[0].EmploymentType)
        // for (let i=0;i < this.empTypeArray.length ;i++){
        //   // if (this.empTypeArray[i].name == this.userProfile[0].EmploymentType)

        // }


        // this.getFieldForUpdate();
        // this.getState(this.userProfile[0].Country);
        // if (this.workauthArray?.find(tree => tree?.name == this.userProfile[0]?.WorkAuthorization) == undefined) {
        //   this.isWorkAuthHide = true;
        //   this.isUpdateProfile = false; 
        //   //console.log("Work auth ...... "+this.isWorkAuthHide);

        // }  
        // this.isUpdate = true;
        // this.isUpdateProfile = false;      
        // this.changeDetector.detectChanges();
      }
    })

    window.scroll(0,0);    

  }

  ngOnInit(): void {
    this.addRecaptchaScript();
    if (window.screen.width <= 736) { // 768px portrait
      this.mobile = true;
    }
  }







  getWorkAutjorization() {
    this.uProfile.getWorkAuthorization("C").subscribe(wauth => {
      this.workauthArray = wauth;
      //console.log("workauthArray :::::::: => "+this.workauthArray.length);
    })
  }

  getCountry() {
    this.uProfile.getCountry().subscribe(cprop => {
      this.countries = cprop;
      //console.log("Country :::::::: => "+this.countries.length);
    })
  }

  // getState(country) {
  //   this.uProfile.getStateDetails(country).subscribe(sprop => {
  //     this.state = sprop;
  //     //console.log("Country :::::::: => "+this.state.length);
  //   })
  // }

  getState(country,selectstate?) {

    if (selectstate == undefined || selectstate == null || this.uProfile.selectedUserProfile.State != selectstate) {
      this.uProfile.getStateDetails(country).subscribe(sprop => {
        this.states = sprop;
        if (selectstate !=null && selectstate !=undefined){
          // setTimeout(() => {
            this.uProfile.selectedUserProfile.State = selectstate;
          // }, 200);
  
          //console.log("selectstate  ::: "+this.uProfile.selectedUserProfile.State);
        } 
      })
    } 
    // else {
    //   if (this.uProfile.selectedUserProfile.State != selectstate) {
    //     this.uProfile.getStateDetails(country).subscribe(sprop => {
    //       this.states = sprop;
    //       if (selectstate !=null && selectstate !=undefined){
    //         // setTimeout(() => {
    //           this.uProfile.selectedUserProfile.State = selectstate;
    //         // }, 200);
    
    //         //console.log("selectstate  ::: "+this.uProfile.selectedUserProfile.State);
    //       } 
    //     })
    //   }
    // }

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
    this.getState(countyCode,item[1].toString().trim());
    this.uProfile.selectedUserProfile.City = item[0];
    //this.uProfile.selectedUserProfile.State= item[1];
    this.uProfile.selectedUserProfile.Country = countyCode;

  }

  getEmpTypes() {
    this.etypeserv.getEmploymentTypesByUse("").subscribe(etype => {
      this.EmpTypes = etype; 
      //console.log("Employment Type :: "+this.EmpTypes.length);
    })
  }

  resetForm(uprofileForm?: NgForm) {
    if (uprofileForm !=null)
    uprofileForm.reset();
      this.uProfile.selectedUserProfile = {
        //id: '',
        // question: '',
        // answer: '',
        // category: '',
        // details: ''
      }

  }


  userProfileSubmit(uprofileForm: NgForm) {
    //console.log("Start Saveing ");
    let type='';
    if (this.isUpdate) {
      type = "Updated";
      // this.userProfileAddUpdate(uprofileForm, this.uProfile.selectedUserProfile.id);
      // this.EnableEdit();
    } else {
      // New Entry
      type = "Created";
       this.userProfileAddUpdate(uprofileForm, null);
       this.EnableEdit();
       //window.scroll(0,0);



      // this.rUploadService.getFileUploads(Number(FIREBASE_CONFIG.TotalFile)).snapshotChanges().pipe(
      //   map(changes =>
      //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      //   )
      // ).subscribe(fileUploads => {
      //   this.fileUploads = fileUploads;
      //   console.log("File Upload Leanth =============================== "+this.fileUploads.length)
      //   for(let i=0;i<this.fileUploads.length; i++){

      //     if (this.rUploadService.downloadURL == this.fileUploads[i].url) {
      //       this.uPloadFileKey = this.fileUploads[i].key;
      //       console.log("File Key :::::::: " +this.fileUploads[i].key);
      //       console.log("File URL :::::::: " +this.fileUploads[i].url);
      //       console.log("File Name :::::::: " +this.fileUploads[i].name);
      //       this.userProfileAddUpdate(uprofileForm, null);
      //       this.EnableEdit();
      //       break;
      //     }

      //   }

      // });

    }

    /* Email Start */
    // let subject = 'You have updated your profile';
    // let body = 'Thank you '+this.auth.userProfile.name+'  for updating your profile.  <br /><br /> <b>Thank you <br>MemoreLink Team</b> '
    // this.sEmail.sendEmail(this.auth.userProfile.name,'',subject,body,'support');

    // window.scroll(0,0);
    // //this.getFilesWithDownloadURL(this.rUploadService.downloadURL);

    // window.scroll(0,0);
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = type+"||uploadresumepage||Your profile has been updated";
    // this.dialog.open(CommondialogComponent, dialogConfig);
    // this.router.navigate(['/uploadresumepage']);

    //this.uProfile.addUpdateUserProfile(uprofileForm.value,null);
  }

  EnableEdit() {
    
    if (!this.isUpdateProfile){
      this.isWorkAuthHide =false;
      this.editProfileText = "Cancel";
      this.isUpdateProfile = true;
      this.changeDetector.detectChanges();
    }

    else {
      // //console.log("Edit Profile ... ");
      // this.editProfileText ="Edit Profile";
      // //console.log("Befire UserProfile .......*******>>>>>>");
      // this.resetForm();
      // //this.getFieldForUpdate();
      // this.uProfile.getUserDetails(this.auth.userProfile.name,'U').subscribe(uprop=> {
      //   this.userProfile = uprop;
      //   this.getFieldForUpdate();
      //   this.isUpdateProfile = false;
      //   if (this.workauthArray.find(tree => tree.name == this.userProfile[0].WorkAuthorization) == undefined) {
      //     this.isWorkAuthHide = true;
      //     this.changeDetector.detectChanges();
      //   }

      // })
      //this.router.navigate(["userprofile"]);
    }


  }

  userProfileAddUpdate(uprofileForm: NgForm, useridParam: string) {

    // console.log ('First Name  ::: '+ uprofileForm.value.FirstName);
    // console.log ('LastName  ::: '+ uprofileForm.value.LastName);
     //console.log ('Sex  ::: '+ uprofileForm.value.Sex);
    // console.log ('Email  ::: '+ uprofileForm.value.Email);
     //console.log ('HomePhone  ::: '+ uprofileForm.value.HomePhone);
    // console.log ('CellPhone  ::: '+ uprofileForm.value.CellPhone);
    // console.log ('Address1  ::: '+ uprofileForm.value.Address1);

    if (uprofileForm.value.HomePhone == undefined) {
      uprofileForm.value.HomePhone = "";
    }

    if (uprofileForm.value.Address2 == undefined) {
      uprofileForm.value.Address2 = "";
    }

    if (uprofileForm.value.CurrentCompanySchool == undefined) {
      uprofileForm.value.CurrentCompanySchool = "";
    }
    
    if (uprofileForm.value.CurrentPosition == undefined) {
      uprofileForm.value.CurrentPosition = "";
    }    
    if (uprofileForm.value.state == undefined) {
      uprofileForm.value.state = "";
    }
    // console.log ('Address2  ::: '+ uprofileForm.value.Address2);
    // console.log ('City  ::: '+ uprofileForm.value.City);
    // console.log ('State  ::: '+ uprofileForm.value.State);
    if (uprofileForm.value.FaceBookURL == undefined) {
      uprofileForm.value.FaceBookURL = "";
    }
    // console.log ('FaceBookURL  ::: '+ uprofileForm.value.FaceBookURL);
    if (uprofileForm.value.LinkedinURL == undefined) {
      uprofileForm.value.LinkedinURL = "";
    }
    // console.log ('LinkedinURL  ::: '+ uprofileForm.value.LinkedinURL);
    if (uprofileForm.value.PersonalWebsite == undefined) {
      uprofileForm.value.PersonalWebsite = "";
    }
    //console.log ('PersonalWebsite  ::: '+ uprofileForm.value.PersonalWebsite);
    if (uprofileForm.value.EmploymentType == undefined) {
      uprofileForm.value.EmploymentType = "";
    }
    //console.log ('EmploymentType  ::: '+ uprofileForm.value.EmploymentType);
    if (uprofileForm.value.DesiredPosition == undefined) {
      uprofileForm.value.DesiredPosition = "";
    }
    //console.log ('DesiredPosition  ::: '+ uprofileForm.value.DesiredPosition);
    if (uprofileForm.value.DesiredSalary == undefined) {
      uprofileForm.value.DesiredSalary = "";
    }
    //console.log ('DesiredSalary  ::: '+ uprofileForm.value.DesiredSalary);
    if (uprofileForm.value.IsRelocate == undefined) {
      uprofileForm.value.IsRelocate = false;
    }
    //console.log ('IsRelocate  ::: '+ uprofileForm.value.IsRelocate);
    if (uprofileForm.value.IsTravel == undefined) {
      uprofileForm.value.IsTravel = false;
    }
    //console.log ('IsTravel  ::: '+ uprofileForm.value.IsTravel);
    if (uprofileForm.value.YearsofExperince == undefined) {
      uprofileForm.value.YearsofExperince = "";
    }
    //console.log ('YearsofExperince  ::: '+ uprofileForm.value.YearsofExperince);
    if (uprofileForm.value.WorkAuthorization == undefined) {
      uprofileForm.value.WorkAuthorization = "";
    }
    //console.log ('WorkAuthorization  ::: '+ uprofileForm.value.WorkAuthorization);
    if (uprofileForm.value.SecurityClearance == undefined) {
      uprofileForm.value.SecurityClearance = "";
    }
    //console.log ('SecurityClearance  ::: '+ uprofileForm.value.SecurityClearance);
    if (uprofileForm.value.CoverLetter == undefined) {
      uprofileForm.value.CoverLetter = "";
    }
    //console.log ('CoverLetter  ::: '+ uprofileForm.value.CoverLetter);
    if (uprofileForm.value.institute == undefined) {
      uprofileForm.value.institute = "";
    }
    //console.log ('institute  ::: '+ uprofileForm.value.institute);
    if (uprofileForm.value.instituteCity == undefined) {
      uprofileForm.value.instituteCity = "";
    }
    //console.log ('instituteCity  ::: '+ uprofileForm.value.instituteCity);
    if (uprofileForm.value.instituteCountry == undefined) {
      uprofileForm.value.instituteCountry = "";
    }
    //console.log ('instituteCountry - userProfileAddUpdate ::: '+ uprofileForm.value.instituteCountry);
    if (uprofileForm.value.SkillSet == undefined) {
      uprofileForm.value.SkillSet = "";
    }
    //console.log ('SkillSet  ::: '+ uprofileForm.value.SkillSet);
    if (uprofileForm.value.Education == undefined) {
      uprofileForm.value.Education = "";
    }

    if (uprofileForm.value.WorkAuthorization == 'Other') {
      uprofileForm.value.WorkAuthorization = this.userProfile[0].WorkAuthorization;
    }
    //console.log ('Education  ::: '+ uprofileForm.value.Education);
    //console.log ('SalaryExpectation  ::: '+ uprofileForm.value.SalaryExpectation);

    //console.log ('File Name   ::: '+ this.rUploadService.fileName);
    //console.log ('Job City   ::: '+ uprofileForm.value.City);

    // this.fileUploadEnabled = true; // Enabled File Download
    uprofileForm.value.Email = this.userid;
    if (useridParam == null){
      //uprofileForm.value.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      // uprofileForm.value.ResumeID = this.uPloadFileKey;
      // uprofileForm.value.ResumeFileName = this.rUploadService.fileName;
      //uprofileForm.value.ResumeURL = this.rUploadService.downloadURL;
      //uprofileForm.value.ResumeExt = this.rUploadService.fileName.substring(this.rUploadService.fileName.lastIndexOf(".")+1);
      uprofileForm.value.UserID = this.userid;
      uprofileForm.value.Username = this.userid;

      //console.log ('CreatedDate  ::: '+ uprofileForm.value.CreatedDate);
      //console.log ('ResumeID  ::: '+ uprofileForm.value.ResumeID);
      //console.log ('ResumeFileName  ::: '+ uprofileForm.value.ResumeFileName+' Extertion '+uprofileForm.value.ResumeFileName.substring(uprofileForm.value.ResumeFileName.length - 3,uprofileForm.value.ResumeFileName.length));
      //console.log ('ResumeFileName  ::: '+ uprofileForm.value.ResumeFileName+' Extertion '+uprofileForm.value.ResumeFileName.substring(uprofileForm.value.ResumeFileName.lastIndexOf(".")+1));

       //console.log ('ResumeURL  ::: '+ uprofileForm.value.ResumeURL);
       //console.log ('ResumeExt  ::: '+ uprofileForm.value.ResumeExt);
      // console.log ('UserID  ::: '+ uprofileForm.value.UserID);
      // console.log ('Username  ::: '+ uprofileForm.value.Username);
      this.uProfile.addUpdateUserProfile(uprofileForm.value, this.id, new Date());
      
      //this.router.navigate(['/uploadresumeregistration'],{ queryParams: {userid: this.userEmail}, 'queryParamsHandling': 'merge' });
      this.router.navigate(['/uploadresumeregistration'],{ queryParams: {ur: this.userEmail}, 'queryParamsHandling': 'merge' });
      
    } else {
      //this.isWorkAuthHide = false;
      //uprofileForm.value.ModifiedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      // if (this.uPloadFileKey !=null)
      //   uprofileForm.value.ResumeID = this.uPloadFileKey;
      // else {
      //   uprofileForm.value.ResumeID = this.uProfile.selectedUserProfile.ResumeID;
      // }
      // if (this.rUploadService.fileName !=null) {
      //   uprofileForm.value.ResumeFileName = this.rUploadService.fileName;

      // } else {
      //   uprofileForm.value.ResumeFileName = this.uProfile.selectedUserProfile.ResumeFileName;
      // }

      // if (this.rUploadService.downloadURL !=null)
      //   uprofileForm.value.ResumeURL = this.rUploadService.downloadURL;
      // else
      //   uprofileForm.value.ResumeURL = this.uProfile.selectedUserProfile.ResumeURL;

      // if (this.rUploadService.fileName !=null)
      //   uprofileForm.value.ResumeExt = this.rUploadService.fileName.substring(this.rUploadService.fileName.lastIndexOf(".")+1);
      // else
      //   uprofileForm.value.ResumeExt =  this.uProfile.selectedUserProfile.ResumeExt;
      //console.log ('CreatedDate  ::: '+ uprofileForm.value.CreatedDate);
      // if (uprofileForm.value.ResumeID == null) {
      //   uprofileForm.value.ResumeID
      // }
      //console.log ('ResumeID  ::: '+ uprofileForm.value.ResumeID);
      //console.log ('ResumeFileName  ::: '+ uprofileForm.value.ResumeFileName+' Extertion '+uprofileForm.value.ResumeFileName.substring(uprofileForm.value.ResumeFileName.length - 3,uprofileForm.value.ResumeFileName.length));

      // console.log ('ResumeURL  ::: '+ uprofileForm.value.ResumeURL);
      // console.log ('ResumeExt  ::: '+ uprofileForm.value.ResumeExt);
      //console.log ('UserID  ::: '+ uprofileForm.value.UserID);
      // console.log ('Resume File Name  ::: '+ this.uProfile.selectedUserProfile.ResumeFileName);
      this.uProfile.addUpdateUserProfile(uprofileForm.value, useridParam, this.userProfile[0].CreatedDate);

    }


  }

  formatPhoneNumvber(phone) {
    return this.utility.formatUSNumber(phone);
  }

  selectWorkAuthorization(event) {
    //console.log("work auth :: "+event);
    if (event == 'Other') {
      setTimeout(()=> {
        this.isWorkAuthHide = true;
        if (this.userProfile[0] !=undefined && this.userProfile[0] !=null) {
          this.uProfile.selectedUserProfile.WorkAuthorization = this.userProfile[0].WorkAuthorization;
          this.changeDetector.detectChanges();
        }

    }, 0);

    }
  }

  phoneNumberFormatCell(phone) {
    this.uProfile.selectedUserProfile.CellPhone =  this.utility.formatUSNumber(phone)
  }
  phoneNumberFormatHome(phone) {
    this.uProfile.selectedUserProfile.HomePhone =  this.utility.formatUSNumber(phone)
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

  renderReCaptch() {

    if (this.recaptchaElement != undefined && this.recaptchaElement !=null) {
      window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
        'sitekey' : AUTH_CONFIG.SiteKey,
        'callback': (response) => {
            //console.log(response);
        }
      });
    }


  }
 
  addRecaptchaScript() {
 
    window['grecaptchaCallback'] = () => {
      this.renderReCaptch();
    }
 
    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(); return;}
      js = d.createElement(s); js.id = id;
      js.src = AUTH_CONFIG.GoogleRecaptchaSite;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
 
  }

}
