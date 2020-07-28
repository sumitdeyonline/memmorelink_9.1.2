import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '../Login';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  @ViewChild('recaptcharesetpassword', {static: false }) public recaptchaElement: ElementRef;
  form;
  error='';
  login = new Login();
  loginError = '';
  public sitekey='';

  constructor(fb: FormBuilder,
    public _auth: AuthService,private router: Router) {

      this.form = fb.group({
        username: ['', Validators.required]
      })

    }

  ngOnInit() {
    this.addRecaptchaScript();
  }

  ResetPassword(resetComponent) {
    //console.log("Reset Componenet ******* for "+resetComponent.username);
    if (this.sitekey != '') {

      this._auth.resetPassword(resetComponent.username);
      this.loginError ='We have just sent you an email to reset your password';
    } else {
      alert("Please check I'm not a robot");
    }
    //this.router.navigate(['/login']);
    //console.log("authResult :::::::: -> !!!!!!!! "+authResult);
    //this._auth.resetPassword(resetComponent.username);
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

}
