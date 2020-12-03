import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertQuizPageRoutingModule } from './insert-quiz-routing.module';

import { InsertQuizPage } from './insert-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertQuizPageRoutingModule
  ],
  declarations: [InsertQuizPage]
})
export class InsertQuizPageModule {}
