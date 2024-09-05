import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { UserInterface } from '../../interface/user.interface';
import $ from "jquery"

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink,RouterLinkActive, CommonModule],
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


  openLoginPanel(){
    $("#popup-layer-navbar").fadeIn(function() {
      $("#popup-login").slideToggle();
      $("body").css("overflow", "hidden");
    }).css("display", "flex");
  }

  closeLoginPanel(){
    $("#popup-login").slideToggle(function() {
      $("#popup-layer-navbar").fadeOut(function() {
          $("body").css("overflow", "auto");
      });
    });
  }

  toggleNavbarMobile(){
    $("#popup-navbar").slideToggle();
  }

}
