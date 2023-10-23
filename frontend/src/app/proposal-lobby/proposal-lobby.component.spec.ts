import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalLobbyComponent } from './proposal-lobby.component';

describe('ProposalLobbyComponent', () => {
  let component: ProposalLobbyComponent;
  let fixture: ComponentFixture<ProposalLobbyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalLobbyComponent]
    });
    fixture = TestBed.createComponent(ProposalLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
