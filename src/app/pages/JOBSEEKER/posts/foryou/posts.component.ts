import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { PostNavbarComponent } from '../../../../components/post-navbar/post-navbar.component';
import { UserService } from '../../../../services/user.service';
import { PostsService } from '../../../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NavbarComponent, RouterLink, PostNavbarComponent, CommonModule],
  templateUrl: './posts.component.html',
})
export class PostsForYouComponent implements OnInit {

  userService = inject(UserService)
  postService = inject(PostsService)

  IS_LOGIN = false

  POSTS_DATA:any = []
  POST_DATAS_DETAIL:any
  DONE_LOADING_DETAIL = false
  DONE_LOADING = false

  ngOnInit(): void {
    this.IS_LOGIN = this.userService.checkAuth()
    console.log(this.IS_LOGIN);
    
    if(this.IS_LOGIN){
      this.postService.GetAllMatchPosts({}).then(postsData => {
        this.POSTS_DATA = postsData.datas
        this.DONE_LOADING = true
      })
    }else{
      this.DONE_LOADING = true
    }
  }

  savePost(){
    alert("SAVED")
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
