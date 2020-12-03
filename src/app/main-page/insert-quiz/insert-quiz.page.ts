import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { quiz } from 'src/app/quiz.model';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-insert-quiz',
  templateUrl: './insert-quiz.page.html',
  styleUrls: ['./insert-quiz.page.scss'],
})
export class InsertQuizPage implements OnInit {
  quiz: quiz;
  constructor(
    private quizSvc: QuizService
  ) { }

  ngOnInit() {
  }

  newQuiz(form: NgForm){
    console.log(form.value.provinsi);
    

    if(form.value.questionType == 1){
      this.quiz = {
        questionType: form.value.questionType,
        questionText: form.value.questionText,
        provinsi: form.value.provinsi,
        truefalseAnswer: form.value.truefalseAnswer
      }
    }
    else if(form.value.questionType == 2){
      this.quiz = {
        questionType: form.value.questionType,
        questionText: form.value.questionText,
        provinsi: form.value.provinsi,
        susunAnswer: form.value.susunAnswer,
        susunChoice: form.value.susunChoice
      }
    }
    else{
      this.quiz = {
        questionType: form.value.questionType,
        questionText: form.value.questionText,
        provinsi: form.value.provinsi,
        pgAnswer: form.value.pgAnswer,
        pgChoice: [
          form.value.pgChoice1,
          form.value.pgChoice2, 
          form.value.pgChoice3,
          form.value.pgChoice4
        ]
      }
    }

    console.log(this.quiz);
    this.quizSvc.createQuiz(this.quiz);
  }

}
