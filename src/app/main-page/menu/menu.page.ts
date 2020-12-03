import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/quiz.service';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user: any;
  profile: any;
  quiz = [];
  constructor(
    private router: Router,
    private profileSvc: ProfileService,
    private fireAuth: AngularFireAuth,
    private firebase: FirebaseApp,
    private quizSvc: QuizService) { }

  async ngOnInit() {
    // await this.profileSvc.fetchProfile()
    // .then((data) => {
    //   this.user = data;
    // });
    // console.log(this.user);
    // console.log(this.user.achievement);

    //buat ambil quiz

    await this.quizSvc.fetchQuestion('JAKARTa')
    .then((quiz) => {
      this.quiz = quiz;
    });
    console.log(this.quiz);

    //buat masukin achievement
    // this.profileSvc.achievement('Jakarta');
    
  }

  async getQuiz(){
    
  }


  logout(){
    this.router.navigateByUrl('auth/login');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('uid');
  }

}
