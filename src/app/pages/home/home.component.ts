import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  dashboard_img = "assets/images/noise-light.png"

  POST_DATAS:any
  POST_LIMIT:number = 9
  POST_PAGE:number = 1

  TOTAL_POST:number = 0

  QUERY:any

  constructor(private postServices: PostsService){
    this.QUERY = {
      limit: this.POST_LIMIT,
      page: this.POST_PAGE
    }
  }

  async ngOnInit() {
    const POSTS = await this.postServices.GetAllPosts(this.QUERY)
    this.TOTAL_POST = await this.postServices.GetCountAllPosts()
    

    this.POST_DATAS = POSTS.datas
    this.POST_LIMIT = POSTS.limit
    this.POST_PAGE = POSTS.page   
    
    console.log(this.POST_DATAS);
    
  }
}
