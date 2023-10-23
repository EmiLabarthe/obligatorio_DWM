import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingProposalComponent } from './ranking-proposal.component';

describe('RankingProposalComponent', () => {
  let component: RankingProposalComponent;
  let fixture: ComponentFixture<RankingProposalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingProposalComponent]
    });
    fixture = TestBed.createComponent(RankingProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
