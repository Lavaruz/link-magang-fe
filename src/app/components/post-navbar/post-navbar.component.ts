import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-post-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './post-navbar.component.html'
})
export class PostNavbarComponent {

}
