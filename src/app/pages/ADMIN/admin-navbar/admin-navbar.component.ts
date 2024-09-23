import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-navbar.component.html',
})
export class AdminNavbarComponent {
  userService = inject(UserService)
  router = inject(Router)

  buttonLogout(): void {
    this.userService.deleteCookie(false)
    this.router.navigate(["/"])
  }
}
