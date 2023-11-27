import { Component } from '@angular/core';

@Component({
  selector: 'app-guest-wait',
  templateUrl: './guest-wait.component.html',
  styleUrls: ['./guest-wait.component.css']
})
export class GuestWaitComponent {

  nickname?: string | null;

  ngOnInit(): void {
    this.nickname = localStorage.getItem('nickname');
  }
}
