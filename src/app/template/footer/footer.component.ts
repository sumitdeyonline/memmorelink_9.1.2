import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { EMAIL_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  email: string;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.email = "mailto:"+EMAIL_CONFIG.HelpEmail+"?Subject=Feedback";
  }

}
