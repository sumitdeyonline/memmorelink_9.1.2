import { Injectable, ElementRef } from '@angular/core';
import { AUTH_CONFIG } from 'src/app/global-config';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  //recaptchaElement: ElementRef;
  constructor() { }

  renderReCaptch(recaptchaElement) {

    if (recaptchaElement != undefined && recaptchaElement !=null) {
      window['grecaptcha'].render(recaptchaElement.nativeElement, {
        'sitekey' : AUTH_CONFIG.SiteKey,
        'callback': (response) => {
            //console.log(response);
        }
      });
    }


  }
 
  addRecaptchaScript(recaptchaElement) {
 
    window['grecaptchaCallback'] = () => {
      this.renderReCaptch(recaptchaElement);
    }
 
    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(recaptchaElement); return;}
      js = d.createElement(s); js.id = id;
      js.src = AUTH_CONFIG.GoogleRecaptchaSite;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
 
  }

}
