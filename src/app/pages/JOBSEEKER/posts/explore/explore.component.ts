import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostNavbarComponent } from '../../../../components/post-navbar/post-navbar.component';
import { PostsService } from '../../../../services/posts.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import $ from "jquery"
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [NavbarComponent, RouterLink, PostNavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './explore.component.html'
})
export class ExploreComponent implements OnInit {
  postService = inject(PostsService)
  userService = inject(UserService)
  aRoute = inject(ActivatedRoute)
  router = inject(Router)

  FORM_SEARCH:FormGroup = new FormGroup("")

  SHOW_MORE_BUTTON = false
  POST_PAGE = 1
  POST_LIMIT = 6
  POST_DATAS:any = []
  POST_DATAS_DETAIL:any
  POST_COUNT = 0

  LOCATION_DATAS:any
  SKILL_DATAS:any

  IS_BUTTON_LOADING = false

  DONE_LOADING = false
  DONE_LOADING_DETAIL = false
  DONE_LOADING_SIDEBAR = false
  QUERY:any

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(params => {
      this.POST_PAGE = parseFloat(params["page"]) || 1
      this.QUERY = {
        limit: this.POST_LIMIT,
        page: this.POST_PAGE,
        search: params["search"] || "",
        platform: "",
        type: params["type"] || "",
        locations: params["locations"] || "",
        skills: params["skills"] || "",
      }

      
      
      this.userService.GetAllLocations().then(locationData => {
        this.LOCATION_DATAS = locationData
        this.userService.GetAllSkills().then(skillsData => {
          this.SKILL_DATAS = skillsData
          
          setTimeout(() => {
            this.checkSelectedCheckboxes(params["type"])
            this.checkSelectedCheckboxes(params["locations"] || "")
            this.checkSelectedCheckboxes(params["skills"] || "")
          },500)
          this.DONE_LOADING_SIDEBAR = true
          
        })
      })

      this.FORM_SEARCH = new FormGroup({
        search: new FormControl(params["search"]),
      })
    })
    
