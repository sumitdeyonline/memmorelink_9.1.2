
import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HttpClientModule }  from '@angular/http';

import { RouterModule, ActivatedRoute } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { TechNewsComponent } from './tech-news.component';
import { TechNewsDetailsComponent } from './tech-news-details/tech-news-details.component';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';


@NgModule({
    imports: [
        CommonModule,
        RouterModule
        

    ],
      declarations: [
        TechNewsDetailsComponent

    ],
    entryComponents: [],
    exports: [

    ],
    providers: [
      ContentfulrapperService
    ]


})

export class TechNewsModule {}
