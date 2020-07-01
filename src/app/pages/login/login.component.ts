import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from './Login';
import { AuthService } from '../../services/authentication/auth.service';
import { AUTH_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = '';
  form;
  error='';
  login = new Login();
  loginError = '';
  mobile: boolean=false;
  //userIdPasswordWrong ='';
  constructor(fb: FormBuilder, 
              public _auth: AuthService) {
    window.scroll(0,0);
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
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

  Login(loginComponent) {
    //console.log("UserName and PAssword");
    //this._auth.setLoginError('');

    //console.log("Login Componenet *******");
    this.loginError ='';
    this._auth.login(loginComponent.username, loginComponent.password);
 
    
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
    //this._authService.login();
    //this._authService.getProfile();
  }

  /*public setuserIdPasswordWrongText(errorMsg) {
    this.userIdPasswordWrong = errorMsg;
  }*/

}