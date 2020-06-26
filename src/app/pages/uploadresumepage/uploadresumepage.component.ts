import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/services/firebase/userprofile/userprofile.model';

import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'uploadresumepage',
  templateUrl: './uploadresumepage.component.html',
  styleUrls: ['./uploadresumepage.component.css']
})
export class UploadresumepageComponent implements OnInit {
  public uprofile: UserProfile[];
  relocate: any='';
  travel: any='';
  security: any='';
  mobile: boolean=false;

  constructor(private _uprofile: UserprofileService, public auth: AuthService) {    window.scroll(0,0); }

  ngOnInit(): void {
    window.scroll(0,0);

    if (window.screen.width <= 736) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }
    this._uprofile.getUserDetails(this.auth.userProfile.name,'U').subscribe(uprof=> {
      this.uprofile = uprof;
      if ((this.uprofile[0] != null) && (this.uprofile[0] != undefined)) {
          if (this.uprofile[0].IsRelocate) { this.relocate = "Yes"; } else { this.relocate = "No"; } 
          if (this.uprofile[0].IsTravel) { this.travel = "Yes"; } else { this.travel = "No"; }
          if (this.uprofile[0].SecurityClearance) { this.security = "Yes"; } else { this.security = "No"; }

      }
      //console.log("Profile Service  ::: "+this.uprofile[0].Username);
      // this._uprofile.getCountryName(this.uprofile.Country).subscribe(cname=> {
      //   this.county = cname;
      //   //console.log("Country Name :::: =====>>>> "+this.county[0].CountryName);
      //   this.uprofile.Country = this.county[0].CountryName;
      //   this._uResume.getResumeDetails(this.uprofile.Username).subscribe(uResume=> {
      //     this.uResumes = uResume;

      //     //console.log("Resuje URL :::::::: "+this.uResumes[0].ResumeFileName);
      //   })        
      // })

    })    


  }

}
