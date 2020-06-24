import { Component, OnInit } from '@angular/core';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { Entry } from 'contentful';
import { CONTENT_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {

  constructor(private contentfulService: ContentfulrapperService) { }
  public cookies: Entry<any>[] = [];
  
  ngOnInit(): void {
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.CookiesQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(cookies => this.cookies = cookies); 
  }

}
