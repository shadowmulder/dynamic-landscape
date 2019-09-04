import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

import { LandscapePageComponent } from './landscape-page/landscape-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'landscape', component: LandscapePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
