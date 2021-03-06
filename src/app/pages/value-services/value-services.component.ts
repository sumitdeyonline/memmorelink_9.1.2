import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormBuilder, Validators, NgForm, EmailValidator, FormGroup, FormControl  } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ValueServices } from 'src/app/services/authentication/valueservices.model';
import { AUTH_CONFIG, FIREBASE_CONFIG } from 'src/app/global-config';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { UserDetails } from 'src/app/services/firebase/userdetails/UserDetails.model';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { UserRole } from 'src/app/services/firebase/userprofile/userrole.model';
import { EmailService } from 'src/app/services/email/email.service';
import { AngularUtilityComponent } from 'src/app/common';
import {isNumeric} from 'rxjs/util/isNumeric';
import { Router } from '@angular/router';

@Component({
  selector: 'valueservices',
  templateUrl: './value-services.component.html',
  styleUrls: ['./value-services.component.css']
})
export class ValueServicesComponent implements OnInit {
  @ViewChild('recaptchavalueservice', {static: false }) recaptchaElement: ElementRef;
  public sitekey='';
  userDetails: UserDetails[];
  ValueServices: ValueServices[];
  valueservicesForm: any;
  //valueservices = new ValueServices();
  valueservicesMessage: string='';
  valueservicesSucessMessage: string='';
  error: any[];
  email: any = '';n
  postjob: boolean = false;
  resumesearch: boolean = false;
  UserRole: UserRole[];
  userActualRole: string;
  userDetailsID: string;
  companyName: string;
  companyAddress: string;
  jobcount: number = 0;
  utility = new AngularUtilityComponent();


  constructor(public _auth: AuthService,private router: Router, fb: FormBuilder, public udetails: UserdetailsService, private uProfile: UserprofileService, private sEmail: EmailService) {

    // this.valueservicesForm = fb.group({
    //   email: ['', Validators.required,Validators.email],
    //   password: ['', Validators.required,Validators.minLength(5)],
    //   repassword: ['',Validators.required,Validators.minLength(5)],
    //   postjob: [false],
    //   resumesearch: [false]
    // });
    window.scroll(0,0);
    this.resetForm();

    this.uProfile.getUserRoleDetails().subscribe(urole => {
      this.UserRole = urole;
      //console.log("User Role :::::::: => "+this.UserRole.length);
    })

    if (this._auth.isAuthenticated()) {

      this.udetails.getUserDetails(this._auth.userProfile.name, 'U').subscribe(udtl=> {
        this.userDetails = udtl;
        //console.log(" Length :::: "+this.userDetails.length);


        if (this.userDetails.length > 0) {
          this.userActualRole = this.userDetails[0].userRole;
          this.userDetailsID = this.userDetails[0].id;
          this.jobcount = this.userDetails[0].postjobCount;
          this.udetails.selectedValueServices.userRole = this.userDetails[0].userRole;
           this.udetails.selectedValueServices.company = this.userDetails[0].company;
           this.udetails.selectedValueServices.companyAddress = this.userDetails[0].companyAddress;
           this.udetails.selectedValueServices.CompanyLogoURL = this.userDetails[0].CompanyLogoURL;

           this.udetails.selectedValueServices.phone = this.userDetails[0].phone;
           this.udetails.selectedValueServices.auth0UserID = this.userDetails[0].auth0UserID.toString();

            // console.log("userDetailsID : "+this.userDetailsID);
            // console.log("this.udetails.selectedValueServices.userRole :: "+this.udetails.selectedValueServices.userRole);

        } else {
          this.userDetailsID = null;

        }


      })

    } else {

      //this.userDetailsID = "OWtPAfTTlpNM6o6U1F4o";
      //this.userActualRole = "EmployerPowerUser";
      this.udetails.selectedValueServices.userRole = "EmployerPowerUser";

      // console.log("userDetailsID : U "+this.userDetailsID);
      // console.log("this.udetails.selectedValueServices.userRole :: U "+this.udetails.selectedValueServices.userRole);


    }
    // this.valueservicesForm.postjob = false;
    // this.valueservicesForm.resumesearch = false;


  }


  ngOnInit() {
    this.addRecaptchaScript();
  }

