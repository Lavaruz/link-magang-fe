import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { UserService } from '../../../services/user.service';
import { PostsService } from '../../../services/posts.service';
import moment from 'moment';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import $ from "jquery"
import DataTable from 'datatables.net-dt';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-admin-posts',
  standalone: true,
  imports: [RouterLink, AdminNavbarComponent, AdminSidebarComponent],
  templateUrl: './admin-posts.component.html',
  styleUrl: './admin-posts.component.css'
})
export class AdminPostsComponent implements OnInit{
  requestService = inject(RequestService)
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
      this.initDatatable()
    })
  }

  ngAfterViewInit(){
    $("footer").remove()
  }


  initDatatable(){
    let table = new DataTable('#myTable', {
      serverSide: true,
      ajax: (data:any, callback, settings) => {
        console.log(data);
        
        var limit = data.length; // Limit dari DataTables
        var start = data.start;
        var search = data.search.value
        $.ajax({
          url: `${this.requestService.getURL()}/api/v1/posts?limit=${limit}&offset=${start}&search=${search}`,
          method: 'GET',
          success: (response) => {
              response = this.requestService.decryptData(response)
              console.log(response);
              
              callback({
                  draw: data.draw,
                  recordsTotal: response.total_entries, // Total data
                  recordsFiltered: response.total_entries, // Total data yang difilter
                  data: response.datas // Data yang ditampilkan
              });
          }
      });
      },
      // ajax: {
      //   var limit = data.length; // Limit dari DataTables
      //   var start = data.start;

      //   url: `https://internshits.com/api/v1/posts?limit=10`,
      //   type: "GET",
      //   dataSrc: (json) => {
      //     json = this.requestService.decryptData(json)
      //     console.log(json);
          
      //     return json.datas || json; 
      //   }
      // },
      columns: [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + meta.settings['_iDisplayStart'] + 1;
          },
        },
        { 
          data: "title",
          render: function (data, type, row, meta) {
            return data.length > 30 ?
              data.substr( 0, 30 ) +'…' :
              data;
          },
        },
        { 
          data: "company",
          render: function (data, type, row, meta) {
            return data.length > 30 ?
              data.substr( 0, 30 ) +'…' :
              data;
          },
        },
        { data: "location" },
        { data: "type" },
        { 
          data: "post_date",
          render: (data, type, row, meta) => {
            return this.formatDate(data)
          },
        },
        {
          data: "id",
          width:"5%",
          render: function (data, type) {
            return `<a href="/siswa/edit/${data}" class="edit-siswa"><i class="uil uil-edit text-main"></i></a>`;
          },
          orderable: false,
          className: "text-center"
        },
        {
          data: "id",
          width:"5%",
          render: function (data, type) {
            return `<input type="checkbox" name="checkedSiswa" class="checkbox-delete" value="${data}" />`;
          },
          orderable: false,
        },
      ],
      pageLength: 10,               // Number of posts per page
      order: [[ 0, "asc" ]] 
    });
  }

  formatDate(dateString: string): string {
    // Parse the date with the format of MM/DD/YYYY
    const date = moment(dateString, 'MM/DD/YYYY');
    
    // Return the date in the desired format (D MMMM YYYY in Indonesian)
    return date.locale('id').format('D MMMM YYYY');
  }
}
