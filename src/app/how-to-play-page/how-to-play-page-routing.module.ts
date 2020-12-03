import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowToPlayPagePage } from './how-to-play-page.page';

const routes: Routes = [
  {
    path: '',
    component: HowToPlayPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowToPlayPagePageRoutingModule {}
