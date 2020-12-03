import { NgModule } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { quiz } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  allquiz: quiz[];
  newquiz: quiz;
  // questionType: number;
  // questionText: string;

  // truefalseAnswer: boolean;

  // susunAnswer: string;
  // susunChoice: string;

  // PGAnswer:string;
  // PGChoice: [];

  constructor(
    private db: AngularFirestore
  ) { }

  async fetchQuestion(provinsi: string){
    // var questionType;
    // if(type == 1){
    //   questionType = 'True_or_False';
    // }
    // else if(type == 2){
    //   questionType = 'Susun_Kata';
    // }
    // else{
    //   questionType = 'Pilihan_Ganda';
    // }
    var allquiz = [];
    var susunkata = [];
    var truefalse = [];
    var pilihanganda = [];

    await this.db.collection("quiz").doc(provinsi.toUpperCase()).collection("True_or_False").get().toPromise()
      .then(function(col){
        col.forEach(function(doc){
          truefalse.push(doc.data());
        });
      });

    await this.db.collection("quiz").doc(provinsi.toUpperCase()).collection("Susun_Kata").get().toPromise()
      .then(function(col){
        col.forEach(function(doc){
          susunkata.push(doc.data());
        });
      });

    await this.db.collection("quiz").doc(provinsi.toUpperCase()).collection("Pilihan_Ganda").get().toPromise()
      .then(function(col){
        col.forEach(function(doc){
          pilihanganda.push(doc.data());
        });
      });

      // allquiz.push(truefalse, susunkata, pilihanganda);
      truefalse.forEach(function(ele){
        allquiz.push(ele);
      });
      susunkata.forEach(function(ele){
        allquiz.push(ele);
      });
      pilihanganda.forEach(function(ele){
        allquiz.push(ele);
      });


      let curId = allquiz.length;
      while(0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = allquiz[curId];
        allquiz[curId] = allquiz[randId];
        allquiz[randId] = tmp;
      }
      allquiz['clear'] = Math.ceil(allquiz.length * 0.65);
      return allquiz;
  }

  createQuiz(newquiz: quiz){
    console.log(newquiz);
    if(newquiz.questionType == 1){
        this.db.collection("quiz").doc(newquiz.provinsi).collection("True_or_False").add({
          questionType: newquiz.questionType,
          questionText: newquiz.questionText,
          provinsi: newquiz.provinsi,
          truefalseAnswer: newquiz.truefalseAnswer
        })
        .then(function(){
          console.log("True False Question Created");
        }).catch(function(error){
          console.error(error);
        });
    }
    else if(newquiz.questionType == 2){
      this.db.collection("quiz").doc(newquiz.provinsi).collection("Susun_Kata").add({
        questionType: newquiz.questionType,
        questionText: newquiz.questionText,
        provinsi: newquiz.provinsi,
        susunAnswer: newquiz.susunAnswer,
        susunChoice: newquiz.susunChoice
      })
      .then(function(){
        console.log("Susun Kata Question Created");
      }).catch(function(error){
        console.error(error);
      });
    }
    else if(newquiz.questionType == 3){
      this.db.collection("quiz").doc(newquiz.provinsi).collection("Pilihan_Ganda").add({
        questionType: newquiz.questionType,
        questionText: newquiz.questionText,
        provinsi: newquiz.provinsi,
        PGAnswer: newquiz.pgAnswer,
        PGChoice: newquiz.pgChoice
      })
      .then(function(){
        console.log("Pilihan Ganda Question Created");
      }).catch(function(error){
        console.error(error);
      });
    }
  }

}
