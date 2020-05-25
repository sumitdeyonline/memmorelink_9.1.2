import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent implements OnInit {

  description:string;
  isDeleted: boolean = false;

  constructor(private dialogRef: MatDialogRef<AdminDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private uProfile: UserprofileService, public auth: AuthService, private resume: UploadResumeService, private profile: UserprofileService, private udetails: UserdetailsService) { 

    }

  ngOnInit() {
    //console.log("This Data ::::::: -> > " +this.data);
  }

  close() {
    this.dialogRef.close();
  }

  deleteRecord() {
    console.log("Data ::: "+this.data);
    //this.postservice.deletePostJobWithID(this.data);

    this.auth.removeUserAdmin(this.data,"").subscribe(res=>{

      //       // Delete Resume
      // this.resume.deleteUloadResumeByUsername(this.data);
      // // Delete profile 
      // this.profile.deleteUserProfileByName(this.data);
      // // Delete Userdetails 
      // this.udetails.deleteUserDetailsByName(this.data);

      console.log("User Deleted")
    });

    this.isDeleted = true;
  }
}
