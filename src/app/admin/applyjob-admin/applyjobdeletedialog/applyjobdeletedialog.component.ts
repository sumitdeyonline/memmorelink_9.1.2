import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';

@Component({
  selector: 'app-applyjobdeletedialog',
  templateUrl: './applyjobdeletedialog.component.html',
  styleUrls: ['./applyjobdeletedialog.component.css']
})
export class ApplyjobdeletedialogComponent implements OnInit {

  description:string;
  isDeleted: boolean = false;

  constructor(private dialogRef: MatDialogRef<ApplyjobdeletedialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private applyservice: ApplyjobService) { 

    }

  ngOnInit() {
    //console.log("This Data ::::::: -> > " +this.data);
  }

  close() {
    this.dialogRef.close();
  }

  deleteRecord() {
    //console.log("Id : "+this.data);
    this.applyservice.deleteApplyJobWithID(this.data);

    // for (let i=0;i < this.data.length;i++) {
    //    console.log("Id : "+this.data[i].id);
    //   // console.log("Title : "+this.data[i].JobTitle);
    //   this.applyservice.deletePostJobWithID(this.data[i].id);
    // }

    this.isDeleted = true;
  }
}
