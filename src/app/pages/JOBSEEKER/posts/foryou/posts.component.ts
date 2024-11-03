import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostNavbarComponent } from '../../../../components/post-navbar/post-navbar.component';
import { UserService } from '../../../../services/user.service';
import { PostsService } from '../../../../services/posts.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import $ from "jquery"
import { UtilsService } from '../../../../services/utils.service';
import { environment } from '../../../../../environments/environment';
import { GoogleAnalyticsServiceService } from '../../../../services/google-analytics.service.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NavbarComponent, RouterLink, PostNavbarComponent, CommonModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './posts.component.html',
})
export class PostsForYouComponent implements OnInit {

  titleService = inject(Title)
  userService = inject(UserService)
  postService = inject(PostsService)
  utilService = inject(UtilsService)
  aRoute = inject(ActivatedRoute)
  googleAnalytics = inject(GoogleAnalyticsServiceService)
  router = inject(Router)

  FORM_SEARCH:FormGroup = new FormGroup("")

  IS_LOGIN = false

  SHOW_MORE_BUTTON = false
  POST_PAGE = 1
  POST_LIMIT = 6
  POST_COUNT = 0

  POST_DATAS_SAVED:any = []
  POSTS_DATA:any = []
  POST_DATAS_DETAIL:any
  DONE_LOADING_DETAIL = false
  DONE_LOADING = false
  IS_BUTTON_LOADING = false
  QUERY:any

  ngOnInit(): void {
    this.titleService.setTitle("Gatera - Lowongan Khusus Buat Kamu");
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
      
      if(this.IS_LOGIN == true){
        this.userService.getUserData().then(userData => {
          if(userData.skills.length == 0) this.router.navigate(["/profile/completion"])
          this.postService.GetAllMatchPosts(this.QUERY).then(postsData => {
            this.POSTS_DATA = postsData.datas
            
            this.POST_PAGE = postsData.page
            this.POST_COUNT = postsData.total_entries
  
            this.userService.GetAllSavedPost().then(savedPost => {
              this.POST_DATAS_SAVED = savedPost.map((saved:any) => saved.id)
            })
  
            this.SHOW_MORE_BUTTON = this.POST_PAGE * this.POST_LIMIT < this.POST_COUNT   
            this.DONE_LOADING = true
          })
        })
      }else if(this.IS_LOGIN == false){
        this.DONE_LOADING = true
      }
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

  savePost(evt:Event, isLike:any, id: string){
    evt.stopPropagation();

    let MSG = ""

    if(this.IS_LOGIN == false){
      this.openLoginPanel()
      return
    }
    
    let formData = new FormData()
    // wether post is like or not

    if (isLike) {
      MSG = "Lowongan berhasil disimpan"
      this.POST_DATAS_SAVED.push(id); // Menambahkan postId ke array
    } else {
      MSG = "Lowongan dihapus dari daftar tersimpan"
      this.POST_DATAS_SAVED = this.POST_DATAS_SAVED.filter((savedId:any) => savedId !== id);
    }

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
              <div class="text-sm flex items-center gap-2"><i class="uil uil-check text-xl"></i> ${MSG}.</div>
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
    $("#popup-home").fadeIn().css("display", "flex")
    $("#popup-detail-job").slideToggle("fast")
    $("body").css("overflow", "hidden")
    this.postService.GetPostById(id).then(postData => {
      this.POST_DATAS_DETAIL = postData
      this.DONE_LOADING_DETAIL = true
    })
    
  }

  closePopupDetail(){
    $("#popup-detail-job").slideToggle("fast")
    $("#popup-home").fadeOut("fast")
    $("body").css("overflow", "auto")
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
