import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { UserInterface } from '../../interface/user.interface';
import $ from "jquery"

declare var google: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, AfterViewInit {

  router = inject(Router)

  IS_LOGIN:any
  USER!: UserInterface
  DONE_LOADING = false

  constructor(private userService: UserService, private authService: SocialAuthService){}

  ngOnInit(){
    this.IS_LOGIN = this.userService.checkAuth()
    this.userService.getUserData().then(userData => {
      this.USER = userData
      this.DONE_LOADING = true
    })
  }

  ngAfterViewInit(): void {
    window.onload = () => {
      if(!this.userService.checkAuth()){
        google.accounts.id.initialize({
          client_id: "698401836212-gi5ntasmqfae7hiu2q0qu8i2h2gco82h.apps.googleusercontent.com",
          callback: (response: any) => this.handleGoogleSignIn(response)
        });
        google.accounts.id.renderButton(
          document.getElementById("button-google"),
          { size: "large", type: "standard", shape: "pill", text:"continue_with" }  // customization attributes
        );
      }
    }
  }

  handleGoogleSignIn(response: any) {
    this.userService.googleLoginHandler(response.credential).then(userAuthenticate => {
      this.userService.setCookie(userAuthenticate, "userAuthenticate")
      this.router.navigate(["/profile/me"])
      $("body").css("overflow", "auto");
    })
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
