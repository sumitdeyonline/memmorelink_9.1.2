import { Component, OnInit } from '@angular/core';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { CONTENT_CONFIG } from 'src/app/global-config';
import { Entry } from 'contentful';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {

  public privacypolicy: Entry<any>[] = [];

  constructor(private contentfulService: ContentfulrapperService) { }

  ngOnInit(): void { 
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.privacyPolicyQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(privacypolicy => this.privacypolicy = privacypolicy); 
  }

}
