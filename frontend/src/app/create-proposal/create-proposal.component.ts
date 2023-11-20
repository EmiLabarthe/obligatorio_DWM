import { Component } from '@angular/core';
import { ActivityServiceService } from '../activity-service.service';
import { Proposal } from '../proposal';
import { Activity } from '../activity';
import { ProposalService } from '../proposal.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent {
  constructor(private activityService: ActivityServiceService, private proposalService: ProposalService, private router: Router) { }
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
      _id: ''
    };
      

    this.proposalService.addProposal(newProposal).subscribe(
        (response) => {
            console.log('Proposal su`ccessfully sent:', response);
            this.router.navigate(['/select-proposal']);
        },
        (error) => {
            console.log('Error sending proposal:', error);
            // Handle the error (show a message to the user, etc.)
        }
    );
}
backToAllProposals(){
  this.router.navigate(['/select-proposal']);
}



  
}
