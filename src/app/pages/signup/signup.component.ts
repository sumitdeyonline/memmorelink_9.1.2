import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm, EmailValidator, FormGroup, FormControl  } from '@angular/forms';
import { Signup } from '../../services/authentication/signup';
import { AuthService } from '../../services/authentication/auth.service';
import { AUTH_CONFIG, FIREBASE_CONFIG } from '../../global-config';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { EmailService } from 'src/app/services/email/email.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: any;
  signup = new Signup();
  signupMessage: string='';
  signupSucessMessage: string='';

  error: any[]; // {"name":"BadRequestError","code":"user_exists","description":"The user already exists.","statusCode":400}

  constructor(public _auth: AuthService, fb: FormBuilder, private udetails: UserdetailsService, private sEmail: EmailService) {
    window.scroll(0,0);
    this.signupForm = fb.group({
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required,Validators.minLength(5)],
      repassword: ['',Validators.required,Validators.minLength(5)]
    })

  }

  ngOnInit() {
    window.scroll(0,0);
  }

  signUp(model: Signup) {
    this.signupMessage = '';
    model.client_id = AUTH_CONFIG.clientID;
    model.connection = AUTH_CONFIG.connection;
    model.response_type = AUTH_CONFIG.responseType;

    //model.username = "Sumit Dey";
    this._auth.signUp(model).subscribe(
      modelSignup => {
          // refresh the list
          //alert("User Addred");
          this.signupSucessMessage = model.email+" has been sucessfully registered"
          //console.log(this.signupSucessMessage);
          //console.log("modelSignup :: " +modelSignup['_id']);
          this.udetails.addUpdateUserDetails(null, model.email,FIREBASE_CONFIG.UserRole, model.company, null,model.companyAddress,model.phone,0,modelSignup['_id']);
          //this.router.navigate(['/signupconfirm']);
          let subject = 'Welcome to MeMoreLink!';
          let body = 'Thank you <b>'+model.email+'</b> for registering.<br/><br/>Best of luck <br /><br /> <b>Thank you <br>MeMoreLink Team</b> '
          this.sEmail.sendEmail(model.email,'',subject,body,'support');
          window.scroll(0,0);
          return true;
      },
      error => {
        this.error = error;
        //console.log("Message 2 "+error);
        //console.log("Message 1 "+error[1].name);
        //console.log("Message 2 "+error.description);
        //this.signupMessage = error; //   "This user already exists."
        this.signupMessage = "User already exists or password does not satisfy minimum requrements"; //   "This user already exists."
      });



      // {
      //     //alert("Error : "+error.description);
      //     console.error("Error Adding User" + error.description);
      //     this.signupMessage = "User Exists";
      //     //this.signupMessage = error.description;
      //     //return Observable.throw(error);
      // });
    }
    
    resetForm(signupForm? : NgForm) {
      //this.signupError='';
      if (signupForm !=null)
      signupForm.reset();
      this.signupMessage ='';
      this.signupSucessMessage ='';
      //console.log("User Name "+SignupComponent.username+" Password "+SignupComponent.password+" Re Pass : "+SignupComponent.repassword);
      // SignupComponent.username='';
      // SignupComponent.password='';
      // SignupComponent.repassword='';
      // this.signup = new SignUp();
    }

    onFocus(event) {
      this.signupMessage = '';
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

}
