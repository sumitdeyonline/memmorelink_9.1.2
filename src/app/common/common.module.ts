import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { CallbackComponent } from './callback';
import { CommondialogComponent } from './commondialog';
import { LogComponent } from './logger';
import { NotfoundComponent } from './notfound';
import { MatDialogModule } from '@angular/material/dialog';
import { MdToHtmlCommonPipe } from './pipe';

@NgModule({
    imports: [
      CommonModule,
    //   ReactiveFormsModule,
      RouterModule,
      MatDialogModule
    ],
    entryComponents: [ CommondialogComponent],
    declarations: [ CallbackComponent,CommondialogComponent,LogComponent,NotfoundComponent, MdToHtmlCommonPipe ],
    exports: [
      CommonModule,
    //   ReactiveFormsModule,
      RouterModule,
      MatDialogModule,
      CallbackComponent,
      CommondialogComponent,
      MdToHtmlCommonPipe,
      LogComponent,
      NotfoundComponent
    ],  providers: [

    ]
  })
  export class CommonProjectModule {
  }