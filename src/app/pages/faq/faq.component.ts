import { Component, OnInit } from '@angular/core';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { Entry } from 'contentful';
import { CONTENT_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  public faq: Entry<any>[] = [];

  constructor(private contentfulService: ContentfulrapperService) { }

  ngOnInit(): void {
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.faqQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(faq => this.faq = faq);  
  }

}
