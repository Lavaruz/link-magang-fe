import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostNavbarComponent } from '../../../../components/post-navbar/post-navbar.component';
import { UserService } from '../../../../services/user.service';
import { PostsService } from '../../../../services/posts.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NavbarComponent, RouterLink, PostNavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './posts.component.html',
})
export class PostsForYouComponent implements OnInit {

  userService = inject(UserService)
  postService = inject(PostsService)
  aRoute = inject(ActivatedRoute)
  router = inject(Router)

  FORM_SEARCH:FormGroup = new FormGroup("")

  IS_LOGIN = false

  SHOW_MORE_BUTTON = false
  POST_PAGE = 1
  POST_LIMIT = 6
  POST_COUNT = 0

  POSTS_DATA:any = []
  POST_DATAS_DETAIL:any
  DONE_LOADING_DETAIL = false
  DONE_LOADING = false
  IS_BUTTON_LOADING = false
  QUERY:any

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(params => {
      this.DONE_LOADING = false
      this.FORM_SEARCH = new FormGroup({
        search: new FormControl(params["search"]),
      })
      this.POST_PAGE = parseFloat(params["page"]) || 1
      this.QUERY = {
        limit: this.POST_LIMIT,
        page: this.POST_PAGE,
        search: params["search"] || "",
      }

      this.IS_LOGIN = this.userService.checkAuth()
      
      if(this.IS_LOGIN){
        this.postService.GetAllMatchPosts(this.QUERY).then(postsData => {
          this.POSTS_DATA = postsData.datas
          this.POST_PAGE = postsData.page
          this.POST_COUNT = postsData.total_entries

          this.SHOW_MORE_BUTTON = this.POST_PAGE * this.POST_LIMIT < this.POST_COUNT    
          this.DONE_LOADING = true
        })
      }else{
        this.DONE_LOADING = true
      }
    })
  }

  savePost(){
    alert("SAVED")
  }

  addPage(){
    this.IS_BUTTON_LOADING = true
    this.POST_PAGE++
    this.QUERY["page"] = this.POST_PAGE

    this.postService.GetAllMatchPosts(this.QUERY).then(postData => {
      this.POSTS_DATA.push(...postData.datas)
      
      this.SHOW_MORE_BUTTON = this.POST_PAGE * this.POST_LIMIT < this.POST_COUNT
      this.IS_BUTTON_LOADING = false
    })
  }





  submitFormSearch(){
    this.DONE_LOADING = false
    if(this.FORM_SEARCH.invalid) return

    this.QUERY.search = this.FORM_SEARCH.value.search
    this.QUERY.page = 1

    this.router.navigate(
      [],{
        queryParams: { search: this.QUERY.search },
        queryParamsHandling: "merge"
      }
    )

    this.postService.GetAllMatchPosts(this.QUERY).then(postData => {
      this.POSTS_DATA = postData.datas
      this.DONE_LOADING = true
      this.SHOW_MORE_BUTTON = postData.datas.length >= this.POST_LIMIT 
    })
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
          return '<img class="w-4 h-4 lg:w-5 lg:h-5 rounded-lg" src="assets/img/Glints.png" alt="Glints">';
      case 'Linkedin':
          return '<img class="w-4 h-4 lg:w-5 lg:h-5 rounded-lg" src="assets/img/Linkedin.png" alt="LinkedIn">';
      case 'Kalibrr':
          return '<img class="w-4 h-4 lg:w-5 lg:h-5 rounded-lg" src="assets/img/Kalibrr.png" alt="Kalibrr">';
      case 'Jobstreet':
          return '<img class="w-4 h-4 lg:w-5 lg:h-5 rounded-lg" src="assets/img/Jobstreet.png" alt="JobStreet">';
      case 'Indeed':
          return '<img class="w-4 h-4 lg:w-5 lg:h-5 rounded-lg" src="assets/img/Indeed.png" alt="Indeed">';
      case 'Dealls':
          return '<img class="w-4 h-4 lg:w-5 lg:h-5 rounded-lg" src="assets/img/Dealls.png" alt="Dealls">';
      case 'Kitalulus':
          return '<img class="w-4 h-4 lg:w-5 lg:h-5 rounded-lg" src="assets/img/Kitalulus.png" alt="Kitalulus">';
      default:
          return '<img class="w-4 h-4 lg:w-5 lg:h-5 rounded-lg" src="assets/img/Other.png" alt="Default">';
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
