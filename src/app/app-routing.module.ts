import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  { path: 'play-tic-tac-toe', component: MainComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: 'play-tic-tac-toe' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
