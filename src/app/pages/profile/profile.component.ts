import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  constructor(private userService: UserService, private location: Location){}

  logoutFunction(){
    this.userService.logoutUser()
    this.location.back()
  }

}
