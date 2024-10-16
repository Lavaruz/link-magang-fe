import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-profile-completion',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './completion.component.html',
})
export class ProfileCompletionComponent implements OnInit {
  userService = inject(UserService)
  SKILL_DATAS:any = []
  DONE_LOADING = false

  ngOnInit() {
    this.userService.GetAllSkills().then(skillsData => {
      this.SKILL_DATAS = skillsData
      this.DONE_LOADING = true
    })
  }
}
