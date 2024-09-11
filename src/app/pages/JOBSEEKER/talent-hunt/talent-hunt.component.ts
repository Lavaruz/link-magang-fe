import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { UserInterface } from '../../../interface/user.interface';
import { UserService } from '../../../services/user.service';
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

  USER_DATA!:UserInterface
  ACTIVE_USER_COUNT!:any
  ACTIVE_USER!:UserInterface[]
  INSTITUTIONS:any

  IS_LOGIN = false
  DONE_LOADING = false

  ngOnInit(): void {
    this.userService.getAllUserActiveData().then(userActive => {
      this.ACTIVE_USER_COUNT = userActive.total_post
      this.ACTIVE_USER = userActive.datas
      this.IS_LOGIN = this.userService.checkAuth()

        this.userService.GetAllSpesificData("educations").then(educationsData => {
          this.INSTITUTIONS = Array.from(new Set(educationsData.map((education:any) => {
            return education.edu_institution
          })))

          if(this.IS_LOGIN){
            this.userService.getUserData().then(userData => {
              this.ACTIVE_USER = this.ACTIVE_USER.filter(userEachActive => {
                return userEachActive.id !== userData.id
              })
              this.USER_DATA = userData
              this.DONE_LOADING = true
            })
          }
          this.DONE_LOADING = true
        })
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
