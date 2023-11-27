import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectProposalComponent } from './select-proposal/select-proposal.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { LoginComponent } from './login/login.component';
import { SelectGuestNicknameComponent } from './select-guest-nickname/select-guest-nickname.component';
import { GuestWaitComponent } from './guest-wait/guest-wait.component';
import { VoteActivityComponent } from './vote-activity/vote-activity.component';
import { ProposalLobbyComponent } from './proposal-lobby/proposal-lobby.component';
import { RankingProposalComponent } from './ranking-proposal/ranking-proposal.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'select-nickname', component: SelectGuestNicknameComponent },
  { path: 'guest-waiting', component: GuestWaitComponent},
  { path: 'vote-activity/:sessionId', component: VoteActivityComponent},
  { path: 'select-proposal', component: SelectProposalComponent },
  { path: 'create-proposal', component: CreateProposalComponent },
  { path: 'proposal-lobby/:proposalId', component: ProposalLobbyComponent},
  { path: 'ranking-proposal/:sessionId', component: RankingProposalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
