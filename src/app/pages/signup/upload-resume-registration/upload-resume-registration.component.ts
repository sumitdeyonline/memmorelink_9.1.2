import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { EmailService } from 'src/app/services/email/email.service';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { UploadResume } from 'src/app/services/firebase/uploadresume/uploadresume.model';
import { EncrdecrserviceService } from 'src/app/services/EncriptDecript/encrdecrservice.service';
import { AUTH_CONFIG } from 'src/app/global-config';
// import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-upload-resume-registration',
  templateUrl: './upload-resume-registration.component.html',
  styleUrls: ['./upload-resume-registration.component.css']
})
export class UploadResumeRegistrationComponent implements OnInit {
  @ViewChild('recaptchauploadres', {static: false }) recaptchaElement: ElementRef;
  userid='';
  public sitekey='';
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  fileUploads: any[];
  uPloadFileKey: String;
  resumeUploadEnabled: boolean = false;
  isUpdate: boolean = false;
  isNewUpload: boolean = false;
  uResume: UploadResume [];
  mobile: boolean=false;
  signupSucessMessage = '';
  constructor(private route: ActivatedRoute,
              public rUploadService: UploadResumeService, 
              private uProfile: UserprofileService,
              private router: Router, 
              public auth: AuthService,
              private sEmail: EmailService,
              private EncrDecr: EncrdecrserviceService) { 

    this.route.queryParams.subscribe(params => {

      //this.userid = params['userid'];
      this.userid = this.EncrDecr.get(AUTH_CONFIG.secureKey,params['ur']);
      // this.userEmail = params['userid'];
      // this.userid = CryptoJS.AES.decrypt(this.userEmail.trim().toString());
      // console.log(" this.userid "+this.userid);

      //this.userid = params['userid'];
      //console.log("this.userid " + this.userid);
    });

    this.rUploadService.getResumeDetails(this.userid).subscribe(uprop=> {
      this.uResume = uprop;
      // this.resetForm();
      //console.log("Resume Upload");
      if (this.uResume.length == 0) {
        this.isUpdate = false;
        this.isNewUpload = false;
        //console.log("NEW FORM ....11111");

      } else {
        //console.log("Edit FORM .... FOR "+this.uResume.length);
        //console.log('IDDDDDDDDDDDDDDDDDDDDD ::: ', this.rUploadService.selectedUploadResume.id);

        // for(let i=0;i<this.uResume.length;i++) {
        //   console.log("File Name ==>>>>>> : "+this.uResume[i].ResumeFileName);
        // }

        // this.isUpdate = true;
        // this.rUploadService.selectedUploadResume = {} as UploadResume;
        // this.rUploadService.selectedUploadResume.Username = this.uResume[0].Username;
        // this.rUploadService.selectedUploadResume.UserID = this.uResume[0].UserID;
        // this.rUploadService.selectedUploadResume.id = this.uResume[0].id;
        // this.rUploadService.selectedUploadResume.ResumeFileName = this.uResume[0].ResumeFileName;
        // this.rUploadService.selectedUploadResume.ResumeURL = this.uResume[0].ResumeURL;
        // this.rUploadService.selectedUploadResume.ResumeExt = this.uResume[0].ResumeExt;
        this.isNewUpload = true;

        // this.getFieldForUpdate();
      }

    })

  }

  ngOnInit(): void { 
    this.addRecaptchaScript();
    window.scroll(0,0);
    if (window.screen.width <= 736) { // 768px portrait
      this.mobile = true;
      //console.log("Windows ::: "+this.mobile);
    }
  }


