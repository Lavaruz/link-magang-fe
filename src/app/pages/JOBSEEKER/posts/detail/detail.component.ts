import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../../../services/posts.service';
import { UtilsService } from '../../../../services/utils.service';
import { UserService } from '../../../../services/user.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  postService = inject(PostsService)
  utilService = inject(UtilsService)
  userService = inject(UserService)
  meta = inject(Meta)

  ID:any = ""
  IS_LOGIN = false
  USER_DATA:any = {}

  POST_DATA:any = {}
  PROMOTED_DATA:any = []
  DONE_LOADING = false
  QUERY:any


  ngOnInit(): void {
    this.IS_LOGIN = this.userService.checkAuth()
    this.ID = window.location.href.split("/posts/").pop()
    this.QUERY = {
      limit: 2,
      page: 1,
      search: "",
      platform: "",
      type: "",
      locations: "",
      skills: "",
    }
    this.postService.GetPostById(this.ID).then(postData => {
      this.POST_DATA = postData
      this.meta.updateTag({ property: 'og:title', content: `Lowongan ${postData.title} di Internshit` })
      this.postService.GetAllPosts(this.QUERY).then(postData => {
        this.PROMOTED_DATA = postData.datas
        if(this.IS_LOGIN){
          this.userService.getUserData().then(userData => {
            this.USER_DATA = userData
            this.DONE_LOADING = true
          })
        }else{
          this.DONE_LOADING = true
        }
      })
    })
    
  }

  copyToClipboard(id:any) {
    navigator.clipboard.writeText(`${window.location.host}/posts/${id}`).then(() => {
      alert('URL berhasil disalin ke clipboard!');
    }).catch(err => {
      console.error('Gagal menyalin URL: ', err);
    });
  }

  getActiveSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(0, 4);
  }

  getRemainingSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(4);
  }

  savePost(evt:Event){
    alert("Dalam development, ditunggu ya")
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

  hasMatchingSkills(userSkills: any[] = [], postSkills: any[] = []): boolean {
    const userSkillSet = new Set(userSkills.map(skill => skill.skill));
    return postSkills.some(skill => userSkillSet.has(skill.skill));
  }
}
