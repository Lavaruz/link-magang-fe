import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostNavbarComponent } from '../../../components/post-navbar/post-navbar.component';
import { PostsService } from '../../../services/posts.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import $ from "jquery"
import { UserService } from '../../../services/user.service';

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

  SHOW_PAGINATION = true
  POST_PAGE = 1
  POST_LIMIT = 6
  POST_DATAS:any
  POST_DATAS_DETAIL:any
  POST_COUNT = 0

  LOCATION_DATAS:any
  SKILL_DATAS:any

  DONE_LOADING = false
  DONE_LOADING_DETAIL = false
  QUERY:any

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(params => {
      this.SHOW_PAGINATION = true
      this.POST_PAGE = parseFloat(params["page"]) || 1
      this.DONE_LOADING = false
      this.QUERY = {
        limit: this.POST_LIMIT,
        page: this.POST_PAGE,
        search: params["search"] || "",
        platform: ""
      }


      this.userService.GetAllLocations().then(locationData => {
        this.LOCATION_DATAS = locationData
        this.userService.GetAllSkills().then(skillsData => {
          this.SKILL_DATAS = skillsData
          this.callGetPost()
          setTimeout(() => {
            this.DONE_LOADING = true
          }, 1000)
        })
      })

      this.FORM_SEARCH = new FormGroup({
        search: new FormControl(""),
      })
    })
    
  }


  callGetPost(){
    this.postService.GetAllPosts(this.QUERY).then(postData => {
      this.POST_DATAS = postData.datas
      this.POST_LIMIT = postData.limit
      this.POST_PAGE = postData.page  

      this.postService.GetCountAllPosts().then(postCount => {
        this.POST_COUNT = postCount
      })
      
    })

  }

  submitFormSearch(){
    if(this.FORM_SEARCH.invalid) return

    this.QUERY.search = this.FORM_SEARCH.value.search
    if(this.QUERY.search.length !== 0){
      this.QUERY.limit = 999
      this.QUERY.page = 1
    }else{
      this.QUERY.limit = 9
    }

    this.router.navigate(
      [],{
        queryParams: { search: this.QUERY.search },
        queryParamsHandling: "merge"
      }
    )

    this.callGetPost()
    this.SHOW_PAGINATION = false
  }


  addPage(){
    this.POST_PAGE++
    this.QUERY["page"] = this.POST_PAGE
    this.router.navigate(
      [],{
        queryParams: { page: this.POST_PAGE },
        queryParamsHandling: "merge"
      }
    )
    this.callGetPost()
    window.scrollTo(0,0)
  }
  subPage(){
    this.POST_PAGE--
    this.QUERY["page"] = this.POST_PAGE
    this.router.navigate(
      [],{
        queryParams: { page: this.POST_PAGE },
        queryParamsHandling: "merge"
      }
    )
    this.callGetPost()
    window.scrollTo(0,0)
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
        setTimeout(() => {
          this.DONE_LOADING_DETAIL = true
        }, 1000)
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
      default:
          return '<img class="w-5 h-5 rounded-lg" src="assets/img/Default.png" alt="Default">';
    }
  }

}
