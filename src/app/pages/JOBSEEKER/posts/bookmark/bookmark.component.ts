import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { PostNavbarComponent } from '../../../../components/post-navbar/post-navbar.component';
import { UserService } from '../../../../services/user.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import $ from "jquery"
import { PostsService } from '../../../../services/posts.service';
import { UtilsService } from '../../../../services/utils.service';
import { GoogleAnalyticsServiceService } from '../../../../services/google-analytics.service.service';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [NavbarComponent, RouterLink, PostNavbarComponent, CommonModule, NgOptimizedImage],
  templateUrl: './bookmark.component.html'
})
export class BookmarkComponent implements OnInit {
  userService = inject(UserService)
  titleService = inject(Title)
  postService = inject(PostsService)
  googleAnalytics = inject(GoogleAnalyticsServiceService)
  ultilService = inject(UtilsService)

  POST_DATAS_DETAIL:any = []
  USER_DATAS:any = {}

  POSTS_DATA:any = []
  DONE_LOADING = false
  DONE_LOADING_DETAIL = false
  IS_LOGIN = false

  ngOnInit(): void {
    this.titleService.setTitle("Gatera - Lowongan Tersimpan");
    this.POSTS_DATA = []
    this.IS_LOGIN = this.userService.checkAuth()
    if(this.IS_LOGIN){
      this.userService.getUserData().then(userData => {
        this.USER_DATAS = userData
        this.userService.GetAllSavedPost().then(savedData => {
          this.POSTS_DATA = savedData
          this.DONE_LOADING = true
        })
      })
    }else{
      this.DONE_LOADING = true
    }
  }

  savePost(evt:Event, isLike:any, id: string){
    evt.stopPropagation();

    if(confirm("Apakah kamu yakin ingin menghapus lowongan ini dari daftar tersimpan?")){
      let formData = new FormData()
  
      // remove dari list
      this.POSTS_DATA = this.POSTS_DATA.filter((savedData:any) => savedData.id !== id);
  
      formData.append("isLike", isLike)
      formData.append("id", id)
      this.userService.HandleSavedPost(formData).then(() => {
        const toastId = `toast-${Date.now()}`;  // ID unik untuk setiap toastr

        // Cek apakah container toastr sudah ada, jika belum buat container
        if (!$('#toast-container').length) {
            $(document.body).append(`
                <div id="toast-container" class="fixed flex flex-col-reverse gap-3 bottom-5 left-5 space-y-3 z-[999]"></div>
            `);
        }

        // Tambahkan toastr baru ke container
        $('#toast-container').prepend(`
            <div id="${toastId}" class="toast ${isLike ? "bg-main" : "bg-orange-500"} flex items-center w-full p-4 space-x-4 text-white font-medium divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow" role="alert">
                <div class="text-sm flex items-center gap-2"><i class="uil uil-check text-xl"></i> Lowongan dihapus dari daftar tersimpan.</div>
            </div>
        `);

        // Fade in toastr, lalu fade out setelah 1 detik
        $(`#${toastId}`).hide().fadeIn(300).delay(1500).fadeOut(500, function() {
            $(this).remove();  // Hapus toastr setelah fade out selesai
        });
      }).catch(error => {
        console.error(error)
        alert("ERROR")
      })
    }
    
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

  hasMatchingSkills(userSkills: any[] = [], postSkills: any[] = []): boolean {
    const userSkillSet = new Set(userSkills.map(skill => skill.skill));
    return postSkills.some(skill => userSkillSet.has(skill.skill));
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

  hideAllPopup(evt:any, e:any){
    const $this = $(evt)

    if(e.target.id == "popup-home"){
      $this.children().each(function(){
        if($(this).is(":visible")){
          $(this).slideToggle("fast") 
          $this.fadeOut("fast")
          $("body").css("overflow", "auto")
        }
      })
    }
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
