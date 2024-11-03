import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../../../services/posts.service';
import { UtilsService } from '../../../../services/utils.service';
import { UserService } from '../../../../services/user.service';
import { Meta } from '@angular/platform-browser';
import $ from "jquery"
import { GoogleAnalyticsServiceService } from '../../../../services/google-analytics.service.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  googleAnalytics = inject(GoogleAnalyticsServiceService)
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
      this.meta.updateTag({ property: 'og:title', content: `Lowongan ${postData.title} di Gatera` })
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
      const toastId = `toast-${Date.now()}`;  // ID unik untuk setiap toastr

      // Cek apakah container toastr sudah ada, jika belum buat container
      if (!$('#toast-container-share').length) {
          $(document.body).append(`
              <div id="toast-container-share" class="fixed flex flex-col-reverse gap-3 bottom-5 left-5 space-y-3 z-[999]"></div>
          `);
      }

      // Tambahkan toastr baru ke container
      $('#toast-container-share').prepend(`
          <div id="${toastId}" class="toast bg-main flex items-center w-full p-4 space-x-4 text-white font-medium divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow" role="alert">
              <div class="text-sm flex items-center gap-2"><i class="uil uil-check text-xl"></i> URL lowongan berhasil disalin.</div>
          </div>
      `);

      // Fade in toastr, lalu fade out setelah 1 detik
      $(`#${toastId}`).hide().fadeIn(300).delay(1500).fadeOut(500, function() {
          $(this).remove();  // Hapus toastr setelah fade out selesai
      });
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
