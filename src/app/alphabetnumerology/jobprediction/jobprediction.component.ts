import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { EmailService } from 'src/app/services/email/email.service';
import { JobPrediction } from './jobprediction.model';
import { AlphabetNumerologyService } from 'src/app/services/firebase/alphabetnumerology/alphabet-numerology.service';
import { AlphabetNumerology } from 'src/app/services/firebase/alphabetnumerology/alphabetnumerology.model';
import { AlphabetJobPrediction } from 'src/app/services/firebase/alphabetnumerology/alphabetjobprediction.model';
import { JOBPREDICTION_CONFIG } from 'src/app/global-config';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';

@Component({
  selector: 'jobprediction',
  templateUrl: './jobprediction.component.html',
  styleUrls: ['./jobprediction.component.css']
})
export class JobpredictionComponent implements OnInit {
  jobPForm: any;
  jobPredection = new JobPrediction();
  jobPredectionMessage: string='';
  jobPredectionSucessMessage: string='';
  alphanumerology: AlphabetNumerology[];
  anumerology: AlphabetNumerology;
  alphajobprediction: AlphabetJobPrediction[]
  ajobprediction:AlphabetJobPrediction;
  predection:string ='';
  pjob: PostJobc;
  companyTemp:string='';
  progress: { percentage: number } = { percentage: 0 };
  progressPercentage:any;
  

  EXECELLENT_MATCH_PERCENTAGE: number = JOBPREDICTION_CONFIG.EXECELLENT_MATCH_PERCENTAGE;
  GOOD_MATCH_PERCENTAGE:number= JOBPREDICTION_CONFIG.GOOD_MATCH_PERCENTAGE;
  AVERAGE_MATCH_PERCENTAGE:number= JOBPREDICTION_CONFIG.AVERAGE_MATCH_PERCENTAGE;
  BAD_MATCH_PERCENTAGE:number= JOBPREDICTION_CONFIG.BAD_MATCH_PERCENTAGE;

  constructor(public dialogRef: MatDialogRef<JobpredictionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private sEmail: EmailService,
    private apredection: AlphabetNumerologyService) {
    window.scroll(0,0);

    if (data !=null) {
      this.pjob = data;
      this.companyTemp = this.pjob.Company;
      //console.log("Company :::: "+this.pjob.Company);

    }

    this.jobPForm = fb.group({
      firstname: ['', Validators.required,Validators.minLength(3)],
      middlename: [],
      lastname: ['', Validators.required,Validators.minLength(3)],
      companyname: ['' ,Validators.required,Validators.minLength(3)]
    })


  }


  ngOnInit(): void {
    // if (this.pjob !=null) {
    //   this.jobPForm.controls['companyname'].setValue(this.pjob.Company);
    // }
  }



