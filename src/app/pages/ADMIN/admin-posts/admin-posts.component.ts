import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { UserService } from '../../../services/user.service';
import { PostsService } from '../../../services/posts.service';
import moment from 'moment';

@Component({
  selector: 'app-admin-posts',
  standalone: true,
  imports: [RouterLink, AdminNavbarComponent],
  templateUrl: './admin-posts.component.html',
  styleUrl: './admin-posts.component.css'
})
export class AdminPostsComponent implements OnInit{
  userService = inject(UserService)
  postService = inject(PostsService)

  POSTS_DATA:any
  DONE_LOADING = false
  QUERY = {
    limit: 999,
    page: 1,
    search: ""
  }

  ngOnInit(): void {
    this.postService.GetAllPosts(this.QUERY).then(postsData => {
      this.POSTS_DATA = postsData.datas
      console.log(this.POSTS_DATA);
      
    })
  }

  formatDate(dateString: string): string {
    // Parse the date with the format of MM/DD/YYYY
    const date = moment(dateString, 'MM/DD/YYYY');
    
    // Return the date in the desired format (D MMMM YYYY in Indonesian)
    return date.locale('id').format('D MMMM YYYY');
  }
}
