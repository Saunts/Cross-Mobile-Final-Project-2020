import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HowToPlayPagePageRoutingModule } from './how-to-play-page-routing.module';

import { HowToPlayPagePage } from './how-to-play-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HowToPlayPagePageRoutingModule
  ],
  declarations: [HowToPlayPagePage]
})
export class HowToPlayPagePageModule {}
