import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-select-guest-nickname',
  templateUrl: './select-guest-nickname.component.html',
  styleUrls: ['./select-guest-nickname.component.css']
})
export class SelectGuestNicknameComponent {

  id?: string;

  constructor(private router: Router, private route: ActivatedRoute){

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['sessionId'];
      });
  }

  enterNickname(nickname: string){
    localStorage.setItem('nickname', nickname);
    this.router.navigate([`guest-waiting/${this.id}`])
  }

}
