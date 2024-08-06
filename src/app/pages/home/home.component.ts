import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import $ from "jquery"
import { RequestService } from '../../services/request.service';
import { UserService } from '../../services/user.service';
import { Location, NgIf } from '@angular/common';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, GoogleSigninButtonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  dashboard_img = "assets/images/noise-light.png"

  FORM_SEARCH:FormGroup = new FormGroup("")

  IS_VERIFIED:boolean = false

  POST_DATAS:any
  POST_LIMIT:number = 9
  POST_PAGE:number = 1

  TOTAL_POST:number = 0

  QUERY:any

  constructor(private postServices: PostsService, private aRoute: ActivatedRoute, private router: Router, public requestService: RequestService, private userService: UserService, private location: Location){
    aRoute.queryParams.subscribe(params => {
      this.POST_PAGE = params["page"] || 1
      this.QUERY = {
        limit: this.POST_LIMIT,
        page: this.POST_PAGE,
        search: "",
        platform: ""
      }
    })

    this.FORM_SEARCH = new FormGroup({
      search: new FormControl(""),
      limit: new FormControl(9),
      platform: new FormControl("")
    })
  }

  async ngOnInit() {
    this.callGetProduct()
    this.IS_VERIFIED = await this.userService.verifyToken()
  }

  ngAfterViewInit(){
    $("#button-login").click(function(){
      $("#popup").fadeIn(function(){
        $("#popup-login").slideToggle()
        $("body").css("overflow", "hidden")
      }).css("display","flex");
    })

    $("#close-login").click(function(){
      $(this).closest("#popup-login").slideToggle(function(){
        $("#popup").fadeOut()      
        $("body").css("overflow", "auto")
      })
    })
  }

  changePage(e:any){
    if(this.IS_VERIFIED == false){
      $(this).closest("#popup-login").slideToggle(function(){
        $("#popup").fadeOut()      
        $("body").css("overflow", "auto")
      })
      return
    }

    if(e.target.value == "forward") this.POST_PAGE++
    if(e.target.value == "back") this.POST_PAGE--

    this.QUERY.page = this.POST_PAGE
    this.router.navigate([], {queryParams: {page: this.POST_PAGE}})
    this.callGetProduct()
  }

  async callGetProduct(){
    const POSTS = await this.postServices.GetAllPosts(this.QUERY)
    this.TOTAL_POST = await this.postServices.GetCountAllPosts()
    

    this.POST_DATAS = POSTS.datas
    this.POST_LIMIT = POSTS.limit
    this.POST_PAGE = POSTS.page   
  }

  submitFormSearch(){
    this.QUERY.search = this.FORM_SEARCH.value.search
    if(this.QUERY.search.length !== 0){
      this.QUERY.limit = 999
      this.QUERY.page = 1
    }else{
      this.QUERY.limit = 9
    }
    this.callGetProduct()
  }

  changeSelect(){
    this.QUERY.platform = this.FORM_SEARCH.value.platform
    this.QUERY.limit = this.FORM_SEARCH.value.limit
    this.callGetProduct()
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
        return `Diposting minggu ini`;
    } else if (diffInDays < 14) {
        return `Diposting minggu lalu`;
    } else {
        return `Diposting beberapa minggu lalu`;
    } 
  }
}
