import { Component, inject, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-skills-skills-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="hidden popup popup-skills border-2 border-main w-full lg:w-[720px] rounded-2xl overflow-hidden">
      <div class="hidden header bg-main lg:flex justify-between px-5 py-3 items-center">
          <p class="font-normal text-white text-base tracking-[1.6px] flex items-center gap-2">MENGEDIT KEAHLIAN</p>
          <p (click)="closePopup('skills')" class="close-x cursor-pointer font-second font-medium text-sm text-teal-100">Close x</p>
      </div>
      <div class="body bg-background noise lg:bg-body h-[85vh] lg:h-[400px] overflow-y-scroll">
          <form id="form-edit-skills" class="">
              <div class="divide-y divide-header lg:pb-0">
                  <div class="p-5">
                      <p class="font-bold text-lg text-main mb-1">Keahlian</p>
                      <p class="text-black/80 text-sm font-second font-medium">Disini kamu dapat menambahkan keahlian yang kamu miliki, untuk membantu kami merekomendasikan post yang sesuai dengan profilmu!</p>
                  </div>
                  <div class="divide-y divide-header px-5">
                      <div class="mb-4">
                          <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">KEAHLIAN*</label>
                          <button type="button" id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" class="text-white bg-main hover:bg-main/80 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full">Cari keahlian <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                              </svg>
                          </button>
                          
                          <!-- Dropdown menu -->
                          <div id="dropdownSearch" class="lg:w-[600px] border-2 border-main z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                              <div class="p-3">
                                  <label for="input-group-search" class="sr-only">Cari</label>
                                  <div class="relative">
                                  <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                      </svg>
                                  </div>
                                  <input type="text" class="skills-input block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari keahlian">
                                  </div>
                              </div>
                              <ul id="list-skills" class="h-28 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                                @for(skill of skillsData; track skill.id){
                                  <li>
                                      <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                          <input (click)="addToSkills(skill.id)" id="checkbox-{{skill.id}}" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                          <label for="checkbox-{{skill.id}}" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{skill.skill}}</label>
                                      </div>
                                  </li>
                                }
                              </ul>
                              <div class="flex flex-col items-center p-3 text-sm border border-gray-200 rounded-b-lg bg-gray-50">
                                  <input type="text" name="" id="" placeholder="Tambahkan keahlian baru" class="w-full border border-gray-300 focus:border-main py-2 rounded-lg text-sm">
                                  <button id="button-add-skill" type="button" class="text-white text-sm w-full rounded-lg py-2 bg-main mt-2">Tambah Keahlian</button>
                              </div>
                          </div>
                      </div>
                      <div id="active-skills" class="w-full p-5 rounded-lg bg-white">
                          <!-- HERE -->
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
export class ProfileSkillsPopupComponent implements OnInit {
  
  userService = inject(UserService)

  @Input() closePopup: any
  @Input() skillsData: any
  @Input() userData!: UserInterface

  SKILLS:any = []

  formSummary = new FormGroup({
    summary: new FormControl("")
  })

  ngOnInit(): void {
    this.formSummary.controls['summary'].setValue(this.userData.summary)
  }

  addToSkills(id:any){
    this.SKILLS.push(id)
    console.log(this.SKILLS);
    
  }

  submitSummary(){
    const summaryData = this.formSummary.value
    if(summaryData.summary){
      this.userData.summary = summaryData.summary
      this.userService.updateUserData(summaryData)
      .then(() => {
        this.closePopup("summary")
      })
      .catch((e) => {
        alert(e.error.message)
        console.log(e)
      })
    }
  }
}
