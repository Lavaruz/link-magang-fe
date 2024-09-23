import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { UserInterface } from '../../../interface/user.interface';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import $ from "jquery"
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsServiceService } from '../../../services/google-analytics.service.service';

@Component({
  selector: 'app-talent-hunt',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './talent-hunt.component.html',
  styles: `
    .card-user:hover .basic-current-position, .card-user:hover .basic-fullname{
      white-space: normal;
      overflow: visible;
      text-overflow: unset;
    }
  `
})
export class TalentHuntComponent implements OnInit {

  userService = inject(UserService)
  utilService = inject(UtilsService)
  titleService = inject(Title)
  aRoute = inject(ActivatedRoute)
  router = inject(Router)
  googleAnalytics = inject(GoogleAnalyticsServiceService)


  USER_DATA!:UserInterface
  ACTIVE_USER_COUNT:any = 0
  ACTIVE_USER!:UserInterface[]
  ACTIVE_USER_DETAIL!:UserInterface
  TOTAL_ENTRIES = 0
  INSTITUTIONS:any
  isExpandedEdu: boolean[] = [];
  isExpandedExp: boolean[] = [];

  SHOW_MORE_BUTTON = true
  IS_BUTTON_LOADING = false
  POST_LIMIT = 10
  POST_PAGE = 1

  IS_LOGIN = false
  DONE_LOADING = false
  DONE_LOADING_DETAIL = false

  QUERY:any
  PARAMS:any
  FORM_SEARCH:FormGroup = new FormGroup("")

  ngOnInit(): void {
    this.titleService.setTitle("Internshit - Lihat Talent² Berkualitas");
    this.aRoute.queryParams.subscribe(params => {
      this.DONE_LOADING = false
      this.PARAMS = params
      this.FORM_SEARCH = new FormGroup({
        search_person: new FormControl(params["search_person"]),
      })

      this.QUERY = {
        limit: this.POST_LIMIT,
        page: this.POST_PAGE,
        search_person: params["search_person"] || "",
        gender: params["gender"] || "",
        work_pref: params["work_pref"] || "",
        institute: params["institute"] || "",
        edu_type: params["edu_type"] || "",
        gpa: params["gpa"] || "",
      }

      this.callGetTalent()
    })

    this.userService.GetAllSpesificData("educations").then(educationsData => {
      this.INSTITUTIONS = Array.from(new Set(educationsData.map((education:any) => {
        return education.edu_institution
      })))
      setTimeout(() => {
        this.checkSelectedCheckboxes(this.PARAMS["gender"])
        this.checkSelectedCheckboxes(this.PARAMS["work_pref"] || "")
        this.checkSelectedCheckboxes(this.PARAMS["institute"] || "")
        this.checkSelectedCheckboxes(this.PARAMS["edu_type"] || "")
        this.checkSelectedCheckboxes(this.PARAMS["gpa"] || "")
      },500)
    })
  }

  toggleDescriptionEdu(idx: number) {
    this.isExpandedEdu[idx] = !this.isExpandedEdu[idx];
  }
  toggleDescriptionExp(idx: number) {
    this.isExpandedExp[idx] = !this.isExpandedExp[idx];
  }

  resetFilter(){
    this.QUERY.limit = 6
    this.QUERY.page = 1
    this.ACTIVE_USER = []
    // this.SHOW_MORE_BUTTON = this.POST_DATAS.length > 6 ? true : false
    $("input:checked").prop("checked", false)
    // this.callGetPost()
    this.router.navigate(["/talent"], {
      queryParams: {
        'search_person': null,
        'gender': null,
        'work_pref': null,
        'institute': null,
        'edu_type': null,
        'gpa': null
      },
      queryParamsHandling: 'merge'
    })
  }

  addPage(){
    this.IS_BUTTON_LOADING = true
    this.POST_PAGE++
    this.QUERY["page"] = this.POST_PAGE
    this.SHOW_MORE_BUTTON = this.POST_LIMIT * this.POST_PAGE < this.TOTAL_ENTRIES

    this.userService.getAllUserActiveData(this.QUERY).then(activeUser => {
      this.ACTIVE_USER.push(...activeUser.datas)
      this.IS_BUTTON_LOADING = false
    })
  }

  submitFormSearch(){
    if(this.FORM_SEARCH.invalid) return

    this.QUERY.search_person = this.FORM_SEARCH.value.search_person
    this.QUERY.page = 1

    this.router.navigate(
      [],{
        queryParams: { search_person: this.QUERY.search_person },
        queryParamsHandling: "merge"
      }
    )

    // this.userService.getAllUserActiveData(this.QUERY).then(userActive => {
    //   this.ACTIVE_USER_COUNT = userActive.datas.length
    //   this.ACTIVE_USER = userActive.datas
    // })
  }

  expandSidebar(evt: any){
    const $this = $(evt)
    $this.find("i").toggleClass("uil-angle-left uil-angle-down")
    $this.next().slideToggle("fast").css("display", "flex")
  }

  getActiveSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(0, 5);
  }

  getRemainingSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(5);
  }

  callGetTalent(){

    this.userService.getAllUserActiveData(this.QUERY).then(userActive => {
      this.ACTIVE_USER_COUNT = userActive.datas.length
      this.ACTIVE_USER = userActive.datas
      this.TOTAL_ENTRIES = userActive.total_entries
      this.SHOW_MORE_BUTTON = this.POST_LIMIT * this.POST_PAGE < this.TOTAL_ENTRIES
      
      this.IS_LOGIN = this.userService.checkAuth()
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
  }






  checkSelectedCheckboxes(params:any) {
    const optionArray = params.split(';');
    optionArray.forEach((option:any) => {
      const checkbox = document.querySelector(`input[name="${option}"]`) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
      }
    });
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
  }



  openUserCard(id:any){
    this.DONE_LOADING_DETAIL = false
    
    $("#popup-home").fadeIn(() => {
      $("#popup-user").slideToggle()
      $("body").css("overflow", "hidden")
      this.userService.getUserById(id).then(userData => {
        console.log(userData);
        
        this.isExpandedEdu = userData.educations.map(() => false);
        this.isExpandedExp = userData.educations.map(() => false);
        this.ACTIVE_USER_DETAIL = userData
        this.DONE_LOADING_DETAIL = true
      })
    }).css("display", "flex")
  }
  closePopupDetail(){
    $("#popup-user").slideToggle(function(){
      $("#popup-home").fadeOut(function(){})
      $("body").css("overflow", "auto")
    })
  }
  openFilterMobile(){
    $("#popup-home").fadeIn(() => {
      $("#popup-filter").slideToggle()
      $("body").css("overflow", "hidden")
    }).css("display", "flex")
  }
  hideAllPopup(evt:any, e:any){
    const $this = $(evt)

    if(e.target.id == "popup-home"){
      $this.children().each(function(){
        if($(this).is(":visible")){
          $(this).slideToggle(function(){
            $this.fadeOut(function(){})
            $("body").css("overflow", "auto")
          }) 
        }
      })
    }
  }
  openLoginPanel(){
    $("#popup-layer-navbar").fadeIn(function() {
      $("#popup-login").slideToggle();
      $("body").css("overflow", "hidden");
    }).css("display", "flex");
  }

  closeLoginPanel(){
    $("#popup-login").slideToggle(function() {
      $("#popup-layer-navbar").fadeOut(function() {
          $("body").css("overflow", "auto");
      });
    });
  }
}
