import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit {
  userService = inject(UserService)
  router = inject(Router)
  titleService = inject(Title)

  ngOnInit(): void {
    this.titleService.setTitle("Internshit - Admin");
    if(this.userService.checkAuth("adminAuthenticate") == false){
      this.router.navigate(["/admin/login"])
    }
  }
}
