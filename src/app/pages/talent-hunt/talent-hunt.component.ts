import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserInterface } from '../../interface/user.interface';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import $ from "jquery"

@Component({
  selector: 'app-talent-hunt',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './talent-hunt.component.html',
})
export class TalentHuntComponent implements OnInit {

  userService = inject(UserService)
  ACTIVE_USER_COUNT!:any
  ACTIVE_USER!:UserInterface[]
  DONE_LOADING = false

  ngOnInit(): void {
    this.userService.getAllUserActiveData().then(userActive => {
      console.log(userActive);
      
      this.ACTIVE_USER_COUNT = userActive.total_post
      this.ACTIVE_USER = userActive.datas
      this.DONE_LOADING = true
    })
  }

  expandSidebar(evt: any){
    const $this = $(evt)
    $this.find("i").toggleClass("uil-angle-left uil-angle-down")
    $this.next().slideToggle("fast").css("display", "flex")
  }

  getActiveSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(0, 4);
  }

  getRemainingSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(4);
  }
}
