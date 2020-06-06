import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Sequence } from './sequence.model';
import { Observable } from 'rxjs';

import { take, tap } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { FIREBASE_CONFIG } from 'src/app/global-config';


@Injectable({
  providedIn: 'root'
})
export class SequencenumberService {

  seqCollection: AngularFirestoreCollection <Sequence>;
  seqc: Observable<Sequence[]>;
  cqDoc: AngularFirestoreDocument<Sequence>;

  seqceee: Observable<Sequence>;

  sequence:Sequence[];

  constructor(private afs : AngularFirestore) { 
    this.seqCollection = this.afs.collection(FIREBASE_CONFIG.SequenceNumber);
  }


  getUpdateSequenceNumber(id) {

    return this.afs.doc(`${FIREBASE_CONFIG.SequenceNumber}/${id}`).valueChanges();

    //  this.seqCollection = this.afs.collection(FIREBASE_CONFIG.SequenceNumber, ref =>
    //    ref);

          this.seqc =   this.seqCollection.snapshotChanges().pipe(take(1),map(changes => {
        //this.seqc = this.seqCollection.snapshotChanges().pipe(map(changes => {
         return changes.map(a => {
           //console.log("List Service ..... 6");
          const data = a.payload.doc.data() as Sequence;
          data.id = a.payload.doc.id;
          
         let seqNum = data.SeqNum + 1;


           this.updateData(data.id,seqNum);

           return data;
        });
       }));
      return this.seqc;

    
    // const orgRef = this.seqCollection.doc(`${FIREBASE_CONFIG.SequenceNumber}/${id}`);

    // this.afs.


      // let sequnumber=0;
      // this.cqDoc = this.afs.doc<Sequence>(`${FIREBASE_CONFIG.SequenceNumber}/${id}`);
      // this.seqceee = this.cqDoc.valueChanges().pipe(take(1),map(value => {
        


      // });
      
      // this.seqceee.subscribe(value => {
      //   let  seq: Sequence = { SeqNum: value.SeqNum + 1 }
      //   sequnumber = value.SeqNum;
      //   console.log("Sequence Numbre :::: +"+sequnumber);
      //   this.cqDoc.update(seq);
      //   return sequnumber;
      // });
      // return sequnumber;

  }

  updateData(id,seqNum) {
    let  seq: Sequence = { SeqNum:seqNum }

    this.cqDoc = this.afs.doc(`${FIREBASE_CONFIG.SequenceNumber}/${id}`);
    this.cqDoc.update(seq).then((entry) => {
      //console.log("Entry ISSSSS "+entry);
    });

        

  }
}
