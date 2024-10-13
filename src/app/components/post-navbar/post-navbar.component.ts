import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './post-navbar.component.html'
})
export class PostNavbarComponent implements OnInit {
  @Input() savedDataCount:any = 0
  userService = inject(UserService)

  ngOnInit(): void {
  }
}
