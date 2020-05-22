import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';

@Component({
  selector: 'app-remoreuser',
  templateUrl: './remoreuser.component.html',
  styleUrls: ['./remoreuser.component.css']
})
export class RemoreuserComponent implements OnInit {


  constructor(public auth: AuthService, private resume: UploadResumeService, private profile: UserprofileService, private udetails: UserdetailsService) { }

  ngOnInit(): void {
  }


  RemoveUser() {
    let user = this.auth.userProfile.name;
    console.log("Remove User .."+this.auth.userProfile.name+" Profile ID: "+this.auth.userProfile.sub);


    //Delete from Auth0

    this.auth.removeUser(this.auth.userProfile.name,this.auth.userProfile.sub).subscribe(res=>{

            // Delete Resume
      this.resume.deleteUloadResumeByUsername(user);
      // Delete profile 
      this.profile.deleteUserProfileByName(user);
      // Delete Userdetails 
      this.udetails.deleteUserDetailsByName(user);

      console.log("User Deleted")
    });
  }
}