  signUpValueServices(model: ValueServices) {
    //console.log("Value Radio Burron :::: ");
    // console.log("Value Radio Burron :::: "+model.userRole);
    // console.log("Company :::: "+model.company);
    // console.log("Company Address:::: "+model.companyAddress);
    this.valueservicesMessage = '';
    model.client_id = AUTH_CONFIG.clientID;
    model.connection = AUTH_CONFIG.connection;
    model.response_type = AUTH_CONFIG.responseType;
    this.userActualRole = model.userRole;
    if ((model.userRole == null) || (model.userRole == undefined) || (model.userRole == '')) {
      //console.log("Value NULL");
    } else {

      if (this.sitekey != '') {

        if (this._auth.isAuthenticated()) {
          model.email = this._auth.userProfile.name;
          //console.log("Company URL ::::: "+model.CompanyLogoURL);
          //console.log("this.udetails.selectedValueServices.auth0UserID ::::: "+this.udetails.selectedValueServices.auth0UserID);
          this.udetails.addUpdateUserDetails(this.userDetailsID, model.email, model.userRole, model.company, model.CompanyLogoURL, model.companyAddress, model.phone,this.jobcount,this.udetails.selectedValueServices.auth0UserID);
          this.valueservicesSucessMessage = model.email+" has been sucessfully updated."
          let subject = 'You have updated your profile';
          let body = 'Thank you <b>'+model.email+'</b> for updating your profile.<br /> <b>Thank you <br>MemoreLink Team</b> '
          this.sEmail.sendEmail(model.email,'',subject,body,'support');
          window.scroll(0,0);
          return true;
        } else {
          this._auth.signUp(model).subscribe(
            modelsignup => {
                // refresh the list
                //alert("User Addred");
                this.valueservicesSucessMessage = model.email+" has been sucessfully registered, Please check your email to verify your email ID";
                //console.log(this.valueservicesSucessMessage);
                //console.log("Value Radio Burron ::::===>>>>>>> "+this.userActualRole);
                this.udetails.addUpdateUserDetails(this.userDetailsID, model.email, this.userActualRole, model.company, model.CompanyLogoURL, model.companyAddress,  model.phone,this.jobcount,modelsignup['_id']);
                //this.router.navigate(['/signupconfirm']);
                /* Email Start */
                // let subject = 'Welcome to MeMoreLink!';
                // let body = 'Thank you <b>'+model.email+'</b> for registering <br><br> Company: '+model.company+'<br>Company Address: '+model.companyAddress+'<br>Company Phone: '+model.phone+' <br><br>  Best of luck! <br /><br /> <b>Thank you <br>MemoreLink Team</b> '
                // this.sEmail.sendEmail(model.email,'',subject,body,'support');
                window.scroll(0,0);
                return true;
            },
            error => {
              this.error = error;
              //console.log("Message 2 "+error);
              //console.log("Message 1 "+error[1].name);
              //console.log("Message 2 "+error.description);
              //this.signupMessage = error; //   "This user already exists."
              this.valueservicesSucessMessage = "User already exists or password does not satisfy minimum requrements"; //   "This user already exists."
            });
          }

        } else {
          alert("Please check I'm not a robot");
        }

      }
    }

    changeRoleValue(role) {
      //console.log("Role Value ::: "+role.value);
      this.udetails.selectedValueServices.userRole = role.value;
    }
    resetForm(valueservicesForm? : NgForm) {
      //this.signupError='';
      if (valueservicesForm !=null)
      valueservicesForm.reset();
      this.valueservicesMessage ='';
      this.valueservicesSucessMessage ='';

      this.udetails.selectedValueServices = {
        //id: '',
        // question: '',
        // answer: '',
        // category: '',
        // details: ''
      }

      //console.log("User Name "+SignupComponent.username+" Password "+SignupComponent.password+" Re Pass : "+SignupComponent.repassword);
      // SignupComponent.username='';
      // SignupComponent.password='';
      // SignupComponent.repassword='';
      // this.signup = new SignUp();
    }

    Fieldlength(fieldValue: string): number {
      //console.log("FIELD LENGTH .."+fieldValue);
      if (fieldValue == null) {
        return 0;
      } else {
        //console.log("FIELD LENGTH .."+fieldValue.length);
        return fieldValue.length;
      }

    }

    onFocus(event) {
      this.valueservicesMessage = '';
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

    phoneNumberFormat(phone) {

      this.udetails.selectedValueServices.phone = this.utility.formatUSNumber(phone);
    }

    Cancel() {
      this.router.navigate(['/authlandingpage'])
    }


    renderReCaptch() {
      setTimeout(() =>{
      //if (this.recaptchaElement != undefined && this.recaptchaElement !=null) {
        window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
          'sitekey' : AUTH_CONFIG.SiteKey,
          'callback': (response) => {
            this.sitekey = response;
              //console.log(response);
          }
        });
      //}
      }, 100); 
  
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
