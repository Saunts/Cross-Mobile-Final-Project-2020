import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/profile.service';
import { QuizService } from 'src/app/quiz.service';
import { ModalPage } from './modal/modal.page';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  private totalQuestions;
  private questionType; //tipe kuis
  private questions;
  private questionText;
  private counter = 1; //nomor pertanayaan
  private counterText; //nomor pertanyaan per jumlah pertanyaan
  private data;
  private totalCorrect = 0;
  private totalIncorrect = 0;
  private scoreText;
  private province;
  private isPassed;

  //UNTUK BENAR SALAH
  private benarSalah_Answer;
  private benarSalah_UserAnswer;
  //END UNTUK BENAR SALAH

  //UNTUK SUSUN HURUF 
  private susunHuruf_Answer; //jawaban
  private susunHuruf_ChoiceString; //string pilihan jawaban
  private susunHuruf_Choices; //array pilihan jawaban 
  private susunHuruf_totalAnswer; //jumlah string jawaban
  private susunHuruf_choiceCounter = 0;
  //END UNTUK SUSUN HURUF

  //UNTUK PILIHAN GANDA
  private pilihanGanda_Answer;
  private pilihanGanda_Choices; //array pilihan jawaban
  private pilihanGanda_Model = [{
    id: 1,
    choice: '',
    value: false
  }, {
    id: 2,
    choice: '',
    value: false
  }, {
    id: 3,
    choice: '',
    value: false
  }, {
    id: 4,
    choice: '',
    value: false
  }]
  //END UNTUK PILIHAN GANDA

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private quizService: QuizService, 
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      if(!paramMap.has('province')) {
        return;
      }
      this.province = paramMap.get('province');
    });
    console.log(this.province);
    await this.quizService.fetchQuestion(this.province).then((quiz) => {
      this.data = quiz;
    });
    this.totalQuestions = this.data.length;
    // console.log(this.data);
    this.questionType = this.data[this.counter-1].questionType;
    this.questionText = this.data[this.counter-1].questionText;

    if (this.questionType == 1) {
      this.benarSalah_Answer = Boolean(JSON.parse(this.data[this.counter-1].truefalseAnswer));
    } 
    else if (this.questionType == 2) {
      this.susunHuruf_Answer = this.data[this.counter-1].susunAnswer;
      this.susunHuruf_ChoiceString = this.data[this.counter-1].susunChoice;

      this.susunHuruf_totalAnswer = Array(this.susunHuruf_Answer.length).fill(0).map((x,i)=>i);
      this.susunHuruf_Choices = this.susunHuruf_ChoiceString.split('');
      this.counterText = this.counter.toString() + '/' + this.totalQuestions.toString();
    } 
    else if (this.questionType == 3) {
      this.pilihanGanda_Answer = this.data[this.counter-1].PGAnswer;
      this.pilihanGanda_Choices = this.data[this.counter-1].PGChoice;

      for (let i=0 ; i<this.pilihanGanda_Model.length; i++) {
        this.pilihanGanda_Model[i].choice = this.pilihanGanda_Choices[i];
      }
    }
  }

  async presentModal(flag) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        correctFlag: flag,
      },
      cssClass: 'success-modal',
    });
    return await modal.present();
  }

  handleSusunHurufAnswer(event) {
    let id = event.srcElement.id;
    let value = event.srcElement.innerText;

    //set huruf kalo element ada
    if (document.getElementById('letter'+this.susunHuruf_choiceCounter)) {
      // event.srcElement.classList.remove('ion-color-light');
      // event.srcElement.classList.add('ion-color-primary');
      document.getElementById('letter'+this.susunHuruf_choiceCounter).innerText = value; //untuk jawaban
      this.susunHuruf_choiceCounter++;
    }
  }

  removeSusunHurufBtnColor() {
    for(let i=0 ; i<this.susunHuruf_Choices.length; i++) {
      document.getElementById(i.toString()).classList.remove('ion-color-primary');
      document.getElementById(i.toString()).classList.add('ion-color-light');
    }
  }

  handleQuestionChange() {
    this.counter++;
    if (this.counter > this.totalQuestions) {
      this.handleFinishQuiz();
    } else {
      this.questionType = this.data[this.counter-1].questionType;
      this.questionText = this.data[this.counter-1].questionText;
      this.counterText = this.counter.toString() + '/' + this.totalQuestions.toString();

      if (this.questionType == 1) {
        this.benarSalah_Answer = Boolean(JSON.parse(this.data[this.counter-1].truefalseAnswer));
      } 
      else if (this.questionType == 2) {
        this.susunHuruf_Answer = this.data[this.counter-1].susunAnswer;
        this.susunHuruf_ChoiceString = this.data[this.counter-1].susunChoice;

        this.susunHuruf_totalAnswer = Array(this.susunHuruf_Answer.length).fill(0).map((x,i)=>i);
        this.susunHuruf_Choices = this.susunHuruf_ChoiceString.split('');
        this.counterText = this.counter.toString() + '/' + this.totalQuestions.toString();
      } 
      else if (this.questionType == 3) {
        this.pilihanGanda_Answer = this.data[this.counter-1].PGAnswer;
        this.pilihanGanda_Choices = this.data[this.counter-1].PGChoice;

        for (let i=0 ; i<this.pilihanGanda_Model.length; i++) {
          this.pilihanGanda_Model[i].choice = this.pilihanGanda_Choices[i];
        }
      }
    }
  }

  handleFinishQuiz() {
    this.scoreText = this.totalCorrect.toString() + '/' + this.totalQuestions.toString();
    if (this.totalCorrect == this.totalQuestions) {
      this.isPassed = true;
      this.profileService.achievement(this.province);
    } 
    else {
      if (this.totalCorrect / this.totalQuestions >= 0.65) {
        this.profileService.clear(this.province);
        this.isPassed = true;
      } else {
        this.isPassed = false;
      }
    }
    this.questionType = 4;
  }

  handleLanjut() {
    let answer = '';

    if (this.questionType == 1) {
      if (this.benarSalah_Answer == this.benarSalah_UserAnswer) {
        this.presentModal(true);
        setTimeout(()=> {
          this.modalCtrl.dismiss({
            'dismissed': true
          });
          this.totalCorrect++;
          this.handleQuestionChange();
        }, 2000);
      } else {
        this.presentModal(false);
        setTimeout(()=> {
          this.modalCtrl.dismiss({
            'dismissed': true
          });
          this.totalIncorrect++;
          this.handleQuestionChange();
        }, 2000);
      }
    }
    else if (this.questionType == 2) {
      this.removeSusunHurufBtnColor();
      for (let i=0; i<this.susunHuruf_totalAnswer.length; i++) {
        if (document.getElementById('letter'+i).innerText != ''){
          answer = answer.concat(document.getElementById('letter'+i).innerText);
        }
      }
      
      this.handleUlang();

      if (answer == this.susunHuruf_Answer) {
        this.presentModal(true);
        setTimeout(()=> {
          this.modalCtrl.dismiss({
            'dismissed': true
          });
          this.totalCorrect++;
          this.handleQuestionChange();
        }, 2000);
      }
      else {
        this.presentModal(false);
        setTimeout(()=> {
          this.modalCtrl.dismiss({
            'dismissed': true
          });
          this.totalIncorrect++;
          this.handleQuestionChange();
        }, 2000);
      } 
    } 
    else if (this.questionType == 3) {
      let answerArr = this.pilihanGanda_Model.filter(function(answer) {
        return answer.value == true;
      })

      if(answerArr.length != 0) {
        answer = answerArr[0].choice;
      }

      if(answer == this.pilihanGanda_Answer) {
        this.presentModal(true);
        setTimeout(()=> {
          this.modalCtrl.dismiss({
            'dismissed': true
          });
          this.totalCorrect++;
          this.handleQuestionChange();
        }, 2000);
      } else {
        this.presentModal(false); 
        setTimeout(()=> {
          this.modalCtrl.dismiss({
            'dismissed': true
          });
          this.totalIncorrect++;
          this.handleQuestionChange();
        }, 2000);
      }
    }
  }

  finishRoute() {
    this.router.navigate(['/main/menu']);
  }

  handleUlang() {
    this.removeSusunHurufBtnColor();
    for (let i=0; i<this.susunHuruf_totalAnswer.length; i++) {
      document.getElementById('letter'+i).innerText = null;
    }
    this.susunHuruf_choiceCounter = 0;
  }

  handleMCAnswer(data) {
    //only select one check box
    for(let i=0 ; i<this.pilihanGanda_Model.length ; i++) {
      if (this.pilihanGanda_Model[i].id != data.id) {
        this.pilihanGanda_Model[i].value = false;
      } 
    }
  }

  handleSwipe(event) {
    if (event.type == 'swipeleft') {
      this.benarSalah_UserAnswer = false;
    } else {
      this.benarSalah_UserAnswer = true;
    }

    this.handleLanjut();
  }

}
