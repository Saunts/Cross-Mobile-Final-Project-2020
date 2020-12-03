import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayPage } from './play.page';

const routes: Routes = [
  {
    path: '',
    component: PlayPage
  },
  {
    path: 'provinces/:island',
    loadChildren: () => import('./provinces/provinces.module').then( m => m.ProvincesPageModule)
  },
  {
    path: 'quiz/:province',
    loadChildren: () => import('./quiz/quiz.module').then( m => m.QuizPageModule)
  },
  {
    path: 'island',
    loadChildren: () => import('./island/island.module').then( m => m.IslandPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayPageRoutingModule {}
