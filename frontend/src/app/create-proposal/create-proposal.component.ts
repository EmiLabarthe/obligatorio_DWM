import { Component } from '@angular/core';
import { ActivityServiceService } from '../activity-service.service';
import { Activity } from '../activity';
@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent {
constructor(private activityService: ActivityServiceService) {}
selectedActivity?: Activity;

activities: Activity[] = [];

ngOnInit(): void {
   this.activityService.getActivities().subscribe(activity => {
    this.activities = activity
  });
}
onSelect(activity:Activity){
  this.selectedActivity = activity;
}
}
