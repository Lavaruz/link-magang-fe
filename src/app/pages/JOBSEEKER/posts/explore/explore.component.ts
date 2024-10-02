import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostNavbarComponent } from '../../../../components/post-navbar/post-navbar.component';
import { PostsService } from '../../../../services/posts.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import $ from "jquery"
import { UserService } from '../../../../services/user.service';
import { Title } from '@angular/platform-browser';

declare var google: any;

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [NgOptimizedImage, NavbarComponent, RouterLink, PostNavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './explore.component.html'
})
export class ExploreComponent implements OnInit {
  postService = inject(PostsService)
  userService = inject(UserService)
  aRoute = inject(ActivatedRoute)
  router = inject(Router)
  titleService = inject(Title)

  FORM_SEARCH:FormGroup = new FormGroup("")

  SHOW_MORE_BUTTON = false
  SHOW_LOGIN_BUTTON = false

  POST_PAGE = 1
  POST_LIMIT = 4
  POST_DATAS:any = []
  POST_DATAS_DETAIL:any
  POST_COUNT = 0

  IS_LOGIN = false
  LOGIN_COUNT = 0

  LOCATION_DATAS:any
  SKILL_DATAS:any

  IS_BUTTON_LOADING = false

  DONE_LOADING = false
  DONE_LOADING_DETAIL = false
  DONE_LOADING_SIDEBAR = false
  QUERY:any

  ngOnInit(): void {
    this.titleService.setTitle("Internshit - Jelajahi Lowongan Magang");
    this.IS_LOGIN = this.userService.checkAuth()

    this.aRoute.queryParams.subscribe(params => {
      this.LOGIN_COUNT = 0
      this.SHOW_LOGIN_BUTTON = false
      this.DONE_LOADING = false
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
          this.DONE_LOADING_SIDEBAR = true
          
          setTimeout(() => {
            this.checkSelectedCheckboxes(params["type"] || "")
            this.checkSelectedCheckboxes(params["locations"] || "")
            this.checkSelectedCheckboxes(params["skills"] || "")
          },500)
          
        })
      })

      this.FORM_SEARCH = new FormGroup({
        search: new FormControl(params["search"]),
      })
      this.callGetPost()
      
    })
  }

  savePost(evt:Event){
    alert("Dalam development, ditunggu ya")
  }

  callGetPost(){
    this.postService.GetAllPosts(this.QUERY).then(postData => {
      this.POST_DATAS = postData.datas
      this.POST_LIMIT = postData.limit
      this.POST_PAGE = postData.page     

      this.POST_COUNT = postData.total_entries
      this.SHOW_MORE_BUTTON = this.POST_LIMIT * this.POST_PAGE < this.POST_COUNT ? true : false
      this.DONE_LOADING = true
    })
  }

  resetFilter(){
    this.QUERY.page = 1
    this.POST_DATAS = []
    this.SHOW_MORE_BUTTON = this.POST_DATAS.length > 6 ? true : false
    $("input:checked").prop("checked", false)
    // this.callGetPost()
    this.router.navigate(["/posts/explore"], {
      queryParams: {
        'search': "",
        'locations': "",
        'skills': "",
        'type': "",
        'page': ""
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

    if(this.IS_LOGIN == false){
      this.LOGIN_COUNT++
      if(this.LOGIN_COUNT >= 2){
        this.IS_BUTTON_LOADING = false
        this.SHOW_MORE_BUTTON = false
        this.SHOW_LOGIN_BUTTON = true
        return
      }
    }

    this.QUERY["page"] = this.POST_PAGE
    this.SHOW_MORE_BUTTON = this.POST_LIMIT * this.POST_PAGE < this.POST_COUNT ? true : false

    this.postService.GetAllPosts(this.QUERY).then(postData => {
      this.POST_DATAS.push(...postData.datas)
      this.IS_BUTTON_LOADING = false
    })
  }








  checkSelectedCheckboxes(jobtype:string) {
    const optionArray = jobtype.split(';');
    optionArray.forEach((option:any) => {
      const checkbox = document.querySelector(`input[name="${option}"]`) as HTMLInputElement;
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
  }


  expandSidebar(evt: any){
    const $this = $(evt)
    $this.find("i").toggleClass("uil-angle-left uil-angle-down")
    $this.next().slideToggle("fast").css("display", "flex")
  }

  hideAllPopup(evt:any, e:any){
    const $this = $(evt)

    if(e.target.id == "popup-home"){
      $this.children().each(function(){
        if($(this).is(":visible")){
          $this.fadeOut("fast")
          $(this).slideToggle("fast") 
          $("body").css("overflow", "auto")
        }
      })
    }
  }

  openFilterMobile(){
    $("#popup-home").fadeIn("fast").css("display", "flex")
    $("#popup-filter").slideToggle("fast")
    $("body").css("overflow", "hidden")
  }

  openPostDetail(id:any){
    this.DONE_LOADING_DETAIL = false
    $("#popup-home").fadeIn("fast").css("display", "flex")
    $("#popup-detail-job").slideToggle("fast")
    $("body").css("overflow", "hidden")
    this.postService.GetPostById(id).then(postData => {
      this.POST_DATAS_DETAIL = postData
      this.DONE_LOADING_DETAIL = true
    })
  }

  closePopupDetail(){
    $("#popup-home").fadeOut("fast")
    $("#popup-detail-job").slideToggle("fast")
    $("body").css("overflow", "auto")
  }

  getActiveSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(0, 4);
  }

  getRemainingSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(4);
  }

  timeAgo(dateString: any) {
    const date: any = new Date(dateString);
    const now: any = new Date();
  
    // Menghilangkan perbedaan waktu agar hanya tanggal yang dibandingkan
    date.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
  
    const diffInMilliseconds = now - date;
  
    // Konversi milidetik ke hari yang benar
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
    if (diffInDays < 7) {
      return `minggu ini`;
    } else if (diffInDays < 14) {
      return `minggu lalu`;
    } else {
      return `beberapa minggu lalu`;
    }
  }  

  timeAgoNumber(dateString: any) {
    const date: any = new Date(dateString);
    const now: any = new Date();
  
    // Menghilangkan perbedaan waktu agar hanya tanggal yang dibandingkan
    date.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
  
    const diffInMilliseconds = now - date;
  
    // Konversi milidetik ke hari yang benar
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
    return diffInDays
  }

  getPlatformImageUrl(platform: any): string {
    switch (platform) {
      case 'Glints':
        return 'assets/img/Glints.webp';
      case 'Linkedin':
        return 'assets/img/Linkedin.webp';
      case 'Kalibrr':
        return 'assets/img/Kalibrr.webp';
      case 'Jobstreet':
        return 'assets/img/Jobstreet.webp';
      case 'Indeed':
        return 'assets/img/Indeed.webp';
      case 'Dealls':
        return 'assets/img/Dealls.webp';
      case 'Kitalulus':
        return 'assets/img/Kitalulus.webp';
      default:
        return 'assets/img/Other.webp';
    }
  }  

  openLoginPanel(){
    $("#popup-layer-navbar").fadeIn(function() {
      $("#popup-login").slideToggle("fast");
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
