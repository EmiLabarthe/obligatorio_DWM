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
selectedActivities?: Activity[];

activities: Activity[] = [];

ngOnInit(): void {
  this.activityService.getActivities().subscribe(activities => {
    this.activities = activities;
    this.selectedActivities = []; 
 });
}

onSelect(activity:Activity){
  this.selectedActivities?.push(activity);
  console.log(this.selectedActivities);
  
}
}
