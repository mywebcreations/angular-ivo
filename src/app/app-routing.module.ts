import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRegistrationComponent } from './edit-registration/edit-registration.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'registration/:id', component: EditRegistrationComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