  jobPrediction(JobPForm : NgForm) {

    this.predection = '';
    let primaryName='', secondaryName='',plusminus='+';
    let primaryCnt=0, secondaryCnt =0;


    if (JobPForm.value.middlename === undefined) {
      JobPForm.value.middlename = '';
    }
    //console.log("First Name :: "+JobPForm.value.firstname);
    primaryName = JobPForm.value.firstname.trim().toUpperCase()+JobPForm.value.middlename.trim().toUpperCase()+JobPForm.value.lastname.trim().toUpperCase();
    
    primaryName = primaryName.toUpperCase().replace(/\s/g, "");
    //console.log("Final Name : "+primaryName.toUpperCase());
    //console.log("JobPForm.value.companyname ::: "+JobPForm.value.companyname);
    secondaryName = this.companyTemp.trim().toUpperCase().replace(/\s/g, "");
    // console.log("Middle Name : "+JobPForm.value.middlename);
    // console.log("Last Name : "+JobPForm.value.lastname);
    //console.log("Company Name : "+secondaryName);            
    this.apredection.getAlphabetValues().subscribe(alphabet => {
      //this.alphanumerology = new AlphabetNumerology();
      this.alphanumerology = alphabet;

      for (let i=0;i < this.alphanumerology.length;i++) {
        this.anumerology = this.alphanumerology[i];
        primaryCnt = primaryCnt + this.CharCount(primaryName,this.anumerology.Alphabet)*this.anumerology.NumValue;
        secondaryCnt = secondaryCnt + this.CharCount(secondaryName,this.anumerology.Alphabet)*this.anumerology.NumValue;
        //console.log("nameCnt : "+nameCnt);
        //console.log("companyCnt : "+companyCnt);
      }
      // console.log("nameCnt :  "+primaryCnt);
      // console.log("companyCnt :  "+secondaryCnt);

      if (primaryCnt == secondaryCnt) {
        // console.log("nameCnt : 2 "+primaryCnt);
        // console.log("companyCnt : 2 "+secondaryCnt);
        this.predection = JOBPREDICTION_CONFIG.EXECELLENT_MATCH;
        this.progressPercentage = this.EXECELLENT_MATCH_PERCENTAGE;
        this.progress.percentage=this.progressPercentage;
        this.jobPredectionSucessMessage = this.predection+" ("+this.progressPercentage+plusminus+")";
      } else {

        while(primaryCnt>9) {
          // console.log("Primary Count ::: "+primaryCnt);
          primaryCnt = this.countRecersive(primaryCnt);
        }

        while(secondaryCnt>9) {
          // console.log("secondaryCnt Count ::: "+secondaryCnt);          
          secondaryCnt = this.countRecersive(secondaryCnt);
        }   
        
        // console.log("nameCnt 2222:  "+primaryCnt);
        // console.log("companyCnt 2222:  "+secondaryCnt);        


        this.apredection.getAlphabetJobPredection(primaryCnt).subscribe(predectionNum => {
          this.alphajobprediction = predectionNum;
          this.ajobprediction = this.alphajobprediction[0];
          // console.log("this.ajobprediction.AlphaNum ::: "+this.ajobprediction.AlphaNum);
          // console.log("this.ajobprediction.GoodNum ::: "+this.ajobprediction.GoodNum);
          // console.log("this.ajobprediction.AvgNum ::: "+this.ajobprediction.AvgNum);
          // console.log("this.ajobprediction.BadNum ::: "+this.ajobprediction.BadNum);

          // console.log("this.ajobprediction.GoodNum,secondaryCnt.toString()::: "+this.ajobprediction.GoodNum,secondaryCnt.toString());

          if (this.CharCount(this.ajobprediction.GoodNum,secondaryCnt.toString()) > 0) {
            // console.log("Good");
            this.predection = JOBPREDICTION_CONFIG.GOOD_MATCH;
            this.progressPercentage =this.GOOD_MATCH_PERCENTAGE;
           // this.jobPredectionSucessMessage = this.predection+" ("+this.progressPercentage+"+)";
    
          } else if (this.CharCount(this.ajobprediction.AvgNum,secondaryCnt.toString()) > 0) {
            // console.log("Avg");
            this.predection = JOBPREDICTION_CONFIG.AVERAGE_MATCH;
            this.progressPercentage =this.AVERAGE_MATCH_PERCENTAGE;
            //this.jobPredectionSucessMessage = this.predection+" ("+this.progressPercentage+"+)";
          } else if (this.CharCount(this.ajobprediction.BadNum,secondaryCnt.toString())>0) {
            this.predection = JOBPREDICTION_CONFIG.BAD_MATCH;
            this.progressPercentage=this.BAD_MATCH_PERCENTAGE;
            //this.jobPredectionSucessMessage = this.predection+" ("+this.progressPercentage+"-)";
            // console.log("Bad");
          } else {
            this.predection = '';
          }
          this.progress.percentage=this.progressPercentage;
          this.jobPredectionSucessMessage = this.predection+" ("+this.progressPercentage+plusminus+")";
          //console.log("this.progressPercentage "+this.progressPercentage);
          //this.jobPredectionSucessMessage = this.predection+' (Name : '+primaryCnt+' Company : '+secondaryCnt+')';
          // console.log("this.jobPredectionSucessMessage "+this.jobPredectionSucessMessage);
          
        });

      }

      //console.log("Predection : "+this.predection);

      //console.log(this.alphanumerology);
    })
  }

  private countRecersive(val) {
    let countVal=0;
    let valueStr = val.toString();
    // console.log("val ::: "+valueStr);
    for(let i=0;i<valueStr.toString().length;i++) {
      countVal = countVal + Number(valueStr[i]);
      // console.log("countVal :: "+countVal);
      
    }
    return countVal;
  }

  resetForm(jobpForm? : NgForm) {
    //this.signupError='';
    if (jobpForm !=null)
      jobpForm.reset();
    this.jobPredectionMessage ='';
    this.jobPredectionSucessMessage ='';
    this.companyTemp ='';
    //this.close();
    //console.log("User Name "+SignupComponent.username+" Password "+SignupComponent.password+" Re Pass : "+SignupComponent.repassword);
    // SignupComponent.username='';
    // SignupComponent.password='';
    // SignupComponent.repassword='';
    // this.signup = new SignUp();
  }

  onFocus(event) {
    this.jobPredectionMessage = '';
    this.jobPredectionSucessMessage = '';
  }

  Fieldlength(fieldValue: string): number {
    //console.log("FIELD LENGTH .."+fieldValue);
    if (fieldValue == null) {
      return 0;
    } else {
      //console.log("FIELD LENGTH .."+fieldValue.length);
      return fieldValue.length;
    }

  }

  CharCount(str, letter) 
  {
    var letterCount = 0;
    for (var position = 0; position < str.length; position++) 
    {
      if (str.charAt(position) == letter)   {
          letterCount += 1;
      }
    }
    return letterCount;
  }

  close() {
    //this.jobPForm.setValue['firstname'] = 'temp';// .setValue('temp');
    //this.jobPForm.controls['lasttname'].setValue('temp');

    // this.jobPForm.controls['firstname'].setValue("aaa");
    // this.jobPForm.controls['lastname'].setValue("aa");

    this.dialogRef.close();
  }
 
}
