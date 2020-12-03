import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertQuizPage } from './insert-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: InsertQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertQuizPageRoutingModule {}
