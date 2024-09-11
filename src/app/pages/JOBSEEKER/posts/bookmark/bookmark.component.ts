import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { PostNavbarComponent } from '../../../../components/post-navbar/post-navbar.component';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [NavbarComponent, RouterLink, PostNavbarComponent, CommonModule],
  templateUrl: './bookmark.component.html'
})
export class BookmarkComponent implements OnInit {
  userService = inject(UserService)

  POSTS_DATA:any
  DONE_LOADING = false
  IS_LOGIN = false

  ngOnInit(): void {
    this.POSTS_DATA = []
    this.IS_LOGIN = this.userService.checkAuth()
    this.DONE_LOADING = true
  }
}
