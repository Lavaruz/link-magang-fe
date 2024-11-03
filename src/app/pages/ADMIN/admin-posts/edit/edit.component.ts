import { Component, inject, NgZone, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
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
  ngZone = inject(NgZone)

  selectedOption: string = 'Internal';
  selectedFile: File | null = null;
  OUR_LOCATIONS:any

  ID:any = ""
  LOCATIONS:any = []
  PROVINSI:any = []
  KABUPATEN:any = []
  KECAMATAN:any = []
  SKILLS:any
  POST_DATA:any


  DONE_LOADING = false
  FORM_CREATE_POST!:FormGroup
  activeSkills: string[] = [];
  searchText: string = '';

  LOADING_SKILL_INPUT = false
  LOADING_POST_DATA = false

  editorConfig: AngularEditorConfig = {
    editable: true,
    placeholder: 'Enter text here...',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['undo','redo','strikeThrough', 'underline', 'subscript', 'superscript', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'heading', 'fontName', 'fontSize', 'textColor', 'backgroundColor', 'customClasses', 'link', 'unlink', 'insertImage', 'insertVideo', 'toggleEditorMode'],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  ngOnInit(): void {
    this.ID = window.location.href.split("/admin/posts/edit/").pop()
    this.postService.GetPostById(this.ID).then(postData => {
      this.POST_DATA = postData
      postData.skills.forEach((skill:any) => {
        this.activeSkills.push(skill.id)
      })
      
      this.userService.GetAllSkills().then(skillsData => {
        this.userService.GetAllLocations().then(locationData => {

          this.OUR_LOCATIONS = locationData
          locationData.forEach((location:any) => {
            this.LOCATIONS.push({
              value: location.location,
              label: location.location
            })
          });
          
          this.SKILLS = skillsData
          this.FORM_CREATE_POST = new FormGroup({
            title: new FormControl(postData.title),
            company: new FormControl(postData.company),
            platform: new FormControl(postData.platform),
            type: new FormControl(postData.type),
            post_date: new FormControl(this.formatDate(postData.post_date)),
            link: new FormControl(postData.link),
            location: new FormControl(postData.location),
            overview: new FormControl(postData.overview),
            skills: new FormControl(),
          })
  
          this.DONE_LOADING = true
        })
      })
    })
  }

  toggleDropdown() {
    this.ngZone.run(() => {
      const dropdownElement = document.getElementById('dropdownSearch');
      dropdownElement?.classList.toggle('hidden');
    });
  }

  removeSkill(skillId:any){
    $(`#skill-${skillId}`).prop("checked", false)
    this.activeSkills = this.activeSkills.filter((id:any) => id !== skillId);
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
        this.postService.UpdatePostById(formData, this.ID).then(postedData => {
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
      this.postService.UpdatePostById(formData, this.ID).then(postedData => {
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