    this.callGetPost()
    
  }

  savePost(){
    alert("SAVED")
  }


  callGetPost(){
    this.QUERY.limit = 6
    this.postService.GetAllPosts(this.QUERY).then(postData => {
      this.POST_DATAS = postData.datas
      this.POST_LIMIT = postData.limit
      this.POST_PAGE = postData.page  
      
      this.postService.GetCountAllPosts().then(postCount => {
        this.POST_COUNT = postCount
        this.SHOW_MORE_BUTTON = this.POST_DATAS.length >= this.POST_LIMIT ? true : false
        this.DONE_LOADING = true
      })
      
    })
  }

  resetFilter(){
    this.QUERY.limit = 6
    this.QUERY.page = 1
    this.POST_DATAS = []
    this.SHOW_MORE_BUTTON = this.POST_DATAS.length > 6 ? true : false
    $("input:checked").prop("checked", false)
    // this.callGetPost()
    this.router.navigate(["/posts/explore"], {
      queryParams: {
        'search': null,
        'locations': null,
        'skills': null,
        'type': null,
        'page': null
      },
      queryParamsHandling: 'merge'
    })
  }

  submitFormSearch(){
    if(this.FORM_SEARCH.invalid) return

    this.QUERY.search = this.FORM_SEARCH.value.search
    this.QUERY.page = 1

    this.router.navigate(
      [],{
        queryParams: { search: this.QUERY.search },
        queryParamsHandling: "merge"
      }
    )

    this.postService.GetAllPosts(this.QUERY).then(postData => {
      this.POST_DATAS = postData.datas
      this.POST_LIMIT = postData.limit
      this.POST_PAGE = postData.page  
      this.SHOW_MORE_BUTTON = false
    })
  }


  addPage(){
    this.IS_BUTTON_LOADING = true
    this.POST_PAGE++
    this.QUERY["page"] = this.POST_PAGE

    this.postService.GetAllPosts(this.QUERY).then(postData => {
      this.POST_DATAS.push(...postData.datas)
      this.IS_BUTTON_LOADING = false
    })
  }








  checkSelectedCheckboxes(jobtype:any) {
    const optionArray = jobtype.split(';');
    optionArray.forEach((option:any) => {
      const checkbox = document.querySelector(`input[name="${option}"]`) as HTMLInputElement;
      console.log(checkbox);
      
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }
  changeJobType(changedInput:any){
    const CHECKED:any = []
    $(changedInput).find("input:checked").each(function(){
      CHECKED.push($(this).prop("name"))
    })

    this.QUERY.type = CHECKED.join(";")

    this.router.navigate([], {
      queryParams: {
        type: CHECKED.join(";"),
      },
      queryParamsHandling: 'merge'
    })
    this.callGetPost()
  }
  changeLocation(changedInput:any){
    const CHECKED:any = []
    $(changedInput).find("input:checked").each(function(){
      CHECKED.push($(this).prop("name"))
    })

    this.QUERY.locations = CHECKED.join(";")

    this.router.navigate([], {
      queryParams: {
        locations: CHECKED.join(";"),
      },
      queryParamsHandling: 'merge'
    })
    this.callGetPost()
  }
  changeSkill(changedInput:any){
    const CHECKED:any = []
    $(changedInput).find("input:checked").each(function(){
      CHECKED.push($(this).prop("name"))
    })

    this.QUERY.skills = CHECKED.join(";")

    this.router.navigate([], {
      queryParams: {
        skills: CHECKED.join(";"),
      },
      queryParamsHandling: 'merge'
    })
    this.callGetPost()
  }


  expandSidebar(evt: any){
    const $this = $(evt)
    $this.find("i").toggleClass("uil-angle-left uil-angle-down")
    $this.next().slideToggle("fast").css("display", "flex")
  }

  openPostDetail(id:any){
    this.DONE_LOADING_DETAIL = false
    $("#popup-home").fadeIn(() => {
      $("#popup-detail-job").slideToggle()
      $("body").css("overflow", "hidden")
      this.postService.GetPostById(id).then(postData => {
        this.POST_DATAS_DETAIL = postData
        this.DONE_LOADING_DETAIL = true
      })
    }).css("display", "flex")
  }

  closePopupDetail(){
    $("#popup-detail-job").slideToggle(function(){
      $("#popup-home").fadeOut(function(){})
      $("body").css("overflow", "auto")
    })
  }

  getActiveSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(0, 4);
  }

  getRemainingSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(4);
  }

  timeAgo(dateString:any) {
    const date:any = new Date(dateString);
    const now:any = new Date();
    
    // Menghilangkan perbedaan waktu agar hanya tanggal yang dibandingkan
    date.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffInMilliseconds = now - date;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays < 7) {
        return `minggu ini`;
    } else if (diffInDays < 14) {
        return `minggu lalu`;
    } else {
        return `beberapa minggu lalu`;
    } 
  }

  getPlatformImage(platform:any){
    switch (platform) {
      case 'Glints':
          return '<img class="w-5 h-5 rounded-lg" src="assets/img/Glints.png" alt="Glints">';
      case 'Linkedin':
          return '<img class="w-5 h-5 rounded-lg" src="assets/img/Linkedin.png" alt="LinkedIn">';
      case 'Kalibrr':
          return '<img class="w-5 h-5 rounded-lg" src="assets/img/Kalibrr.png" alt="Kalibrr">';
      case 'Jobstreet':
          return '<img class="w-5 h-5 rounded-lg" src="assets/img/Jobstreet.png" alt="JobStreet">';
      case 'Indeed':
          return '<img class="w-5 h-5 rounded-lg" src="assets/img/Indeed.png" alt="Indeed">';
      case 'Dealls':
          return '<img class="w-5 h-5 rounded-lg" src="assets/img/Dealls.png" alt="Dealls">';
      case 'Kitalulus':
          return '<img class="w-5 h-5 rounded-lg" src="assets/img/Kitalulus.png" alt="Kitalulus">';
      default:
          return '<img class="w-5 h-5 rounded-lg" src="assets/img/Other.png" alt="Default">';
    }
  }

}
