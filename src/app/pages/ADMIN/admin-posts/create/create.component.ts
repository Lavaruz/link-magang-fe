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

  selectedOption: string = 'Internal';
  selectedFile: File | null = null;

  LOCATIONS:any = []
  OUR_LOCATIONS:any

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

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;
  }

  ngOnInit(): void {
    this.FORM_CREATE_POST = new FormGroup({
      category: new FormControl(this.selectedOption),
      title: new FormControl(""),
      company: new FormControl(""),
      platform: new FormControl("Glints"),
      type: new FormControl("Internship"),
      post_date: new FormControl(this.getTodayDate()),
      end_date: new FormControl(this.getTodayDate(3)),
      link: new FormControl(""),
      overview: new FormControl(""),
      skills: new FormControl(""),
      location: new FormControl("")
    })

    this.userService.GetAllSkills().then(skillsData => {
      this.SKILLS = skillsData
      this.userService.GetAllLocations().then(locationData => {
        this.OUR_LOCATIONS = locationData
        locationData.forEach((location:any) => {
          this.LOCATIONS.push({
            value: location.location,
            label: location.location
          })
        });
        this.DONE_LOADING = true
      })
    })
  }

  ngAfterViewInit(){
    $("footer").remove()
  }

  submitFormCreate(){
    if(this.FORM_CREATE_POST.invalid){
      return
    }

    const formData = new FormData();

    this.LOADING_POST_DATA = true
    const formDataGroup = this.FORM_CREATE_POST.value
    formDataGroup.skills = this.activeSkills.join(";")
    formDataGroup.post_date = moment(this.FORM_CREATE_POST.value["post_date"]).format('MM/DD/YYYY');

    Object.keys(formDataGroup).forEach(key => {
      formData.append(key, formDataGroup[key]);
    });

    if (this.selectedOption == "Partner" && this.selectedFile) {
      formData.append('company_logo', this.selectedFile, this.selectedFile.name);
    }

    let isHaveLocation = this.OUR_LOCATIONS.some((location:any) => location.location.toLowerCase() == formDataGroup.location.toLowerCase() )
    if(isHaveLocation == false){
      this.userService.AddNewLocation({location: formDataGroup.location}).then(() => {
        this.postService.CreateNewPost(formData).then(postedData => {
          try {
            if(postedData && postedData?.status !== 400){
              this.LOADING_POST_DATA = false
              location.reload()
            }else{
              alert(postedData.error.message)
            }
          } catch (error:any) {
            console.error(error);
            alert("ERROR")
          }
        })
      })
    }else{
      this.postService.CreateNewPost(formData).then(postedData => {
        try {
          if(postedData && postedData?.status !== 400){
            this.LOADING_POST_DATA = false
            location.reload()
          }else{
            alert(postedData.error.message)
          }
        } catch (error:any) {
          console.log(error);
          alert("ERROR")          
        }
      })
    }
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

  getTodayDate(plus = 0) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(today.getDate() + plus).padStart(2, '0'); // Add leading zero
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
