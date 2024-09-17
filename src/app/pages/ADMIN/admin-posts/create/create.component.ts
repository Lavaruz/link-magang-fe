import { Component, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../../admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';
import { UserService } from '../../../../services/user.service';
import { Select2Module } from 'ng-select2-component';
import { HttpClient } from '@angular/common/http';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [AdminNavbarComponent, AdminSidebarComponent, AngularEditorModule, Select2Module, ReactiveFormsModule],
  templateUrl: './create.component.html',
})
export class AdminPostCreateComponent implements OnInit {

  userService = inject(UserService)
  http = inject(HttpClient)

  LOCATIONS:any
  PROVINSI:any = []
  KABUPATEN:any = []
  KECAMATAN:any = []
  SKILLS:any
  DONE_LOADING = false
  FORM_CREATE_POST!:FormGroup

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  ngOnInit(): void {
    var urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
    var urlKabupaten = "https://ibnux.github.io/data-indonesia/kabupaten/";
    var urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
    var urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";

    this.FORM_CREATE_POST = new FormGroup({
      title: new FormControl(""),
      company: new FormControl(""),
      platform: new FormControl("Glints"),
      type: new FormControl("Internship"),
      post_date: new FormControl(""),
      link: new FormControl(""),
      provinsi: new FormControl(""),
      kabupaten: new FormControl(""),
      kecamatan: new FormControl(""),
      overview: new FormControl(""),
      skills: new FormControl(""),
    })

    this.userService.GetAllSkills().then(skillsData => {
      this.SKILLS = skillsData
      this.http.get("assets/location/provinsi.json").subscribe((data:any) => {
        data.forEach((provinsi:any) => {
          this.PROVINSI.push({
            value: provinsi.id,
            label: provinsi.nama,
          })
        });
        this.DONE_LOADING = true
      })
    })
  }

  updateProvisi(evt:any){
    this.http.get(`assets/location/kabupaten/${evt.value}.json`).subscribe((data:any) => {
      data.forEach((kabupaten:any) => {
        this.KABUPATEN.push({
          value: kabupaten.id,
          label: kabupaten.nama,
        })
      });
    })
  }

  updateKabupaten(evt:any){
    this.http.get(`assets/location/kecamatan/${evt.value}.json`).subscribe((data:any) => {
      data.forEach((kecamatan:any) => {
        this.KECAMATAN.push({
          value: kecamatan.id,
          label: kecamatan.nama,
        })
      });
    })
  }

  ngAfterViewInit(){
    $("footer").remove()
  }

  submitFormCreate(){
    if(this.FORM_CREATE_POST.invalid){
      return
    }
    const formData = this.FORM_CREATE_POST.value
    const provinsiData = (this.PROVINSI.find((prof:any) => prof.value == this.FORM_CREATE_POST.value["provinsi"])).label
    const kabupatenData = (this.KABUPATEN.find((prof:any) => prof.value == this.FORM_CREATE_POST.value["kabupaten"])).label
    const kecamatanData = (this.KECAMATAN.find((prof:any) => prof.value == this.FORM_CREATE_POST.value["kecamatan"])).label
    console.log(`${provinsiData} > ${kabupatenData} > ${kecamatanData}`);
    formData.location = `${provinsiData} > ${kabupatenData} > ${kecamatanData}`
    console.log(formData);
    
    
    
  }
}
