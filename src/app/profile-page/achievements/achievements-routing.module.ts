import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchievementsPage } from './achievements.page';

const routes: Routes = [
  {
    path: '',
    component: AchievementsPage
  },
  {
    path: 'detail/:province',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AchievementsPageRoutingModule {}
