import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { UserRole } from 'src/app/services/firebase/userprofile/userrole.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRoleAssignmentModel } from './userroleassignment.model';
import { UserDetails } from 'src/app/services/firebase/userdetails/userdetails.model';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { PagerService } from 'src/app/services/common/pager.service';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';

@Component({
  selector: 'userroleassignment',
  templateUrl: './userroleassignment.component.html',
  styleUrls: ['./userroleassignment.component.css']
})
export class UserroleassignmentComponent implements OnInit {

  UserRole: UserRole[];
  userDetails: UserDetails[];
  userAssignment = new UserRoleAssignmentModel();
  uaform;

  length: any = SEARCH_CONFIG.LIST_JOB_DESC_WIDTH;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private uProfile: UserprofileService,private dialog: MatDialog, private udetails: UserdetailsService, public auth: AuthService, fb: FormBuilder, private pagerService: PagerService) {
    this.uaform = fb.group({
      username: ['', Validators.required],
      role: ['', Validators.required]
    })
    this.getRoles();
  }

  ngOnInit() {
  }


  getRoles() {
    this.uProfile.getUserAllRoles().subscribe(urole => {
      this.UserRole = urole;
      //console.log("User Role :::::::: => "+this.UserRole.length);
    });
  }



  roleSearch(roleSearch) {
    // console.log("Username :: "+roleSearch.username);
    // console.log("Role :: "+roleSearch.role);

    if (((roleSearch.username == null) || (roleSearch.username == undefined) || (roleSearch.username.trim() == '')) && (roleSearch.role == '')) {
      //console.log("Blank...");
      this.userDetails = null;
    } else {

      if (roleSearch.role == '') {
        this.udetails.getUserDetails(roleSearch.username, 'U').subscribe(udtl=> {
          this.userDetails = udtl;
          //console.log(" Length :::: "+this.userDetails.length); 
    
    
          if (this.userDetails.length > 0) {
            //console.log("User Role ::: "+this.userDetails[0].userRole);
            this.setPage(1);
    
    
          } else {
            //console.log("User not found");
            this.userDetails = null;
            this.pagedItems = null;
            this.setPage(1);
          }
    
        })  
      } else if ((roleSearch.username == null) || (roleSearch.username == undefined) || (roleSearch.username.trim() == '')) {
        this.udetails.getUserDetails(roleSearch.role, 'R').subscribe(udtl=> {
          this.userDetails = udtl;
          //console.log(" Length :::: "+this.userDetails.length);
    
    
          if (this.userDetails.length > 0) {
            //console.log("User Role ::: "+this.userDetails[0].userRole);
            this.setPage(1);
    
          } else {
            //console.log("User not found");
            this.userDetails = null;
            this.pagedItems = null;
            this.setPage(1);           
          }
    
        })  
      } else {
        this.userDetails = null;
       // console.log("Select One");
      }

    
    }
  }

  deleteUser(username,auth0id) {
    //console.log("Delete User :: "+username+" Auth0 ID :: "+auth0id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = username+"||"+auth0id;
    // dialogConfig.height = "4";
    // dialogConfig.width ="3";
    this.dialog.open(AdminDialogComponent, dialogConfig);
  }

  setPage(page: number) {
    //console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.userDetails.length, page);
    //console.log("Page Count...1  ::: "+this.pager.length);
    // get current page of items
    this.pagedItems = this.userDetails.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);
  }  

}
