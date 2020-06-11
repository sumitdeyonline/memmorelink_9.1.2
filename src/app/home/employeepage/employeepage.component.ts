import { Component, OnInit } from '@angular/core';

import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { UploadResume } from 'src/app/services/firebase/uploadresume/uploadresume.model';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { Router } from '@angular/router';

@Component({
  selector: 'employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})
export class EmployeepageComponent implements OnInit {

  aJob: ApplyJob[];
  loading: boolean = false;
  uresume: UploadResume[];
  numberAtHomePage: number = SEARCH_CONFIG.FIRST_PAGE_RECORD_LIMIT;
  constructor(public auth: AuthService,private appjob: ApplyjobService, private uresumeservice: UploadResumeService,  private router: Router) { }

  ngOnInit(): void {

    this.loading = true;
    //let sdate = new Date();
    //let startDt = new Date(sdate.getTime() - (5*24*60*60*1000));
    //let startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+(sdate.getDate()-5));
    let startDt = new Date(new Date().setDate(new Date().getDate()-1)); 
    //console.log("5 Days Back ::: "+startDt);
    let endDt = new Date();
    //let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  
    //console.log("end date ::: "+endDt);

    this.appjob.getApplyJobByAdmin(this.auth.userProfile.name,'CUF','').subscribe(udtl=> {
  
      this.aJob = udtl; 
      //console.log(" Length :::: "+this.aJob.length);

      if (this.aJob.length == 0) {
        
        //this.setPage(1);
        this.aJob = [];

      } 
      //console.log("Company :::==>>>> "+this.aJob[0].company);
      this.loading = false; 
    }); 


    this.uresumeservice.getResumeDetails(this.auth.userProfile.name).subscribe(resume=> {
  
      this.uresume = resume;
      //console.log(" Length :::: "+this.aJob.length);

      if (this.uresume.length == 0) {
        
        //this.setPage(1);
        this.uresume = [];

      } 
      //console.log("Company :::==>>>> "+this.aJob[0].company);
      this.loading = false; 
    });     

  }



  sortValue(type,field,datatype) {



    if (datatype == 'ApplyJob') {
      this.aJob= this.aJob.sort((a,b) => {
        if (type=='asc') {
          switch(field) {
            case 'JobTitle':
              var nameA = a.JobTitle.toUpperCase(); // ignore upper and lowercase
              var nameB = b.JobTitle.toUpperCase(); // ignore upper and lowercase
              break;
            case 'Company':
              var nameA = a.company.toUpperCase(); // ignore upper and lowercase
              var nameB = b.company.toUpperCase(); // ignore upper and lowercase
              break;              
            // case 'Email':
            //   var nameA = a.FromEmail.toUpperCase(); // ignore upper and lowercase
            //   var nameB = b.FromEmail.toUpperCase(); // ignore upper and lowercase
            //   break;   
            case 'Location':
              var nameA = a.joblocation.toUpperCase(); // ignore upper and lowercase
              var nameB = b.joblocation.toUpperCase(); // ignore upper and lowercase
              break;    
            case 'CreatedDate':
              var dateA = a.CreatedDate; // ignore upper and lowercase
              var dateB = b.CreatedDate; // ignore upper and lowercase
              break;                             

          }


        } else {

          switch(field) {
          case 'JobTitle':
            var nameA = b.JobTitle.toUpperCase(); // ignore upper and lowercase
            var nameB = a.JobTitle.toUpperCase(); // ignore upper and lowercase
            break;
          case 'Company':
            var nameA = b.company.toUpperCase(); // ignore upper and lowercase
            var nameB = a.company.toUpperCase(); // ignore upper and lowercase
            break;        
          // case 'Email':
          //   var nameA = b.FromEmail.toUpperCase(); // ignore upper and lowercase
          //   var nameB = a.FromEmail.toUpperCase(); // ignore upper and lowercase
          //   break; 
          case 'Location':
            var nameA = b.joblocation.toUpperCase(); // ignore upper and lowercase
            var nameB = a.joblocation.toUpperCase(); // ignore upper and lowercase
            break;             
          case 'CreatedDate':
            var dateA = b.CreatedDate; // ignore upper and lowercase
            var dateB = a.CreatedDate; // ignore upper and lowercase
            break;             
          }

        }


        if (field=='CreatedDate') {

          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }        

        } else {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }



        // names must be equal
        return 0;
      })
    } else if (datatype == 'UploadResume') {
      this.uresume= this.uresume.sort((a,b) => {
        if (type=='asc') {
          switch(field) {
            case 'ResumeFileName':
              var nameA = a.ResumeFileName.toUpperCase(); // ignore upper and lowercase
              var nameB = b.ResumeFileName.toUpperCase(); // ignore upper and lowercase
              break;
            // case 'Company':
            //   var nameA = a.company.toUpperCase(); // ignore upper and lowercase
            //   var nameB = b.company.toUpperCase(); // ignore upper and lowercase
            //   break;                
            // case 'Location':
            //   var nameA = a.joblocation.toUpperCase(); // ignore upper and lowercase
            //   var nameB = b.joblocation.toUpperCase(); // ignore upper and lowercase
            //   break;    
            case 'CreatedDate':
              var dateA = a.CreatedDate; // ignore upper and lowercase
              var dateB = b.CreatedDate; // ignore upper and lowercase
              break;     
            case 'ModifiedDate':
              var dateA = a.ModifiedDate; // ignore upper and lowercase
              var dateB = b.ModifiedDate; // ignore upper and lowercase
              break;                                        

          }


        } else {

          switch(field) {
          case 'ResumeFileName':
            var nameA = b.ResumeFileName.toUpperCase(); // ignore upper and lowercase
            var nameB = a.ResumeFileName.toUpperCase(); // ignore upper and lowercase
            break;
          // case 'Company':
          //   var nameA = b.company.toUpperCase(); // ignore upper and lowercase
          //   var nameB = a.company.toUpperCase(); // ignore upper and lowercase
          //   break;         
          // case 'Location':
          //   var nameA = b.joblocation.toUpperCase(); // ignore upper and lowercase
          //   var nameB = a.joblocation.toUpperCase(); // ignore upper and lowercase
          //   break;             
          case 'CreatedDate':
            var dateA = b.CreatedDate; // ignore upper and lowercase
            var dateB = a.CreatedDate; // ignore upper and lowercase
            break; 
          case 'ModifiedDate':
            var dateA = b.ModifiedDate; // ignore upper and lowercase
            var dateB = a.ModifiedDate; // ignore upper and lowercase
            break;                         
          }

        }


        if ((field=='CreatedDate') || (field=='ModifiedDate')) {

          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }        

        } else {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }



        // names must be equal
        return 0;
      })



    }
  }


}
