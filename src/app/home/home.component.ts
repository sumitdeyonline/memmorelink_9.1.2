import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';   
import { HOME_CONFIG } from '../global-config';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  randNum: number=1;
  constructor(private router: Router) {
    window.scroll(0,0);
    //this.router.navigate(['/employerhomepage']); 
    //console.log("App Component .... !!!!!");
    // if ((auth.isAuthenticated()) && (auth.isResumeSearchRole() || auth.isPostJobRole())) {
    //   console.log("This is a test");
    //   this.router.navigate(['/employerhomepage']); 
    // }
    // auth.handleAuthentication();
    // if ((auth.isAuthenticated()) && (auth.isResumeSearchRole() || auth.isPostJobRole())) {
    //   console.log("This is a test");
    //   this.router.navigate(['/employerhomepage']); 
    // }
    this.randNum = Math.floor(Math.random() * Math.floor(HOME_CONFIG.BannerRandomNumber));
    //console.log(this.randNum);

    // setTimeout(() =>{
    //   //console.log("Home Component .... ");
    //   _auth.handleAuthentication();
    // }, 1000);  

  }

  ngOnInit() {
    window.scroll(0,0);
  }

}