  upload() { 
    let id;
    const file = this.selectedFiles.item(0);
    if (this.sitekey != '') {
    //console.log("this.selectedFiles.item(0) :::::: => "+this.selectedFiles.item(0));
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.selectedFiles = undefined;
      this.resumeUploadEnabled = true;
      this.currentFileUpload = new FileUpload(file);

      if (this.uResume.length >0) {
        for(let i=0;i<this.uResume.length;i++) {
 //console.log('Name :::  ::: ', this.rUploadService.selectedUploadResume.ResumeFileName);
          if (this.currentFileUpload.file.name.toLowerCase() == this.uResume[i].ResumeFileName.toLowerCase()) {
            this.isUpdate = true;
            this.rUploadService.selectedUploadResume = {} as UploadResume;
            id = this.uResume[i].id;
            // this.rUploadService.selectedUploadResume.Username = this.uResume[i].Username;
            // this.rUploadService.selectedUploadResume.UserID = this.uResume[0].UserID;
            // this.rUploadService.selectedUploadResume.id = this.uResume[0].id;
            // this.rUploadService.selectedUploadResume.ResumeFileName = this.uResume[0].ResumeFileName;
            // this.rUploadService.selectedUploadResume.ResumeURL = this.uResume[0].ResumeURL;
            // this.rUploadService.selectedUploadResume.ResumeExt = this.uResume[0].ResumeExt;
            this.isNewUpload = true; 
            // console.log('IDDDDDDDDDDDDDDDDDDDDD ::: ', this.rUploadService.selectedUploadResume.id);
            // console.log('Name :::  ::: ', this.rUploadService.selectedUploadResume.ResumeFileName);
            // console.log("File NAMeeeeee ::::: "+this.currentFileUpload.file.name);   
            break;        
          }
          //console.log("File Name ==>>>>>> : "+this.uResume[i].ResumeFileName);
        }
      }



      if (!this.isUpdate) {
        //console.log("New Entry ... ");
        this.rUploadService.pushFileToStorage(this.currentFileUpload, this.progress, null,this.userid);
      } else {
        //console.log("Updating ....... ");
        this.rUploadService.pushFileToStorage(this.currentFileUpload, this.progress, id);
      }

      this.isNewUpload = true;
      //this.currentFileUpload=null;
      //console.log("isNewUpload   ======= > "+this.isNewUpload);
      // this.rUploadService.addUpdateUserResume(this.rUploadService.selectedUploadResume, this.rUploadService.selectedUploadResume.id);
    } else {
      this.isNewUpload = false;
      this.selectedFiles = undefined;
      this.resumeUploadEnabled = false;
    }


    /* Email Start */
    // let subject = 'You have uploaded your resume';
    // let body = 'Thank you '+this.auth.userProfile.name+'  for uploading your resume.  <br /><br /> <b>Thank you <br>MemoreLink Team</b> '
    // this.sEmail.sendEmail(this.auth.userProfile.name,'',subject,body,'support');


    //this.router.navigate(['/userprofile']);

     this.signupSucessMessage = "Registration complete. Please check your email to verify your email ID";

    } else {
      alert("Please check I'm not a robot");
    }

  }

  validateFile(fileName: string) {
    let ext = fileName.substring(fileName.lastIndexOf('.')+1);
    //console.log("EXTESTION :::::::$$$&&&&&&& "+ext);
    if ((ext.toLowerCase() == 'doc') || (ext.toLowerCase() == 'docx') || (ext.toLowerCase() == 'pdf') || (ext.toLowerCase() == 'ppt') || (ext.toLowerCase() == 'pptx')) {
      return true;
    } else {
      return false;
    }

  }

  deleteFileUpload(fileUpload) {
    this.rUploadService.deleteFileUpload(fileUpload);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.resumeUploadEnabled = true;
    } else {
      this.resumeUploadEnabled = false;
    }
  }

  renderReCaptch() {
    setTimeout(() =>{
    //if (this.recaptchaElement != undefined && this.recaptchaElement !=null) {
      window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
        'sitekey' : AUTH_CONFIG.SiteKey,
        'callback': (response) => {
          this.sitekey = response;
            //console.log(response);
        }
      });
    //}
    }, 100); 

  }
 
  addRecaptchaScript() {
 
    window['grecaptchaCallback'] = () => {
      this.renderReCaptch();
    }
 
    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(); return;}
      js = d.createElement(s); js.id = id;
      js.src = AUTH_CONFIG.GoogleRecaptchaSite;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
 
  }

}
