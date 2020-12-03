import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  email: any;
  uid: any;
  profile: any;
  user: any;
  
  constructor(
    private db: AngularFirestore,
    private firebase: FirebaseApp,
    private router: Router) {
   }

  

  async fetchProfile(){
    this.user = this.firebase.auth().currentUser.uid;
    // ^ the real thing inside doc()


    await this.db.collection("profile").doc(this.user).get().toPromise()
      .then((data) => {
        this.profile = data.data();
        console.log("email: " + this.profile.email);
      });
    // console.log('user: ' + this.user);
    // console.log('profile: ' + this.profile);
    return await this.profile;
  }

  async achievement(new_achievement: string){
    this.fetchProfile();
    let profile;
    await this.db.collection("profile").doc(this.user).get().toPromise()
      .then(data => {
        profile = data.data();
        console.log(profile.achievement); 
      });

       
    if(this.profile.achievement.indexOf(new_achievement.toUpperCase()) != -1){
      console.log('Achievement Existed');
      return;
    }
    // console.log(new_achievement.toUpperCase());
    // console.log(this.profile.achievement.indexOf('jawabarat'));


    this.profile.achievement.push(new_achievement.toUpperCase());
    this.db.collection("profile").doc(this.user).update(this.profile);

    this.clear(new_achievement.toUpperCase());
    return;
  }

  async clear(clear: string){
    this.fetchProfile();
    let profile;

    await this.db.collection("profile").doc(this.user).get().toPromise()
      .then(data => {
        profile = data.data();
      });

       
    if(this.profile.clear.indexOf(clear.toUpperCase()) != -1){
      console.log('Already Cleared');
      return;
    }

    profile.clear.push(clear.toUpperCase());
    this.db.collection("profile").doc(this.user).update(profile);
    return;
  }

  create(email: any, uid: any){
    console.log("register: " + uid + " Email: " + email);
    this.db.collection("profile").doc("gPwzSC2wexNWOXMDKmqH").get().toPromise()
      .then(function(doc){
        if(doc.exists){
          console.log(doc.data());
        }
      });
        
    this.db.collection("profile").doc(uid).set({
      email: email,
      clear: [],
      achievement: []
    })
    .then(function(){
      console.log("Profile Created");
    }).catch(function(error){
      console.error(error);
    });
  }

  // update(){
  //   this.dbref.doc(this.uid).update({

  //   })
  // }
}
