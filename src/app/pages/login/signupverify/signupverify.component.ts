import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from 'src/app/services/email/email.service';

@Component({
  selector: 'app-signupverify',
  templateUrl: './signupverify.component.html',
  styleUrls: ['./signupverify.component.css']
})
export class SignupverifyComponent implements OnInit {

 public email: string='';
 public message: string='';
 public code: string='';

  constructor(private route: ActivatedRoute,private sEmail: EmailService) { 

    this.route.queryParams.subscribe(params => {

      //https://memorelink.com/signin?supportSignUp=true&supportForgotPassword=true&email=user1@memorelink.com&message=Your%20email%20was%20verified.%20You%20can%20continue%20using%20the%20application.&success=true&code=success

      //console.log(params);
       this.email = params['email'];
      // //console.log("Keyword " + this.keyword);
       this.message = params['message'];
       this.code = params['code'];


      // this.listjob.keyword = this.keyword;
      // this.listjob.location = this.location;
    })



    let subject = 'Welcome to MeMoreLink!';
    let body = 'Thank you <b>'+this.email+'</b> for registering.<br/><br/>Best of luck <br /><br /> <b>Thank you <br>MeMoreLink Team</b> '
    this.sEmail.sendEmail(this.email,'',subject,body,'support');

  }

  ngOnInit(): void {
    window.scroll(0,0);
    if (window.screen.width <= 736) { // 768px portrait
      //this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }

  }

}
