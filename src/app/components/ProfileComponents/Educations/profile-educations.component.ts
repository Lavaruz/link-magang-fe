import { Component, inject, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { CommonModule } from '@angular/common';
import { ExperienceInterface } from '../../../interface/experience.interface';
import { EducationInterface } from '../../../interface/education.interface';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-profile-educations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="educations rounded-2xl overflow-hidden shadow-md border-2 border-main">
        <div class="w-100 bg-main flex items-center justify-between px-5 py-3">
            <p class="text-white flex items-center gap-2"><i class="uil uil-graduation-cap"></i> PENDIDIKAN</p>
            <p (click)="openPopup('educations')" id="edit-education" class="cursor-pointer text-white text-sm font-second flex items-center gap-2">Edit</p>
        </div>
        <div id="educations" class="w-full px-5 bg-white noise lg:rounded-none lg:rounded-2xl lg:rounded-b-2xl border-2 lg:border-0 border-header">
            @if(userData.educations.length > 0){
              <div id="on-educations" class="flex flex-col pb-4 pt-3">
                  @for(education of userData.educations.slice(0,LIMIT); track education.id; let idx = $index){
                    <div class="experience w-full py-3">
                      <div class="lg:flex justify-between items-start">
                          <!-- Left Section: Education Details -->
                          <div>
                              <!-- Education Type -->
                              <div class="flex items-center gap-4 mb-1">
                                <p class="text-sm bg-main/60 px-2 w-max text-white">{{ education.edu_type }}</p>
                                <span *ngIf="idx == 0" class="text-sm bg-orange-500 px-2 w-max text-white">Aktif</span>
                              </div>
                              <!-- Program Name (truncated if more than 50 characters) -->
                              <div class="text-xl font-semibold flex items-center gap-3">
                                <span>
                                  {{ 
                                    education.edu_program.length > 50 
                                    ? (education.edu_program.substring(0, 50) + '..') 
                                    : education.edu_program 
                                  }}
                                </span>
                              </div>
                              <!-- Institution and GPA -->
                              <div class="flex items-center font-medium lg:font-normal gap-1 text-black/70 text-sm lg:text-base">
                                  <p>
                                      {{ education.edu_institution.length > 25 
                                          ? (education.edu_institution.substring(0, 25) + '..') 
                                          : education.edu_institution }} 
                                      • Nilai: {{ education.edu_gpa }}
                                  </p>
                              </div>
                          </div>

                          <!-- Right Section: Date and Duration -->
                          <div class="lg:text-right mt-1 lg:m-0 flex lg:block gap-2">
                              <!-- Start and End Date -->
                              <p class="text-xs lg:text-sm">
                                  {{ utilService.formatDateMonth(education.edu_startdate) }} - 
                                  {{ education.edu_enddate 
                                      ? utilService.formatDateMonth(education.edu_enddate) 
                                      : 'Now' }}
                              </p>
                              <!-- Duration (in months) -->
                              <p class="text-xs text-black/60">
                                  {{ utilService.calculateMonthDifference(education.edu_startdate, 
                                      education.edu_enddate 
                                      ? education.edu_enddate 
                                      : utilService.getFormattedDate()).toUpperCase() }}
                              </p>
                          </div>
                      </div>

                      <div class="mt-3 mb-6" [innerHTML]="education.edu_description"></div>
                      <hr *ngIf="idx+1 !== userData.educations.length">
                  </div>
                  }
                <button *ngIf="userData.educations.length > absNumber(userData.educations.length - LIMIT) && absNumber(userData.educations.length - LIMIT) > 0" (click)="showAllData()" class="my-4 font-bold hover:text-main/80 text-main mx-auto">Tampilkan {{userData.educations.length - LIMIT}} Pendidikan Lain</button> 
              </div>
            }@else {
              <div id="off-educations" class="text-center py-5">
                  <p class="font-bold text-base text-main mb-3">Tambahkan pendidikanmu disini!</p>
                  <p class="font-second text-black/80 text-sm font-medium px-2 lg:px-24 mb-5 lg:mb-2">Pendidikan dapat meningkatkan kapabilitas kamu di mata orang lain, beri tau semua orang apa yang kamu bisa!</p>
                  <button (click)="openPopup('educations')" id="button-education" class="flex items-center gap-1 bg-main text-white rounded-lg text-sm py-2 px-4 m-auto mt-4">Tambahkan pendidikan</button>
              </div>
            }
        </div>
    </div>
  `,
})
export class ProfileEducationsComponent {
  @Input() userData!:UserInterface
  @Input() educationsData!:EducationInterface[]
  @Input() openPopup:any

  utilService = inject(UtilsService)
  LIMIT = 2

  showAllData(){
    this.LIMIT = 99
  }
  absNumber(input:any){
    return Math.abs(input)
  }
  
}
