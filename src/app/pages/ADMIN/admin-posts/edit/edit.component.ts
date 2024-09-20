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
  selector: 'app-edit',
  standalone: true,
  imports: [AdminNavbarComponent, AdminSidebarComponent, AngularEditorModule, Select2Module, ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html'
})
export class AdminPostEditComponent {
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
    const ID = window.location.href.split("/admin/posts/edit/").pop()
    this.postService.GetPostById(ID).then(postData => {
      postData.skills.forEach((skill:any) => {
        this.activeSkills.push(skill.id)
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

          this.FORM_CREATE_POST = new FormGroup({
            title: new FormControl(postData.title),
            company: new FormControl(postData.company),
            platform: new FormControl(postData.platform),
            type: new FormControl(postData.type),
            post_date: new FormControl(this.formatDate(postData.post_date)),
            link: new FormControl(postData.link),
            provinsi: new FormControl(),
            kabupaten: new FormControl(),
            kecamatan: new FormControl(),
            overview: new FormControl(postData.overview),
            skills: new FormControl(),
          })

          this.DONE_LOADING = true
        })
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

  formatDate(dateStr:any) {
    const [month, day, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
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

  parseLocation(locationArray:any) {
    let kecamatan = '';
    let kabupaten = '';
    let provinsi = '';
  
    if (locationArray.length === 3) {
      kecamatan = locationArray[0].trim();
      kabupaten = locationArray[1].trim();
      provinsi = locationArray[2].trim();
    } else if (locationArray.length === 2) {
      kabupaten = locationArray[0].trim();
      provinsi = locationArray[1].trim();
    } else if (locationArray.length === 1) {
      provinsi = locationArray[0].trim();
    }
  
    return { kecamatan, kabupaten, provinsi };
  }
}
