import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectProposalComponent } from './select-proposal/select-proposal.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'select-proposal', component: SelectProposalComponent },
  { path: 'create-proposal', component: CreateProposalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
