import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePagePage } from './profile-page.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePagePage
  },
  {
    path: 'achievements',
    loadChildren: () => import('./achievements/achievements.module').then( m => m.AchievementsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePagePageRoutingModule {}
