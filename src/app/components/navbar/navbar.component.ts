import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { UserInterface } from '../../interface/user.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  IS_VERIFIED:any
  USER!: UserInterface

  constructor(private userService: UserService, private authService: SocialAuthService){}

  async ngOnInit(){
    this.IS_VERIFIED = await this.userService.verifyToken()
    
    if(!this.IS_VERIFIED){
      this.authService.authState.subscribe((user) => {
        console.log(user);
        
        this.userService.loginUser(user).then(result => {
          window.location.href = "/profile"
        }).catch((e:any) => {
          console.log(e);
        })
      });
    }else{
      this.USER = await this.userService.getUserData()
    }
  }

}
