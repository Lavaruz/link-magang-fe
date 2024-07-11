import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  USER:any

  constructor(private userService: UserService, private location: Location){}

  async ngOnInit() {
    this.USER = await this.userService.getUserData()
  }

  logoutFunction(){
    this.userService.logoutUser()
    this.location.back()
  }

}
