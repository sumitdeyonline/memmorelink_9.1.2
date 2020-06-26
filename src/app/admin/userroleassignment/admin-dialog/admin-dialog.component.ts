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
    let ID = this.data.split("||");
    let userid = ID[0];
    let username = ID[1];
    let auth0id = ID[2];
    //console.log("Userane :: "+userid+" Auth0 ID :: "+auth0id);
    //this.postservice.deletePostJobWithID(this.data);

    this.auth.getAdmintoken().subscribe(res=>{

      //console.log("res :: "+res);

      //console.log(res['access_token']);

      
      this.auth.deleteUser("auth0|"+auth0id).subscribe(response=>{
    // return this.auth.removeUserAdmin(ID[0],"auth0|"+auth0id);
            // Delete Resume
       //this.resume.deleteUloadResumeByUsername(username);
      // Delete profile 
       //this.profile.deleteUserProfileByName(username);
      // Delete Userdetails 
      //console.log("Before delete users"); 
        this.udetails.deleteUserDetailsById(userid); 
        return;
       //console.log("User Deleted") 
      });
      return;

    });

    this.isDeleted = true;
  }
}
