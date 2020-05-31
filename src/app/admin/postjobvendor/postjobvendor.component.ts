import { Component, OnInit } from '@angular/core';
import { PostJobVendorModel } from './postjobvendor.model';
import { UserDetails } from 'src/app/services/firebase/userdetails/userdetails.model';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { PagerService } from 'src/app/services/common/pager.service';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/pages/jobdetails/dialog/dialog.component';
import { AdmindialogComponent } from './admindialog/admindialog.component';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'postjobvendor',
  templateUrl: './postjobvendor.component.html',
  styleUrls: ['./postjobvendor.component.css']
})
export class PostjobvendorComponent implements OnInit {

  searchvar =[];
  // formatter = (result: string) => result.toUpperCase();
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.trim().length < SEARCH_CONFIG.MAX_CHARACTER_ADMIN_SEARCH  ? []
        : this.searchvar.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )



  postJob = new PostJobVendorModel();
  userDetails: UserDetails[];
  postJobc: PostJobc[];
  pjobForm;
  //startenddate:string='';

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];  

  length: any = SEARCH_CONFIG.LIST_JOB_DESC_WIDTH;

  constructor(private udetails: UserdetailsService, public auth: AuthService, fb: FormBuilder, private dialog: MatDialog, private pagerService: PagerService, private pJob: PostjobService) { 
    this.pjobForm = fb.group({
      username: ['', Validators.required],
      company: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
    //this.getCompany();    
  }

  ngOnInit() {
  }

  getCompany(company) {
    this.userDetails = null;
    this.searchvar =[];
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

   
  }

  postjobSearch(postjobSearch) {

    let callType='';
    //this.startenddate='';
    this.postJobc =null;
    this.pagedItems =null;

    // let sdate = Math.round(new Date(postjobSearch.startDate).getTime()/ 1000);
    // let edate = Math.round(new Date(postjobSearch.endDate).getTime()/ 1000);



    // console.log("startDate :: "+startDt);
    // console.log("endDate :: "+endDt);
    // console.log("username :: "+postjobSearch.username.trim());
    // console.log("company :: "+postjobSearch.company);

    if (postjobSearch.username.trim() !='')
      callType = callType + 'U';
    if (postjobSearch.company.trim() !='')
      callType = callType + 'C';
    if (((postjobSearch.startDate !='') && (postjobSearch.startDate !=null)) || ((postjobSearch.endDate !='') && (postjobSearch.endDate !=null)))
      callType = callType + 'D';  
      
    //console.log("callType ::::: "+callType);

    // if (postjobSearch.startDate ==null) {
    //   console.log("Start Date is Null");
    // }

    // if ((((postjobSearch.startDate !='') || (postjobSearch.startDate !=null)) && ((postjobSearch.endDate =='') || (postjobSearch.endDate ==null))) || 
    //     ((postjobSearch.startDate =='') && (postjobSearch.endDate !=''))) {
    //       console.log("Date is not proper");
    //       this.startenddate = 'Please Enter Start and End Date 

    // } else {

      if ((postjobSearch.username.trim() != '') || (postjobSearch.company.trim() != '')) {
        let sdate = new Date(postjobSearch.startDate);
        let startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+sdate.getDate());
        let edate = new Date(postjobSearch.endDate);
        let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  
  
        //console.log("Search ::::"+callType);
        this.pJob.getPostJobsByUser(postjobSearch.username.trim(),callType,postjobSearch.company.trim(),startDt,endDt).subscribe(udtl=> {
          this.postJobc = udtl;
          //console.log(" Length :::: "+this.postJobc.length);
    
    
          if (this.postJobc.length == 0) {
            //console.log("User Role ::: "+this.postJobc[0].Company);
            //this.setPage(1);
            this.postJobc = [];
            this.pagedItems = [];
    
          }
          this.setPage(1);
        })
      }

   // }




       


    
    // if ((postjobSearch.username == null) || (postjobSearch.username == undefined) || (postjobSearch.username.trim() == '')) {
    //   if (postjobSearch.company != "") {
    //     //console.log("No Value");
    //     if ((postjobSearch.startDate.trim() == '') && (postjobSearch.endDate.trim() == '')) {
    //       this.getPostDetails(postjobSearch.company,'C');
    //     }
    //     console.log("Company Name");

    //   }
    // } else {
    //   if ((postjobSearch.startDate == '') && (postjobSearch.endDate == '')) {
    //     this.getPostDetails(postjobSearch.username,'U');
    //   }

    // }

  }

  // private getPostDetails(poststr:string,type:string,startDt?:number,endDt?:number ) {


  //   this.pJob.getPostJobsByUser(poststr,type,startDt,endDt).subscribe(udtl=> {
  //     this.postJobc = udtl;
  //     //console.log(" Length :::: "+this.postJobc.length);


  //     if (this.postJobc.length > 0) {
  //       //console.log("User Role ::: "+this.postJobc[0].Company);
  //       this.setPage(1);


  //     } else {
  //       //console.log("User not found");
  //       this.postJobc = null;
  //       this.pagedItems = null;
  //       this.setPage(1); 
  //     }

  //   })  


  // }


  updateAll() {
    //let dt:any;
    for (let i=0;i < this.postJobc.length;i++) {
       console.log("this.postJobc[i].id "+this.postJobc[i].id);
      // console.log("this.postJobc[i].CreatedBy "+this.postJobc[i].CreatedBy);
      // console.log("this.postJobc[i].isSearchable "+this.postJobc[i].isSearchable);
      /* Use for bulp upload
      dt = this.postJobc[i].LastModifiedDate;
      let time = dt.toDate().getTime();
      console.log("Time ::: "+time);
      */
      //dateIput.toDate().getTime()
      // console.log("DAAAA ::: "+dt.toString()+ " KKKKK :: "+dt.toString().indexOf('nanoseconds'));
      // console.log("Date"+dt.toString().substring(18,dt.toString().indexOf('nanoseconds')-2));
      //console.log("Company logo URL  "+this.postJobc[i].CompanyLogoURL);
      // if (this.postJobc[i].CompanyLogoURL == undefined) {
      //   this.postJobc[i].CompanyLogoURL = "";
      // }

      //this.postJobc[i].LastModifiedDate = new Date();
      this.pJob.AlgoliaObjectUpdate('update',this.postJobc[i],this.postJobc[i].id,this.postJobc[i].CreatedDate,this.postJobc[i].CreatedBy);

    }
    //console.log("this.postJobc.length "+this.postJobc.length);

  }

  onDelete(id) {
    //console.log("Pst Job ID :::: "+id);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data =id;
      // dialogConfig.height = "4";
      // dialogConfig.width ="3";
      this.dialog.open(DialogComponent, dialogConfig);
    //  dialogConfig.disableClose = false;
    //  dialogConfig.autoFocus = true;

    //this.fileNameDialogRef = this.dialog.open(DialogComponent);
    //this.fileNameDialogRef = this.dialog.open(DialogComponent, dialogConfig);
    //this.postservice.deletePostJob(pjob);
  }

  onDeleteAll() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.postJobc;

    this.dialog.open(AdmindialogComponent, dialogConfig);

    // for (let i=0;i < this.postJobc.length;i++) {
    //   console.log("Id : "+this.postJobc[i].id);
    //   console.log("Title : "+this.postJobc[i].JobTitle);
    // }
  }


  setPage(page: number) {
    //console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    if (this.postJobc !=null) {
      this.pager = this.pagerService.getPager(this.postJobc.length, page);
      //console.log("Page Count...1  ::: "+this.pager.length);
      // get current page of items
      this.pagedItems = this.postJobc.slice(this.pager.startIndex, this.pager.endIndex + 1);
      //console.log("Page Count...1  ::: "+this.pagedItems.length);
    }

  }    

}
