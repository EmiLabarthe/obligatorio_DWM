import { Component } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
import { Admin } from '../admin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private adminService: AdminServiceService, private router: Router) { }
  admin: Admin = {
    name: "",
    password: ""
  }
  errorMessage: string = "";
  sendAdmin() {
    this.adminService.postAdmin(this.admin).subscribe(
      (response: any) => {
        if (response.exists == true) {
          localStorage.setItem('jwt', JSON.stringify(response.token));
          console.log('Admin successfully sent:', response);
          this.router.navigate(['/select-proposal']);
        } else {
          console.log('Admin not found');
          this.errorMessage = 'Incorrect username or password';
        }
      },
      (error) => {
        console.log('Error sending proposal:', error);
        this.errorMessage = 'Server error occurred';
        // Handle the error (show a message to the user, etc.)
      }
    );
  }



}
