import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { UserInterface } from '../../../interface/user.interface';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import $ from "jquery"
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-talent-hunt',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './talent-hunt.component.html',
})
export class TalentHuntComponent implements OnInit {

  userService = inject(UserService)
  aRoute = inject(ActivatedRoute)
  router = inject(Router)


  USER_DATA!:UserInterface
  ACTIVE_USER_COUNT!:any
  ACTIVE_USER!:UserInterface[]
  INSTITUTIONS:any

  POST_LIMIT = 10
  POST_PAGE = 1

  IS_LOGIN = false
  DONE_LOADING = false

  QUERY:any
  FORM_SEARCH:FormGroup = new FormGroup("")

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(params => {
      this.FORM_SEARCH = new FormGroup({
        search_person: new FormControl(params["search_person"]),
        search_eduexp: new FormControl(params["search_eduexp"]),
      })

      this.QUERY = {
        limit: this.POST_LIMIT,
        page: this.POST_PAGE,
        search_person: params["search_person"] || "",
        search_eduexp: params["search_eduexp"] || "",
      }
  
      this.userService.getAllUserActiveData(this.QUERY).then(userActive => {
        this.ACTIVE_USER_COUNT = userActive.datas.length
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
    })
  }

  submitFormSearch(){
    if(this.FORM_SEARCH.invalid) return

    this.QUERY.search_person = this.FORM_SEARCH.value.search_person
    this.QUERY.search_eduexp = this.FORM_SEARCH.value.search_eduexp
    this.QUERY.page = 1

    this.router.navigate(
      [],{
        queryParams: { search_person: this.QUERY.search_person, search_eduexp: this.QUERY.search_eduexp },
        queryParamsHandling: "merge"
      }
    )

    this.userService.getAllUserActiveData(this.QUERY).then(userActive => {
      this.ACTIVE_USER_COUNT = userActive.datas.length
      this.ACTIVE_USER = userActive.datas
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

  changeGender(changedInput:any){
    const CHECKED:any = []
    $(changedInput).find("input:checked").each(function(){
      CHECKED.push($(this).prop("name"))
    })

    this.QUERY.gender = CHECKED.join(";")

    this.router.navigate([], {
      queryParams: {
        gender: CHECKED.join(";"),
      },
      queryParamsHandling: 'merge'
    })
    // this.callGetPost()
  }
  changeJobPref(changedInput:any){
    const CHECKED:any = []
    $(changedInput).find("input:checked").each(function(){
      CHECKED.push($(this).prop("name"))
    })

    this.QUERY.work_pref = CHECKED.join(";")

    this.router.navigate([], {
      queryParams: {
        work_pref: CHECKED.join(";"),
      },
      queryParamsHandling: 'merge'
    })
    // this.callGetPost()
  }
  changeInstitute(changedInput:any){
    const CHECKED:any = []
    $(changedInput).find("input:checked").each(function(){
      CHECKED.push($(this).prop("name"))
    })

    this.QUERY.institute = CHECKED.join(";")

    this.router.navigate([], {
      queryParams: {
        institute: CHECKED.join(";"),
      },
      queryParamsHandling: 'merge'
    })
    // this.callGetPost()
  }
  changeEduLevel(changedInput:any){
    const CHECKED:any = []
    $(changedInput).find("input:checked").each(function(){
      CHECKED.push($(this).prop("name"))
    })

    this.QUERY.edu_type = CHECKED.join(";")

    this.router.navigate([], {
      queryParams: {
        edu_type: CHECKED.join(";"),
      },
      queryParamsHandling: 'merge'
    })
    // this.callGetPost()
  }
  changeGrade(changedInput:any){
    const CHECKED:any = []
    $(changedInput).find("input:checked").each(function(){
      CHECKED.push($(this).prop("name"))
    })

    this.QUERY.gpa = CHECKED.join(";")

    this.router.navigate([], {
      queryParams: {
        gpa: CHECKED.join(";"),
      },
      queryParamsHandling: 'merge'
    })
    // this.callGetPost()
  }
}
