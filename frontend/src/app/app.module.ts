import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SelectProposalComponent } from './select-proposal/select-proposal.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { ProposalLobbyComponent } from './proposal-lobby/proposal-lobby.component';
import { RankingProposalComponent } from './ranking-proposal/ranking-proposal.component';
import { SelectGuestNicknameComponent } from './select-guest-nickname/select-guest-nickname.component';
import { GuestWaitComponent } from './guest-wait/guest-wait.component';
import { VoteActivityComponent } from './vote-activity/vote-activity.component';
import { FormsModule } from '@angular/forms';
import { LastElementPipe } from './last-element.pipe';
import { ExampleInterceptorInterceptor } from './interceptor/interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectProposalComponent,
    CreateProposalComponent,
    ProposalLobbyComponent,
    RankingProposalComponent,
    SelectGuestNicknameComponent,
    GuestWaitComponent,
    VoteActivityComponent,
    LastElementPipe 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
    providers: [ExampleInterceptorInterceptor,{
      provide: HTTP_INTERCEPTORS,
      useClass: ExampleInterceptorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
