import { Component, OnInit, ViewChild } from '@angular/core';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SEARCH_CONFIG,HOME_CONFIG } from 'src/app/global-config';
import { listenerCount } from 'cluster';






@Component({
  selector: 'employerpage',
  templateUrl: './employerpage.component.html',
  styleUrls: ['./employerpage.component.css']
})
export class EmployerpageComponent implements OnInit {
  pjob: PostJobc[];
  aJob: ApplyJob[];
  aJobTemp:ApplyJob[];
  noOFJob: number[];
  loading: boolean = false;
  mobile: boolean=false;
  numberAtHomePage: number = SEARCH_CONFIG.FIRST_PAGE_RECORD_LIMIT;
  searchPlaceHolder: string = HOME_CONFIG.SEARCH_RESUME_PLACEHOLDER;
  constructor(private postservice: PostjobService,public auth: AuthService,private appjob: ApplyjobService, private router: Router) { }

  ngOnInit(): void {

    window.scroll(0,0);
    if (window.screen.width <= 736) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }

    this.loading = true;
    //let sdate = new Date();
    //let startDt = new Date(sdate.getTime() - (24*60*60*1000));
    //console.log("newDate :::: "+newDate);

    //let startDt = new Date(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+(sdate.getDate()-1)); 
    let startDt = new Date(new Date().setDate(new Date().getDate()-1)); 

    //console.log("Start Date ::: "+startDt);
    let endDt = new Date();
    //console.log("End Date ::: "+endDt);
    //let endDt = new Date(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+(edate.getDate()+1));  
    // console.log(" this.auth.userProfile.name :::: "+this.auth.userProfile.name);

    this.appjob.getApplyJobByAdmin(this.auth.userProfile.name,'U','').subscribe(ajob=> {
      this.aJobTemp = ajob;

    });

    this.postservice.getPostJobsByUser(this.auth.userProfile.name, 'UDF','').subscribe(pjob=> {
      this.pjob = pjob;

      //console.log("Last Updated ::: "+ Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000));
      // console.log("Last Updated ::: "+ this.getDateDiff(this.pjob[3].LastModifiedDate));
      if (this.pjob.length == 0) {
        //console.log("Company ::: "+this.aJob[0].company);
        //this.setPage(1);
        this.pjob = [];
      } else {
        for (let i=0;i<this.pjob.length;i++) {
          let count=0;
          // let applyjob = this.aJobTemp.find(apply=>(apply.id == this.pjob[i].JobID)?count++:'');
          // let count=0;
          for (let j=0;j<this.aJobTemp.length;j++) {
            if (this.aJobTemp[j].JobID == this.pjob[i].id)
              count = count + 1;
          }
          this.pjob[i].ApplicantCount = count;

          // if (applyjob !=undefined || applyjob !=null) {
          //   //console.log("applyjob ::::: "+applyjob.JobID);
          //   this.pjob[i].ApplicantCount = applyjob.length;
          // } else {
          //   this.pjob[i].ApplicantCount = 0
          // }         
            //this.noOFJob[i] = this.getJobCount(this.pjob[i].JobID);
            //this.noOFJob[i] = this.getJobCount(this.pjob[i].JobID);
            //console.log("Count ::: "+this.getJobCount(this.pjob[i],i) );

          /*********  This is the other approach *********/
           //this.getJobCount(this.pjob[i],i); 
          /*********  This is the other approach end *********/           
        }
      }

      this.loading = false;
      // Math.round(Math.abs(new Date().getTime() - this.pjob[0].LastModifiedDate.toDate().getTime())/(24*60*60*1000)


      //console.log("List Service ..... 33333 ::::: "+this.pjob[1].id);
    }); 
    
