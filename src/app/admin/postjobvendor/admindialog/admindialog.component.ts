
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';


@Component({
  selector: 'app-admindialog',
  templateUrl: './admindialog.component.html',
  styleUrls: ['./admindialog.component.css']
})
export class AdmindialogComponent implements OnInit {

  description:string;
  isDeleted: boolean = false;

  constructor(private dialogRef: MatDialogRef<AdmindialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private postservice: PostjobService) { 

    }

  ngOnInit() {
    //console.log("This Data ::::::: -> > " +this.data);
  }

  close() {
    this.dialogRef.close();
  }

  deleteRecord() {

    for (let i=0;i < this.data.length;i++) {
      // console.log("Id : "+this.data[i].id);
      // console.log("Title : "+this.data[i].JobTitle);
      this.postservice.deletePostJobWithID(this.data[i].id);
    }

    //console.log("Data ::: "+this.data);
    //this.postservice.deletePostJobWithID(this.data);
    this.isDeleted = true;
  }
}
