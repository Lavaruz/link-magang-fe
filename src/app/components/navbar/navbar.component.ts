import { AfterViewInit, Component, inject, NgZone, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule, NgIf, Location } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserInterface } from '../../interface/user.interface';
import $ from "jquery"
import { accounts } from 'google-one-tap';
import { environment } from '../../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, AfterViewInit {

  router = inject(Router)
  BURGER_OPEN = false

  IS_LOGIN:any
  USER_NAVBAR!: UserInterface
  DONE_LOADING_NAVBAR = false

  constructor(private userService: UserService, private location: Location, private ngZone: NgZone){}

  ngOnInit(){
    this.IS_LOGIN = this.userService.checkAuth()
    if(this.IS_LOGIN){
      this.userService.getUserData().then(userData => {
        this.USER_NAVBAR = userData
        this.DONE_LOADING_NAVBAR = true
      })
    }
  }

  ngAfterViewInit(): void {
    // Hanya tampilkan tombol Google jika user belum login
    if (!this.IS_LOGIN) {
      setTimeout(() => {
        const gAccounts: accounts = google.accounts;
        gAccounts.id.initialize({
          client_id: environment.google_client_id,
          callback: ({ credential }) => {
            this.ngZone.run(() => {
              this.handleGoogleSignIn(credential);
            });
          },
        });
  
        const googleButton = document.getElementById('button-google') as HTMLElement;
        const googleButtonMobile = document.getElementById('button-google-mobile') as HTMLElement;
    
        // Render tombol Google di element dengan id "button-google"
        if (googleButton && googleButtonMobile) {
          gAccounts.id.renderButton(googleButton, {
            size: 'large',
            type: "icon",
          });
          gAccounts.id.renderButton(googleButtonMobile, {
            type: "icon",
            size: "large"
          });
        }
        gAccounts.id.prompt();
      }, 1000); // Delay untuk memastikan tombol sudah tersedia
    }
  }

  onGoogleSignIn(): void {
    $("#popup-navbar").slideToggle("fast");
    $("#popup-navbar-layer").fadeOut("fast")

    $("#popup-layer-navbar").fadeIn("fast", function() {
      $("#popup-login").slideToggle("fast");
      $("body").css("overflow", "hidden");
    }).css("display", "flex");
    // google.accounts.id.prompt(); // Menampilkan prompt Google Sign-In
  }

  goToPost(){
    if(this.userService.checkAuth()){      
      this.router.navigate(["/posts/foryou"])
    }else{
      this.router.navigate(["/posts/explore"])
    }
  }

  handleGoogleSignIn(response: any) {
    this.userService.googleLoginHandler(response).then(userAuthenticate => {
      this.userService.setCookie(userAuthenticate, "userAuthenticate")
      this.userService.getUserData().then(userData => {
        if(userData.skills.length == 0) this.router.navigate(["/profile/completion"])
          else this.router.navigate(["/profile/me"])
      })
      $("body").css("overflow", "auto");
    })
  }


  openLoginPanel(){
    $("#popup-layer-navbar").fadeIn("fast", function() {
      $("#popup-login").slideToggle("fast");
      $("body").css("overflow", "hidden");
    }).css("display", "flex");
  }

  closeLoginPanel(){
    $("#popup-login").slideToggle("fast", function() {
      $("#popup-layer-navbar").fadeOut("fast", function() {
          $("body").css("overflow", "auto");
      });
    });
  }

  toggleNavbarMobile(){
    // $("#navbar-burger").toggleClass("uil-bars uil-times")
    $("#popup-navbar-layer").fadeToggle("fast", function(){
      $("#popup-navbar").slideToggle("fast");
    })
  }

  buttonLogout(){
    this.userService.deleteCookie(false)
    this.location.back()
  }



  hideAllPopup(evt:any, e:any){
    const $this = $(evt)

    if(e.target.id == "popup-layer-navbar"){
      $this.children().each(function(){
        if($(this).is(":visible")){
          $(this).slideToggle("fast") 
          $this.fadeOut("fast")
          $("body").css("overflow", "auto")
        }
      })
    }
  }

}
