import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from './Login';
import { AuthService } from '../../services/authentication/auth.service';
import { AUTH_CONFIG } from 'src/app/global-config';
import { RecaptchaService } from 'src/app/services/recaptcha/recaptcha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('recaptchasignin', {static: false }) public recaptchaElement: ElementRef;
  //@ViewChild('recaptcha', {static: false }) recaptchaElement;
  // allowSubmit = false;
  public sitekey='';
  title = '';
  form;
  error='';
  login = new Login();
  loginError = '';
  mobile: boolean=false;
  //userIdPasswordWrong ='';
  constructor(fb: FormBuilder, 
              public _auth: AuthService,
              public recaptcha: RecaptchaService,
              private router: Router) {
    window.scroll(0,0);
    //this.addRecaptchaScript();
    //console.log("Constrator ....... ");
    //this.recaptcha.addRecaptchaScript(this.recaptchaElement);
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    
  }

  ngOnInit() {
    this.addRecaptchaScript();

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    //console.log("afterinit");
    //this.addRecaptchaScript();
    //console.log(this.recaptchaElement.nativeElement.value); 
    //this.recaptcha.addRecaptchaScript(this.recaptchaElement);
    window.scroll(0,0);
    if (window.screen.width <= 736) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }

    if (localStorage.getItem(AUTH_CONFIG.authErrorMeg)=='No') {
      this.loginError = AUTH_CONFIG.authErrorMegDetails;
      localStorage.removeItem(AUTH_CONFIG.authErrorMeg);
    }
  }

  // ngAfterContentInit() {
  //   this.addRecaptchaScript();
  // }

  Login(loginComponent) {
    //console.log("UserName and PAssword");
    //this._auth.setLoginError('');

    //if (this.recaptchaElement != undefined && this.recaptchaElement !=null) {
      //console.log("this.recaptchaElement:::: "+ this.recaptchaElement)
      //var element = (<HTMLInputElement>document.getElementById("name")).value;
      if (this.sitekey != '') {
 
        this.loginprocess(loginComponent);
      } else {
        alert("Please check I'm not a robot");
      }
      // console.log("Element :: "+this.sitekey);
    // } else {

    //   this.loginprocess(loginComponent);
    // }
 
    //console.log("Login Componenet *******");


     
     
    //this._authService.login();
    //this._authService.getProfile();
  }


  loginprocess(loginComponent) {
       this.loginError ='';
        this._auth.login(loginComponent.username, loginComponent.password);
     
        //this.addRecaptchaScript();
        
         setTimeout(() =>{
          if (this._auth.isAuthenticated()) {
            //console.log("Authenticated ....");
          } else {
            //this.login.username = '';
    
    
              this.login.password = '';
              //this.loginError ='Wrong Username or Password';
              this.loginError = localStorage.getItem(AUTH_CONFIG.authErrorMeg);
              localStorage.removeItem(AUTH_CONFIG.authErrorMeg);
            //console.log("ERROR ::::::::: --->>>>>"+this._auth.getLoginErrorMsg());
            //console.log("ERROR ::::::::: --->>>>>"+this.loginError);
          }
         }, 1000);  
  }

  /*public setuserIdPasswordWrongText(errorMsg) {
    this.userIdPasswordWrong = errorMsg;
  }*/

  renderReCaptch() {
    //console.log("Repatch ..")

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

  // capcha_filled () {
  //   this.allowSubmit = true;
  // }

  // capcha_expired () {
  //   this.allowSubmit = false;
  // }


}