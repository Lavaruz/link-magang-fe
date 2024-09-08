import { Component, inject, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { CommonModule } from '@angular/common';
import { ExperienceInterface } from '../../../interface/experience.interface';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-profile-experiences',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="experiences rounded-2xl overflow-hidden shadow-md border-2 border-main">
        <div class="w-100 bg-main flex items-center justify-between px-5 py-3">
            <p class="text-white flex items-center gap-2"><i class="uil uil-bag"></i> PENGALAMAN</p>
            <p (click)="openPopup('experiences')" id="edit-experiences" class="cursor-pointer text-white text-sm font-second flex items-center gap-2">Edit</p>
        </div>
        <div id="experiences" class="w-full px-5 bg-white noise lg:rounded-none lg:rounded-2xl lg:rounded-b-2xl border-2 lg:border-0 border-header">
            @if(userData.experiences.length > 0){
              <div id="on-experiences" class="flex flex-col pb-4 pt-3">
                @for(experience of userData.experiences.slice(0,LIMIT); track experience.id; let idx = $index){
                  <div class="experience w-full py-3">
                    <div class="lg:flex justify-between items-start">
                        <div class="">
                            <p class="mb-1 text-sm bg-main/60 px-2 w-max text-white">{{ experience.exp_type }}</p>
                            <div class="text-xl font-semibold flex items-center gap-3">
                              <span>
                                {{ experience.exp_position.length > 50 ? experience.exp_position.substring(0,50) + '..' : experience.exp_position }}
                              </span>
                              <span *ngIf="idx == 0" class="text-xs bg-orange-500 px-2 w-max text-white">Aktif</span>
                            </div>
                            <div class="flex items-center font-medium lg:font-normal gap-1 text-black/70 text-sm lg:text-base">
                                <p>
                                    {{ experience.exp_orgname.length > 28 ? experience.exp_orgname.substring(0,25) + '..' : experience.exp_orgname }} • 
                                    {{ experience.exp_time }} • 
                                    {{ experience.exp_status }} 
                                    ({{ experience.exp_location }})
                                </p>
                            </div>
                        </div>
                        <div class="lg:text-right flex lg:block items-center gap-2 mt-1 lg:m-0">
                            <p class="text-xs lg:text-sm">
                                {{ utilsService.formatDateMonth(experience.exp_startdate) }} - 
                                {{ experience.exp_enddate ? utilsService.formatDateMonth(experience.exp_enddate) : "Sekarang" }}
                            </p>
                            <p class="text-xs text-black/60">
                                {{ utilsService.calculateMonthDifference(experience.exp_startdate, experience.exp_enddate ? experience.exp_enddate : utilsService.getFormattedDate()).toUpperCase() }}
                            </p>
                        </div>
                    </div>

                    <!-- BODY -->
                    <div class="my-3 mb-6" [innerHTML]="experience.exp_description"></div>
                    <hr *ngIf="idx+1 !== userData.experiences.length">
                </div>
              }
              <button *ngIf="userData.experiences.length > absNumber(userData.experiences.length - LIMIT)" (click)="showAllData()" class="my-4 font-bold hover:text-main/80 text-main mx-auto">Tampilkan {{userData.experiences.length - LIMIT}} Pengalaman Lain</button>
              </div>
            }@else {
              <div id="off-experiences" class="py-5 pb-6 text-center">
                  <p class="font-bold text-base text-main mb-3">Tambahkan pengalaman kamu disini!</p>
                  <p class="font-second text-black/80 text-sm font-medium px-2 lg:px-24 mb-5 lg:mb-2">Pengalaman merupakan jantung dari portfoliomu. Kamu dapat menambahkan pengalaman internship, parttime, fulltime, hingga pengalaman organisasi!</p>
                  <button id="button-experiences" class="flex items-center gap-1 bg-main text-white rounded-lg text-sm py-2 px-4 m-auto mt-4">Tambahkan Pengalaman</button>
              </div>
            }
        </div>
    </div>
  `,
})
export class ProfileExperiencesComponent {
  @Input() userData!:UserInterface
  @Input() experiencesData!:ExperienceInterface[]
  @Input() openPopup:any

  utilsService = inject(UtilsService)
  LIMIT = 2

  showAllData(){
    this.LIMIT = 99
  }
  absNumber(input:any){
    return Math.abs(input)
  }

}
