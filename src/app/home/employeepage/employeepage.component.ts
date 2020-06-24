import { Component, OnInit } from '@angular/core';

import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { UploadResume } from 'src/app/services/firebase/uploadresume/uploadresume.model';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { Router } from '@angular/router';
import { SavejobsService } from 'src/app/services/firebase/savejobs/savejobs.service';
import { SaveJob } from 'src/app/services/firebase/savejobs/savejobs.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SavedialogComponent } from './savedialog/savedialog.component';

@Component({
  selector: 'employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})
export class EmployeepageComponent implements OnInit {

  aJob: ApplyJob[];
  aJobTemp: ApplyJob[];
  savejob: SaveJob[];
  loading: boolean = false;
  uresume: UploadResume[];
  numberAtHomePage: number = SEARCH_CONFIG.FIRST_PAGE_RECORD_LIMIT;
  constructor(public auth: AuthService,private appjob: ApplyjobService,
     private uresumeservice: UploadResumeService,
     private sjob:SavejobsService,
     private dialog: MatDialog,
     private router: Router) { }

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

    this.appjob.getApplyJobByUserJobIDCandidate(this.auth.userProfile.name,'U','').subscribe(ajob=> {
      this.aJobTemp = ajob;

    });


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


    this.sjob.getSaveJobByAdmin(this.auth.userProfile.name,'UCF','').subscribe(sjob=> {
  
      this.savejob = sjob;
      //console.log(" Length :::: "+this.savejob.length);

      if (this.savejob.length == 0) {
        
        //this.setPage(1);
        this.savejob = [];

      } else {

        if (this.aJobTemp.length > 0) {
          
          //console.log("applyjob ::::: before ");
          for (let i=0;i<this.savejob.length;i++) {
            let applyjob  = this.aJobTemp.find(apply=>apply.JobID == this.savejob[i].JobID);
            if (applyjob !=undefined || applyjob !=null) {
              //console.log("applyjob ::::: "+applyjob.JobID);
              this.savejob[i].ApplyJob = true;
            }

            //this.savejob[i].ApplyJob =
            //this.noOFJob[i] = this.getJobCount(this.pjob[i].JobID);
            //this.noOFJob[i] = this.getJobCount(this.pjob[i].JobID);
            //console.log("Count ::: "+this.getJobCount(this.pjob[i],i) );
            //this.getJobCount(this.savejob[i],i);
            //console.log("Recird True ::: "+this.savejob[i].ApplyJob);
          }

        } 




        // this.savejob = this.aJobAll.filter(function(ajobfilter) {
        //   // return ajobfilter.JobTitle = appliedJpb.JobTitle;
        //   //console.log("ajobfilter.JobTitle.indexOf(appliedJpb.JobTitle) "+ajobfilter.JobTitle.indexOf(appliedJpb.JobTitle));
        //   return (ajobfilter.JobTitle.toUpperCase().indexOf(appliedJpb.JobTitle.toUpperCase()) > -1) || (ajobfilter.JobIDSerial===appliedJpb.JobTitle);
        // });


      }
      

      //console.log("Company :::==>>>> "+this.aJob[0].company);
      this.loading = false; 
    });     

  

  }


//   getJobCount(job,i) {
//     let aJobtmp: ApplyJob[];
//     let nofRecord=0;
//     this.appjob.getApplyJobByUserJobID(this.auth.userProfile.name,job.JobID).subscribe(ajob=> {
//       aJobtmp = ajob;
// //console.log("nofRecord :: "+aJobtmp.length);
//       if (aJobtmp.length > 0) {
//         nofRecord = aJobtmp.length;
//         //console.log("nofRecord :: "+nofRecord);
//         job.ApplyJob = true;
//         //console.log("Recird True ::: "+job.Applied);
//         //console.log("Company ::: "+this.aJob[0].company);
//         return;
//       }  else {
//         job.ApplyJob = false;
//         //console.log("Recird False ::: "+job.Applied);
//       }
//       //this.noOFJob[i] = nofRecord;

//       //console.log("Company :::: "+this.noOFJob[i]);
//     });
//     return;
//   }
  

  onDelete(sjob) {
    //console.log("Pst Job ID :::: "+pjob.id);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = sjob.id;
      // dialogConfig.height = "4";
      // dialogConfig.width ="3";
       this.dialog.open(SavedialogComponent, dialogConfig);
    //  dialogConfig.disableClose = false;
    //  dialogConfig.autoFocus = true;

    //this.fileNameDialogRef = this.dialog.open(DialogComponent);
    //this.fileNameDialogRef = this.dialog.open(DialogComponent, dialogConfig);
    //this.postservice.deletePostJob(pjob);
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



    } else  if (datatype == 'SaveJob') {
      this.savejob= this.savejob.sort((a,b) => {
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
            case 'ApplyJob':
              var nameA = a.ApplyJob == true? 'Yes':'No'; //a.CreatedDate; // ignore upper and lowercase
              var nameB = b.ApplyJob == true? 'Yes':'No'; // ignore upper and lowercase
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
          case 'ApplyJob':
            var nameA = b.ApplyJob == true? 'Yes':'No'; //a.CreatedDate; // ignore upper and lowercase
            var nameB = a.ApplyJob == true? 'Yes':'No'; // ignore upper and lowercase
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
    }
  }


}
