import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { PostNavbarComponent } from '../../../../components/post-navbar/post-navbar.component';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsServiceService } from '../../../../services/google-analytics.service.service';
import $ from "jquery"

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [NavbarComponent, RouterLink, PostNavbarComponent, CommonModule],
  templateUrl: './bookmark.component.html'
})
export class BookmarkComponent implements OnInit {
  userService = inject(UserService)
  titleService = inject(Title)
  googleAnalytics = inject(GoogleAnalyticsServiceService)

  POSTS_DATA:any
  DONE_LOADING = false
  IS_LOGIN = false

  ngOnInit(): void {
    this.titleService.setTitle("Internshit - Lowongan Tersimpan");
    this.POSTS_DATA = []
    this.IS_LOGIN = this.userService.checkAuth()
    this.DONE_LOADING = true
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
}
