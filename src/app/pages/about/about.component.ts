import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Entry } from 'contentful';
import { CONTENT_CONFIG, AUTH_CONFIG } from 'src/app/global-config';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { EncrdecrserviceService } from 'src/app/services/EncriptDecript/encrdecrservice.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public aboutUS: Entry<any>[] = [];

  constructor(private auth: AuthService, private contentfulService: ContentfulrapperService,private EncrDecr: EncrdecrserviceService) { }

  ngOnInit() {

    // var encrypted = this.EncrDecr.set(AUTH_CONFIG.secureKey, 'password@123456');
    // var decrypted = this.EncrDecr.get(AUTH_CONFIG.secureKey, encrypted);
   
    // console.log('Encrypted :' + encrypted);
    // console.log('decrypted :' + decrypted);


    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.aboutQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(aboutUS => this.aboutUS = aboutUS);     
  }

}
