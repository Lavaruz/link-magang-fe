import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import $ from "jquery"
import { RequestService } from '../../services/request.service';
import { UserService } from '../../services/user.service';
import { CommonModule, Location, NgIf } from '@angular/common';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, GoogleSigninButtonModule, ReactiveFormsModule, CommonModule, RouterLink, NavbarComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  dashboard_img = "assets/images/noise-light.png"

  FORM_SEARCH:FormGroup = new FormGroup("")
  IS_VERIFIED:boolean = false

  POST_DATAS:any
  POST_DATAS_DETAIL:any
  POST_LIMIT:number = 3
  POST_PAGE:number = 1
  POST_COUNT:number = 0
  SHOW_PAGINATION = true

  DONE_LOADING = false
  DONE_LOADING_DETAIL = false

  QUERY:any

  // INJECTABLE SERVICE
  postService = inject(PostsService)
  requestService = inject(RequestService)

  constructor(private aRoute: ActivatedRoute, private router: Router, private userService: UserService, private location: Location){
    aRoute.queryParams.subscribe(params => {
      this.SHOW_PAGINATION = true
      this.POST_PAGE = parseFloat(params["page"]) || 1
      this.DONE_LOADING = false
      this.QUERY = {
        limit: this.POST_LIMIT,
        page: this.POST_PAGE,
        search: params["search"] || "",
        platform: ""
      }
      this.callGetProduct()
    })

    this.FORM_SEARCH = new FormGroup({
      search: new FormControl(""),
    })
  }

  async ngOnInit() {
    this.IS_VERIFIED = await this.userService.verifyToken()
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
    this.callGetProduct()
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
    this.callGetProduct()
  }
  callGetProduct(){
    this.postService.GetAllPosts(this.QUERY).then(postData => {
      this.POST_DATAS = postData.datas
      this.POST_LIMIT = postData.limit
      this.POST_PAGE = postData.page  

      this.postService.GetCountAllPosts().then(postCount => {
        this.POST_COUNT = postCount

        setTimeout(() => {
          this.DONE_LOADING = true
        }, 1000)
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

    this.callGetProduct()
    this.SHOW_PAGINATION = false
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
