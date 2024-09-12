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
  selector: 'app-admin-users',
  standalone: true,
  imports: [RouterLink, AdminNavbarComponent, AdminSidebarComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
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
      ajax: (data:any, callback:any, settings:any) => {
        console.log(data);
        
        var limit = data.length; // Limit dari DataTables
        var start = data.start;
        var search = data.search.value
        $.ajax({
          url: `${this.requestService.getURL()}/api/v1/users?limit=${limit}&offset=${start}&keyword=${search}`,
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
      columns: [
        {
          data: null,
          render: function (data:any, type:any, row:any, meta:any) {
            return meta.row + meta.settings['_iDisplayStart'] + 1;
          },
        },
        { 
          data: "email",
          render: function (data:any) {
            return data.length > 30 ?
              data.substr( 0, 30 ) +'…' :
              data;
          },
        },
        { 
          data: "firstname",
          render: function (data:any) {
            return data.length > 30 ?
              data.substr( 0, 30 ) +'…' :
              data;
          },
        },
        { 
          data: "lastname",
          render: function (data:any) {
            return data.length > 30 ?
              data.substr( 0, 30 ) +'…' :
              data;
          },
        },
        { 
          data: "active_search",
          render: function (data:any) {
            return data == 1 ? "Active" : "Tidak Aktif"
          },
        },
        {
          data: "id",
          width:"5%",
          render: function (data:any) {
            return `<a href="/siswa/edit/${data}" class="edit-siswa"><i class="uil uil-edit text-main"></i></a>`;
          },
          orderable: false,
          className: "text-center"
        },
        {
          data: "id",
          width:"5%",
          render: function (data:any) {
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