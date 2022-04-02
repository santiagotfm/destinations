import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(
    private firestore: AngularFirestore
  ) { }

  getTrips(){
    return this.firestore.collection("trips").snapshotChanges();
  }


  createTrip(trip:any){
    return this.firestore.collection("trips").add(trip);
  }


  updateTrip(id:any, trip:any){
    return this.firestore.collection("trips").doc(id).update(trip);
  }
  
  deleteTrip(id:any){
    return this.firestore.collection("trips").doc(id).delete();

  }
}
