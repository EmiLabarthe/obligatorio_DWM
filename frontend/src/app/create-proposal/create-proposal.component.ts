import { Component } from '@angular/core';
import { ActivityServiceService } from '../activity-service.service';
import { Proposal } from '../proposal';
import { Activity } from '../activity';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent {
  constructor(private activityService: ActivityServiceService, private proposalService: ProposalService) { }
  selectedActivities: Activity[] = [];
  activities: Activity[] = [];
  title:string=" ";

  ngOnInit(): void {
    this.activityService.getActivities().subscribe(activities => {
      this.activities = activities;
    });
  }

  onSelect(activity: Activity) {
    const index = this.selectedActivities.indexOf(activity);
    if (index !== -1) {
      this.selectedActivities.splice(index, 1);
      console.log(this.selectedActivities);
    } else {
      this.selectedActivities.push(activity);
      console.log(this.selectedActivities);
    }
  }

  isSelected(activity: Activity): boolean {
    return this.selectedActivities.includes(activity);
  }
  sendProposal() {
    const newProposal: Proposal = {
      activities: this.selectedActivities,
      title: this.title,
      id: 0
    };
    this.proposalService.addProposal(newProposal);
    console.log(newProposal);
  }
}
