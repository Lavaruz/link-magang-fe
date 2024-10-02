import { AfterViewInit, Component, inject, NgZone, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule, NgIf, Location, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserInterface } from '../../interface/user.interface';
import $ from "jquery"
import { accounts } from 'google-one-tap';
import { environment } from '../../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink,RouterLinkActive, CommonModule, NgOptimizedImage],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, AfterViewInit {

  router = inject(Router)

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
      const gAccounts: accounts = google.accounts;
      setTimeout(() => {
        gAccounts.id.initialize({
          client_id: environment.google_client_id,
          callback: ({ credential }) => {
            this.ngZone.run(() => {
              this.handleGoogleSignIn(credential);
            });
          },
        });
    
        // Render tombol Google di element dengan id "button-google"
        gAccounts.id.renderButton(document.getElementById('button-google') as HTMLElement, {
          size: 'large',
          width: 320,
        });
  
        // Tampilkan prompt Google
        gAccounts.id.prompt();
      }, 1000); // Delay untuk memastikan tombol sudah tersedia
    }
  }

  onGoogleSignIn(): void {
    $("#popup-navbar-layer").fadeIn(function(){
      $("#popup-login").slideToggle();
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
    $("#popup-navbar-layer").fadeToggle(function(){
      $("#popup-navbar").slideToggle();
      // $("#popup-login").slideToggle();
    })
  }

  buttonLogout(){
    this.userService.deleteCookie(false)
    this.location.back()
  }

}
