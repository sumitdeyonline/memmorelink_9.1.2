import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

import { SaveJob } from './savejobs.model';
import { AuthService } from '../../authentication/auth.service';
import { FIREBASE_CONFIG, SEARCH_CONFIG } from 'src/app/global-config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SavejobsService {


  sjCollection: AngularFirestoreCollection <SaveJob>;
  SaveJobc: Observable<SaveJob[]>;
  sDoc: AngularFirestoreDocument<SaveJob>;

  constructor(private auth: AuthService, private afs : AngularFirestore) { 
    this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob);
  }

  addUpdateSaveJobs(sjobc :  SaveJob) {
    this.sjCollection.add(sjobc).then((entry) => {
      //("Entry is "+entry.id);
    })
  }

  deleteSaveJobWithID(id) {
    //console.log("Apply Job ID : "+id);
    this.sDoc = this.afs.doc(`${FIREBASE_CONFIG.SaveJob}/${id}`);
    this.sDoc.delete();
  }

  getUserCompanyByAdmin(username,jobid) {
    this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
      ref.where('username','==',username).where('JobID','==',jobid).orderBy('CreatedDate','desc'));   

      this.SaveJobc = this.sjCollection.snapshotChanges().pipe(take(1),map(changes => {
        // console.log("Country Name  ..... 2");
        return changes.map(a => {
          // console.log("Country Name  ..... 3");;
          const data = a.payload.doc.data() as SaveJob;
          data.id = a.payload.doc.id;
          // console.log("Country Name  ..... 4" +data.id);
          return data;
        });
      }));
  
      return this.SaveJobc;

  }


  getSaveJobByAdmin(username,type,company,startDT?:Date,endDt?:Date) {

    // if ((searchParam.trim() == '') && (serachParam2.trim() !=''))
    // searchParam = serachParam2;

//console.log("Call Type :: "+type);

    if (type=='U') {
      this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
        ref.where('username','==',username).orderBy('CreatedDate','desc'));      
    } if (type=='UJID') {
      this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
        ref.where('username','==',username).where('JobID','==',company).orderBy('CreatedDate','desc'));      
    } else if (type=='C') {
      this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
        ref.where('company','==',company).orderBy('CreatedDate','desc'));      
    } else if (type=='UC') {
      this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
        ref.where('username','==',username).where('company','==',company).orderBy('CreatedDate','desc'));         
    } else if (type=='UD') {
      if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
          ref.where('username','==',username).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         
      } else if (startDT.toString() == 'Invalid Date') {
        this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
          ref.where('username','==',username).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         

      } else if (endDt.toString() == 'Invalid Date') {
        this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
          ref.where('username','==',username).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc')); 
      }            
    } else if (type=='UDF') {
        this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
          ref.where('username','==',username).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.FIRST_PAGE_RECORD_LIMIT));                  
    } else if (type=='UDM') {
      this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
        ref.where('username','==',username).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.MORE_PAGE_RECORD_LIMIT));                  
    } else if (type=='CD') {
      //console.log("!!!!! Start Date :: "+startDT+" End Date ::: "+endDt);
      if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        //console.log("Start Date :: "+startDT+" End Date ::: "+endDt);
        this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
          ref.where('company','==',company).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));          
      } else if (startDT.toString() == 'Invalid Date') { 
        this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
          ref.where('company','==',company).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));            
      } else if (endDt.toString() == 'Invalid Date') {
        this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
          ref.where('company','==',company).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc'));          
      }
    } else if (type=='UCD') {
      if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
          ref.where('username','==',username).where('company','==',company).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         

      } else if (startDT.toString() == 'Invalid Date') {  
        this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
          ref.where('username','==',username).where('company','==',company).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         

      } else if (endDt.toString() == 'Invalid Date') {
        this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
          ref.where('username','==',username).where('company','==',company).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc'));         

      }
    } 
    
    // else if (type=='UAD') {
    //   if (startDT.toString() == '') {
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('ApplyToEmail','==',username).where('FromEmail','==',company).orderBy('CreatedDate','desc'));         
    //   } else if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('ApplyToEmail','==',username).where('FromEmail','==',company).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         

    //   } else if (startDT.toString() == 'Invalid Date') {  
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('ApplyToEmail','==',username).where('FromEmail','==',company).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         

    //   } else if (endDt.toString() == 'Invalid Date') {
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('ApplyToEmail','==',username).where('FromEmail','==',company).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc'));         

    //   }
    
    // } else if (type=='CUF') {  // This is for the candidate

    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('username','==',username).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.FIRST_PAGE_RECORD_LIMIT));         

    // } else if (type=='CUA') {  // This is for the candidate

    //   this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //     ref.where('username','==',username).orderBy('CreatedDate','desc'));         

    // } else if (type=='CUD') {  // This is for the candidate
    //   //console.log("Username CUD : "+username);
    //   if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
    //     //console.log("Username : "+username);
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('username','==',username).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         
    //   } else if (startDT.toString() == 'Invalid Date') {
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('username','==',username).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         

    //   } else if (endDt.toString() == 'Invalid Date') {
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('username','==',username).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc')); 
    //   }

    // }  else if (type=='AJID') { // Applicant by jobID

    //   if (startDT.toString() == '') {
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('JobID','==',username).orderBy('CreatedDate','desc')); 
    //   } else if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
    //     //console.log("Username : "+username);
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('JobID','==',username).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         
    //   } else if (startDT.toString() == 'Invalid Date') {
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('JobID','==',username).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         

    //   } else if (endDt.toString() == 'Invalid Date') {
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('JobID','==',username).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc')); 
    //   } 
    //   } else if (type=='FPAJID') { // First Page by jobID

    //     //console.log("Username : "+username);
    //     this.ajCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob, ref =>  
    //       ref.where('JobID','==',username).orderBy('CreatedDate','desc'));         
    //   }




         // console.log("Country Name  ..... 1");
    this.SaveJobc = this.sjCollection.snapshotChanges().pipe(map(changes => {
      // console.log("Country Name  ..... 2");
      return changes.map(a => {
        // console.log("Country Name  ..... 3");;
        const data = a.payload.doc.data() as SaveJob;
        data.id = a.payload.doc.id;
        // console.log("Country Name  ..... 4" +data.id);
        return data;
      });
    }));

    return this.SaveJobc;
  } 



}
