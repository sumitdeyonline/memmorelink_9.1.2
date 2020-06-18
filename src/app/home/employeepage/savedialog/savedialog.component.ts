import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SavejobsService } from 'src/app/services/firebase/savejobs/savejobs.service';

@Component({
  selector: 'app-savedialog',
  templateUrl: './savedialog.component.html',
  styleUrls: ['./savedialog.component.css']
})
export class SavedialogComponent implements OnInit {

  description:string;
  isDeleted: boolean = false;

  constructor(private dialogRef: MatDialogRef<SavedialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private saveservice: SavejobsService) { 

    }

  ngOnInit() {
    //console.log("This Data ::::::: -> > " +this.data);
  }

  close() {
    this.dialogRef.close();
  }

  deleteRecord() {
    //console.log("Data ::: "+this.data);
    this.saveservice.deleteSaveJobWithID(this.data);
    this.isDeleted = true;
  }

}
