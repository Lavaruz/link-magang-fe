import { AfterViewInit, Component, EventEmitter, inject, Input, NgZone, OnInit, Output } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import $ from "jquery"

@Component({
  selector: 'app-skills-skills-popup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  template: `
    <div class="hidden popup popup-skills border-2 border-main w-full lg:w-[720px] rounded-2xl overflow-hidden">
      <div class="hidden header bg-main lg:flex justify-between px-5 py-3 items-center">
          <p class="font-normal text-white text-base tracking-[1.6px] flex items-center gap-2">MENGEDIT KEAHLIAN</p>
          <p (click)="closePopup('skills')" class="close-x cursor-pointer font-second font-medium text-sm text-teal-100">Close x</p>
      </div>
      <div class="body bg-background noise lg:bg-body h-[85vh] lg:h-[400px] overflow-y-scroll relative">
          <form id="form-edit-skills" class="" (submit)="submitNewSkills()">
              <div class="divide-y divide-header lg:pb-0">
                  <div class="p-5">
                      <p class="font-bold text-lg text-main mb-1">Keahlian</p>
                      <p class="text-black/80 text-sm font-second font-medium">Disini kamu dapat menambahkan keahlian yang kamu miliki, untuk membantu kami merekomendasikan post yang sesuai dengan profilmu!</p>
                  </div>
                  <div class="divide-y divide-header px-5">
                      <div class="mb-4">
                          <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">KEAHLIAN*</label>
                          <button type="button" (click)="toggleDropdown()" id="dropdownSearchButton" data-dropdown-placement="bottom" class="flex justify-between items-center text-white bg-main hover:bg-main/80 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full">Cari keahlian <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                              </svg>
                          </button>
                          
                          <!-- Dropdown menu -->
                          <div id="dropdownSearch" class="w-full border-2 border-main z-10 hidden bg-white rounded-lg shadow mt-2 lg:w-1/2 dark:bg-gray-700 absolute">
                              <!-- SEARCH INPUT FOR SKILLS -->
                              <div class="p-3">
                                  <div class="flex items-center relative">
                                      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                          <i class="uil uil-search"></i>
                                      </div>
                                      <input [(ngModel)]="searchText" [ngModelOptions]="{standalone: true}" #addSkill type="text" class="skills-input block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search skill">
                                      <!-- Show Add Skill Button only when no search results -->
                                      <button *ngIf="filteredSkills() && filteredSkills().length === 0" type="button" [disabled]="LOADING_SKILL_INPUT" (click)="addNewSkill(addSkill)" class="px-3 ml-2 disabled:opacity-50 text-white text-sm rounded-lg py-2 bg-main">{{LOADING_SKILL_INPUT ? "Menambahkan.." : "Tambahkan"}}</button>
                                  </div>
                              </div>
                          
                              <ul id="list-skills" class="h-28 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                                  <li *ngFor="let skill of filteredSkills()">
                                      <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                          <input 
                                              type="checkbox" 
                                              [id]="'checkbox-' + skill.id" 
                                              [value]="skill.skill" 
                                              (change)="setSkillsToActive(skill, $event)"
                                              [checked]="activeSkills.includes(skill.id)"
                                          />
                                          <label [for]="'checkbox-' + skill.id" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                              {{ skill.skill }}
                                          </label>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div id="active-skills" class=" overflow-y-scroll bg-white mb-3 rounded-lg p-2.5 px-4 text-sm flex flex-wrap">
                          <ng-container *ngIf="activeSkills.length > 0; else emptyDiv">
                            @for(skillId of activeSkills; track skillId){
                              <div class="group overflow-hidden self-start block m-1 text-black/80 px-4 py-1.5 rounded-lg bg-main text-white relative w-max">
                                  {{getSkillName(skillId)}}
                                  <button type="button" (click)="removeSkill(skillId)" class="hidden group-hover:block absolute top-0 bottom-0 right-0 left-0 bg-black/60 text-sm font-medium flex items-center justify-center"><i class="uil uil-trash-alt"></i></button>
                              </div>
                            }
                          </ng-container>
                          <ng-template #emptyDiv>
                            <p>Belum ada keahlian ditambahkan</p>
                          </ng-template>
                      </div>
                  </div>
              </div>
              <div class="fixed lg:mx-5 lg:mb-6 lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                  <button (click)="closePopup('skills')" type="button" class="close-x rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Batal</button>
                  <button type="submit" class="w-full lg:w-max lg:rounded-lg bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Simpan</button>
              </div>
          </form>
      </div>
  </div>
  `,
  styles: ``
})
export class ProfileSkillsPopupComponent implements OnInit, AfterViewInit {
  
  userService = inject(UserService)
  router = inject(Router)
  ngZone = inject(NgZone)

  @Input() closePopup: any
  @Input() skillsData: any
  @Input() userData!: UserInterface
  @Output() userDataUpdated = new EventEmitter<string>()
  activeSkills: string[] = [];
  searchText: string = '';

  LOADING_SKILL_INPUT = false

  SKILLS:any = []

  formSummary = new FormGroup({
    summary: new FormControl("")
  })

  ngOnInit(): void {
    this.userService.GetAllSkills().then(skillsData => {
      this.SKILLS = skillsData
      this.userData.skills.forEach((skill:any) => {
        this.activeSkills.push(skill.id)
      })
      this.formSummary.controls['summary'].setValue(this.userData.summary)
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

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Panggil ulang inisialisasi dropdown di sini
        const dropdownButton = document.getElementById('dropdownSearchButton');
        if (dropdownButton) {
          dropdownButton.click(); // Contoh sederhana untuk memeriksa ulang
        }
      }
    });
  }

  submitNewSkills(){
    const skillData = this.activeSkills.join(";")
    this.userService.updateUserSkills(skillData)
      .then(() => {
        this.closePopup("skills");
        this.userDataUpdated.emit()
      })
      .catch((e) => {
          alert("ERROR");
          console.log(e);
      });
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
      setTimeout( ()=> {
        this.LOADING_SKILL_INPUT = false
      }, 1000)
    })
  }
}
