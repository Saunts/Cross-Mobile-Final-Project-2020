import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPagePage } from './main-page.page';

const routes: Routes = [
  {
    path: '',
    component: MainPagePage
  },
  {
    path: 'play',
    loadChildren: () => import('./play/play.module').then( m => m.PlayPageModule)
  },  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'insert-quiz',
    loadChildren: () => import('./insert-quiz/insert-quiz.module').then( m => m.InsertQuizPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPagePageRoutingModule {}
