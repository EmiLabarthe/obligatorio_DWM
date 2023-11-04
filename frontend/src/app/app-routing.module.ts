import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectProposalComponent } from './select-proposal/select-proposal.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { LoginComponent } from './login/login.component';
import { ShowProposalComponent } from './show-proposal/show-proposal.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'select-proposal', component: SelectProposalComponent },
  { path: 'create-proposal', component: CreateProposalComponent },
  { path: 'proposal/:id', component: ShowProposalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
