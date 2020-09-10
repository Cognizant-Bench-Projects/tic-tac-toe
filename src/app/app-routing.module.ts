import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: 'play-tic-tac-toe', component: AppComponent},
  { path: '**', redirectTo: 'play-tic-tac-toe' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
