import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { PagerService } from 'src/app/services/common/pager.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { UserDetails } from 'src/app/services/firebase/userdetails/userdetails.model';
import { SEARCH_CONFIG } from 'src/app/global-config';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ApplyjobdeletedialogComponent } from './applyjobdeletedialog/applyjobdeletedialog.component';
import { ApplyjobdeletealldialogComponent } from './applyjobdeletealldialog/applyjobdeletealldialog.component';

@Component({
  selector: 'applyjobadmin',
  templateUrl: './applyjob-admin.component.html',
  styleUrls: ['./applyjob-admin.component.css']
})
export class ApplyjobAdminComponent implements OnInit {


  searchvar =[];
  // formatter = (result: string) => result.toUpperCase();
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.trim().length < SEARCH_CONFIG.MAX_CHARACTER_ADMIN_SEARCH  ? []
        : this.searchvar.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
)

  userDetails: UserDetails[];
  applyform;

  aJob: ApplyJob[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
  constructor(public auth: AuthService, 
    private appjob: ApplyjobService,
    private udetails: UserdetailsService,
    private dialog: MatDialog, 
    fb: FormBuilder, 
    private pagerService: PagerService) { 
      window.scroll(0,0);
    this.applyform = fb.group({
      username: ['', Validators.required],
      company: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
    //this. getCompany(); 

    // this.appjob.getApplyJob().subscribe(applyJob => {
    //   this.aJob = applyJob;
    //   console.log("User Job :::::::: => "+this.aJob.length);
    //   this.setPage(1);
    // });    

  }

  ngOnInit() {

  }




  getCompany(company) {

    this.userDetails = null;
    this.searchvar =[];
    //console.log("Company ::: "+this.userDetails.length)
    if (company.length>SEARCH_CONFIG.MAX_CHARACTER_ADMIN_SEARCH) {
      this.udetails.getUserDetails('', 'A',company.toUpperCase()).subscribe(udtl=> {
        this.userDetails = udtl;
        //console.log("Company ::: "+this.userDetails.length);
        for(let i=0;i<this.userDetails.length;i++) {
          //console.log("Company ::: "+this.userDetails[i].company);
          this.searchvar[i] = this.userDetails[i].company;
        }

        //console.log(" Length :::: "+this.userDetails.length);
      }) 
    }


    // this.udetails.getUserDetails('', 'A').subscribe(udtl=> {
    //   this.userDetails = udtl;
    //   //console.log(" Length ::::===>>>>>>>>>>>> "+this.userDetails.length); 
    // });
  }

  applyJob(apjob) {


    let callType='';
    //this.startenddate='';
    this.aJob =null;
    this.pagedItems =null;    

    if (apjob.username.trim() !='')
      callType = callType + 'U';
    if (apjob.company.trim() !='')
      callType = callType + 'C';
    if (((apjob.startDate !='') && (apjob.startDate !=null)) || ((apjob.endDate !='') && (apjob.endDate !=null)))
      callType = callType + 'D';  
      
    //console.log("callType ::::: "+callType);

    if ((apjob.username.trim() != '') || (apjob.company.trim() != '')) {

      let sdate = new Date(apjob.startDate);
      let startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+sdate.getDate());
      let edate = new Date(apjob.endDate);
      let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  

      this.appjob.getApplyJobByAdmin(apjob.username,callType,apjob.company, startDt, endDt).subscribe(udtl=> {

        this.aJob = udtl;
       // console.log(" Length :::: "+this.aJob.length);

        if (this.aJob.length == 0) {
          //console.log("Company ::: "+this.aJob[0].company);
          //this.setPage(1);
          this.aJob = null;
          this.pagedItems = null;
        } 
        this.setPage(1);
      });

    }



    // if ((apjob.username == null) || (apjob.username == undefined) || (apjob.username.trim() == '')) {

    //   if (apjob.company == "") {
    //     //console.log("No Value");
    //   } else {
    //     this.appjob.getApplyJobByCompany(apjob.company).subscribe(udtl=> {

    //       this.aJob = udtl;
    //      // console.log(" Length :::: "+this.aJob.length);

    //       if (this.aJob.length > 0) {
    //         //console.log("Company ::: "+this.aJob[0].company);
    //         //this.setPage(1);
    
    
    //       } else {
    //         //console.log("Company not found");
    //         this.aJob = null;
    //         this.pagedItems = null;
    //         //this.setPage(1);
    //       }


    //       this.setPage(1);
    //     });        
    //   }

    // } else {

    //   this.appjob.getApplyJobByUser(apjob.username).subscribe(udtl=> {
    //     this.aJob = udtl;
    //     //console.log(" Length :::: "+this.aJob.length);
  
  
    //     if (this.aJob.length > 0) {
    //      // console.log("User Role ::: "+this.aJob[0].ApplyToEmail);
    //       this.setPage(1);
    //     } else {
    //       //console.log("User not found");
    //       this.aJob = null;
    //       this.pagedItems = null;
    //       this.setPage(1); 
    //     }
  
    //   }) 

    // }

  }

  onDelete(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data =id;
    // dialogConfig.height = "4";
    // dialogConfig.width ="3";
    this.dialog.open(ApplyjobdeletedialogComponent, dialogConfig);
  }

  onDeleteAll() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.aJob;

    this.dialog.open(ApplyjobdeletealldialogComponent, dialogConfig);
  }

  setPage(page: number) {
    //console.log("Page Count");
    window.scroll(0,0);
    if ((this.aJob !=null) && (this.aJob !=undefined)) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.aJob.length, page);
    //console.log("Page Count...1  ::: "+this.pager.length);
    // get current page of items
    this.pagedItems = this.aJob.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);
    }
  } 

}
