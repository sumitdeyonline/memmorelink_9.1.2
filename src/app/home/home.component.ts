import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';   
import { HOME_CONFIG } from '../global-config';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  randNum: number=1;
  constructor(private _auth: AuthService) {

    //console.log("App Component .... !!!!!");
    _auth.handleAuthentication();
  
    this.randNum = Math.floor(Math.random() * Math.floor(HOME_CONFIG.BannerRandomNumber));
    //console.log(this.randNum);

    // setTimeout(() =>{
    //   //console.log("Home Component .... ");
    //   _auth.handleAuthentication();
    // }, 1000);  

  }

  ngOnInit() {
  }

}
