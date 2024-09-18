import { Component, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../../admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';
import { UserService } from '../../../../services/user.service';
import { Select2Module } from 'ng-select2-component';
import { HttpClient } from '@angular/common/http';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import $ from "jquery"
import { CommonModule } from '@angular/common';
import { PostsService } from '../../../../services/posts.service';
import moment from 'moment';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [AdminNavbarComponent, AdminSidebarComponent, AngularEditorModule, Select2Module, ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
})
export class AdminPostCreateComponent implements OnInit {

  userService = inject(UserService)
  postService = inject(PostsService)
  http = inject(HttpClient)

  LOCATIONS:any
  PROVINSI:any = []
  KABUPATEN:any = []
  KECAMATAN:any = []
  SKILLS:any
  DONE_LOADING = false
  FORM_CREATE_POST!:FormGroup
  activeSkills: string[] = [];
  searchText: string = '';

  LOADING_SKILL_INPUT = false
  LOADING_POST_DATA = false

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
      title: new FormControl("Software Developer"),
      company: new FormControl("Internshit"),
      platform: new FormControl("Glints"),
      type: new FormControl("Internship"),
      post_date: new FormControl(this.getTodayDate()),
      link: new FormControl("https://internshits.com"),
      provinsi: new FormControl(""),
      kabupaten: new FormControl(""),
      kecamatan: new FormControl(""),
      overview: new FormControl("Konz"),
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
      this.KABUPATEN = []
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
      this.KECAMATAN = []
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

    this.LOADING_POST_DATA = true

    const formData = this.FORM_CREATE_POST.value
    const provinsiData = this.capitalize((this.PROVINSI.find((prof:any) => prof.value == this.FORM_CREATE_POST.value["provinsi"])).label);
    const kabupatenData = this.FORM_CREATE_POST.value["kabupaten"] ? this.capitalize((this.KABUPATEN.find((prof:any) => prof.value == this.FORM_CREATE_POST.value["kabupaten"])).label) : null;
    const kecamatanData = this.FORM_CREATE_POST.value["kecamatan"] ? this.capitalize((this.KECAMATAN.find((prof:any) => prof.value == this.FORM_CREATE_POST.value["kecamatan"])).label) : null;

    formData.location = `${kecamatanData ? kecamatanData + ", " : ""}${kabupatenData ? kabupatenData + ", " : ""}${provinsiData}`;
    formData.skills = this.activeSkills.join(";")
    formData.post_date = moment(this.FORM_CREATE_POST.value["post_date"]).format('MM/DD/YYYY');
    this.postService.CreateNewPost(formData).then(postedData => {
      this.LOADING_POST_DATA = false
      location.reload()
    })
    
    
    
  }

  setSkillsToActive(skill: any, event: any) {
    if (event.target.checked) {
      this.activeSkills.push(skill.id); // Simpan skill.id
    } else {
      this.activeSkills = this.activeSkills.filter(id => id !== skill.id); // Hapus berdasarkan skill.id
    }
  }

  filteredSkills() {
    if (!this.searchText) {
      return this.SKILLS;
    }
    return this.SKILLS.filter((skill:any) =>
      skill.skill.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  getSkillName(skillId: any) {
    const skill = this.SKILLS.find((s:any) => s.id === skillId);
    return skill ? skill.skill : '';
  }

  getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(today.getDate()).padStart(2, '0'); // Add leading zero
    return `${year}-${month}-${day}`; // Return formatted date
  }

  addNewSkill(inputSkill:any){
    if (!inputSkill.value) return;
    this.LOADING_SKILL_INPUT = true
    this.userService.AddNewSkill({skill: inputSkill.value}).then(newSkill => {
      this.SKILLS.unshift(newSkill);
      inputSkill.value = '';
      setTimeout( ()=> {
        this.LOADING_SKILL_INPUT = false
      }, 1000)
    })
  }

  capitalize(text:any) {
    if (!text) return '';
    return text.toLowerCase().replace(/\b\w/g, (char:any) => char.toUpperCase());
  }
}
