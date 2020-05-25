import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { UploadResume } from 'src/app/services/firebase/uploadresume/uploadresume.model';
import { EmailService } from 'src/app/services/email/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'uploadresume',
  templateUrl: './uploadresume.component.html',
  styleUrls: ['./uploadresume.component.css']
})
export class UploadresumeComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  fileUploads: any[];
  uPloadFileKey: String;
  resumeUploadEnabled: boolean = false;
  isUpdate: boolean = false;
  isNewUpload: boolean = false;
  uResume: UploadResume [];



  constructor(public rUploadService: UploadResumeService, private uProfile: UserprofileService,private router: Router, private auth: AuthService,private sEmail: EmailService,) {

    this.rUploadService.getResumeDetails(this.auth.userProfile.name).subscribe(uprop=> {
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

  ngOnInit() {
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.resumeUploadEnabled = true;
    } else {
      this.resumeUploadEnabled = false;
    }
  }

  upload() { 
    let id;
    const file = this.selectedFiles.item(0);
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
        this.rUploadService.pushFileToStorage(this.currentFileUpload, this.progress, null);
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
    let subject = 'You have uploaded your resume';
    let body = 'Thank you '+this.auth.userProfile.name+'  for uploading your resume.  <br /><br /> <b>Thank you <br>MemoreLink Team</b> '
    this.sEmail.sendEmail(this.auth.userProfile.name,'',subject,body);


    //this.router.navigate(['/userprofile']);

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



}
