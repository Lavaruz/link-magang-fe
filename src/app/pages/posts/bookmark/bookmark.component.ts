import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { PostNavbarComponent } from '../../../components/post-navbar/post-navbar.component';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [NavbarComponent, RouterLink, PostNavbarComponent],
  templateUrl: './bookmark.component.html'
})
export class BookmarkComponent {

}
