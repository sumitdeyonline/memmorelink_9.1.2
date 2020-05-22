import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-authlandingpage',
  templateUrl: './authlandingpage.component.html',
  styleUrls: ['./authlandingpage.component.css']
})
export class AuthlandingpageComponent implements OnInit {

  constructor(public auth: AuthService) { 

    window.scroll(0,0);
    auth.handleAuthentication();

  }

  ngOnInit(): void {
  }

}
