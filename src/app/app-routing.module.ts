import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication-page/authentication-page.module').then( m => m.AuthenticationPagePageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main-page/main-page.module').then( m => m.MainPagePageModule)
  },
  {
    path: 'how-to-play',
    loadChildren: () => import('./how-to-play-page/how-to-play-page.module').then( m => m.HowToPlayPagePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile-page/profile-page.module').then( m => m.ProfilePagePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
