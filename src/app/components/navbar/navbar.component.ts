import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  IS_VERIFIED:boolean = false

  constructor(private userService: UserService){}

  async ngOnInit(){
    this.IS_VERIFIED = await this.userService.verifyToken()
  }

}
