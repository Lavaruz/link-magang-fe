import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  IS_VERIFIED:boolean = false

  constructor(private userService: UserService, private authService: SocialAuthService){}

  async ngOnInit(){
    this.IS_VERIFIED = await this.userService.verifyToken()
    if(this.IS_VERIFIED == false){
      this.authService.authState.subscribe((user) => {
        this.userService.loginUser(user).then(result => {
          window.location.href = "/profile"
        }).catch((e:any) => {
          console.log(e);
        })
      });
    }
  }

}