    this.appjob.getApplyJobByAdmin(this.auth.userProfile.name,'UDF','').subscribe(udtl=> {
  
      this.aJob = udtl;
      //console.log(" Length :::: "+this.aJob.length);

      if (this.aJob.length == 0) {
        
        //this.setPage(1);
        this.aJob = [];

      } 
      //console.log("Company :::==>>>> "+this.aJob[0].company);
      this.loading = false; 
    });   


  } 

  getJobCount(job,i) {
    let aJobtmp: ApplyJob[];
    let nofRecord=0;
    this.appjob.getApplyJobByAdmin(job.id,'FPAJID','').subscribe(ajob=> {
      aJobtmp = ajob;

      if (aJobtmp.length > 0) {
        nofRecord = aJobtmp.length;
        //console.log("nofRecord :: "+nofRecord);
        job.ApplicantCount = nofRecord;
        //console.log("Recird ::: "+job.ApplicantCount);
        //console.log("Company ::: "+this.aJob[0].company);
        return;
      }  else {
        job.ApplicantCount = 0;
        //console.log("Recird ::: "+job.ApplicantCount);
      }
      //this.noOFJob[i] = nofRecord;

      //console.log("Company :::: "+this.noOFJob[i]);
    });
    return;
  }

  getURLValue(id,jobTitle,jobid) {
    // console.log("id  :: "+id);
    // console.log("jobTitle  :: "+jobTitle);
    // console.log("jobid  :: "+jobid);
    this.router.navigate(['/applicants',id], { queryParams: {  jobtitle: jobTitle, 'jobidserial': jobid}, 'queryParamsHandling': 'merge' });
  }

  sortValue(type,field,datatype) {
  //sortValue(field,type) {

    // this.pjob= this.pjoball.filter(function(pjobfilter) {
    //   return pjobfilter.isSearchable == issearch;
    // });
    let afield = "a."+field;
    let bfield = "b."+field;
    
    if (datatype == 'PostJob')
    {
      this.pjob= this.pjob.sort((a,b) => {
        if (type=='asc') {
          switch(field) {
            case 'JobTitle':
              var nameA = a.JobTitle.toUpperCase(); // ignore upper and lowercase
              var nameB = b.JobTitle.toUpperCase(); // ignore upper and lowercase
              break;
            case 'JobCity':
              var nameA = a.JobCity.toUpperCase()+a.JobState.toUpperCase(); // ignore upper and lowercase
              var nameB = b.JobCity.toUpperCase()+b.JobState.toUpperCase(); // ignore upper and lowercase
              break;
            case 'LastModifiedDate':
              var dateA = a.LastModifiedDate; 
              var dateB = b.LastModifiedDate; 
              break;
            case 'ApplicantCount':
              var numA = a.ApplicantCount; 
              var numB = b.ApplicantCount; 
              break;
            case 'isSearchable':
              if (a.isSearchable)
                var nameA = 'Yes';
              else 
                var nameA = 'No';

              if (b.isSearchable)
                var nameB = 'Yes';
              else 
                var nameB = 'No';                

          }
          // var nameA = afield.toUpperCase(); // ignore upper and lowercase
          // var nameB = bfield.toUpperCase(); // ignore upper and lowercase
  
  
        } else {
          // var nameA = bfield.toUpperCase(); // ignore upper and lowercase
          // var nameB = afield.toUpperCase(); // ignore upper and lowercase
          switch(field) {
          case 'JobTitle':
            var nameA = b.JobTitle.toUpperCase(); // ignore upper and lowercase
            var nameB = a.JobTitle.toUpperCase(); // ignore upper and lowercase
            break;
          case 'JobCity':
            var nameA = b.JobCity.toUpperCase()+b.JobState.toUpperCase(); // ignore upper and lowercase
            var nameB = a.JobCity.toUpperCase()+a.JobState.toUpperCase(); // ignore upper and lowercase
          case 'LastModifiedDate':
            var dateA = b.LastModifiedDate; // ignore upper and lowercase
            var dateB = a.LastModifiedDate; // ignore upper and lowercase
            break;     
          case 'ApplicantCount':
            var numA = b.ApplicantCount; 
            var numB = a.ApplicantCount; 
            break;            
          case 'isSearchable':
            if (b.isSearchable)
              var nameA = 'Yes';
            else 
              var nameA = 'No';

            if (a.isSearchable)
              var nameB = 'Yes';
            else 
              var nameB = 'No';               
  
          }
  
        }
        if (field=='LastModifiedDate') {
  
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }        
  
        } else if (field == 'ApplicantCount') {
          if (numA < numB) {
            return -1;
          }
          if (numA > numB) {
            return 1;
          }          
        }
        else {
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
    } else if (datatype == 'ApplyJob') {
      this.aJob= this.aJob.sort((a,b) => {
        if (type=='asc') {
          switch(field) {
            case 'JobTitle':
              var nameA = a.JobTitle.toUpperCase(); // ignore upper and lowercase
              var nameB = b.JobTitle.toUpperCase(); // ignore upper and lowercase
              break;
            case 'Name':
              var nameA = a.FirstName.toUpperCase()+a.LastName.toUpperCase(); // ignore upper and lowercase
              var nameB = b.FirstName.toUpperCase()+b.LastName.toUpperCase(); // ignore upper and lowercase
              break;              
            case 'Email':
              var nameA = a.FromEmail.toUpperCase(); // ignore upper and lowercase
              var nameB = b.FromEmail.toUpperCase(); // ignore upper and lowercase
              break;   
            case 'Location':
              var nameA = a.joblocation.toUpperCase(); // ignore upper and lowercase
              var nameB = b.joblocation.toUpperCase(); // ignore upper and lowercase
              break;    
            case 'CreatedDate':
              var dateA = a.CreatedDate; // ignore upper and lowercase
              var dateB = b.CreatedDate; // ignore upper and lowercase
              break;                             

          }
          // var nameA = afield.toUpperCase(); // ignore upper and lowercase
          // var nameB = bfield.toUpperCase(); // ignore upper and lowercase
  
  
        } else {
          // var nameA = bfield.toUpperCase(); // ignore upper and lowercase
          // var nameB = afield.toUpperCase(); // ignore upper and lowercase
          switch(field) {
          case 'JobTitle':
            var nameA = b.JobTitle.toUpperCase(); // ignore upper and lowercase
            var nameB = a.JobTitle.toUpperCase(); // ignore upper and lowercase
            break;
          case 'Name':
            var nameA = b.FirstName.toUpperCase()+b.LastName.toUpperCase(); // ignore upper and lowercase
            var nameB = a.FirstName.toUpperCase()+b.LastName.toUpperCase(); // ignore upper and lowercase
            break;        
          case 'Email':
            var nameA = b.FromEmail.toUpperCase(); // ignore upper and lowercase
            var nameB = a.FromEmail.toUpperCase(); // ignore upper and lowercase
            break; 
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
    }


  }

  getResumeSearch(searchResume: NgForm) {
    //console.log("Key Word :: "+searchResume.value.ResumeSearch);
    this.router.navigate(['/resumesearch'], { queryParams: {  ResumeSearch: searchResume.value.ResumeSearch}, 'queryParamsHandling': 'merge' });
  }

}
