import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';

@Component({
  selector: 'app-profile-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-skills rounded-2xl overflow-hidden shadow-md border-2 border-main">
        <div class="w-100 bg-main flex items-center justify-between px-5 py-3">
            <p class="text-white flex items-center gap-2"><i class="uil uil-basketball"></i> KEAHLIAN</p>
            <p (click)="openPopup('skills')" id="edit-profile-skills" class="cursor-pointer text-white text-sm font-second flex items-center gap-2">Edit</p>
        </div>
        <div id="profile-skills" class="w-full p-5 pb-6 noise bg-white border-2 lg:border-0 border-header lg:rounded-b-2xl">
            @if(userData.skills.length > 0){
              <div id="on-skills" class="">
                  @for( skill of userData.skills; track skill.id ){
                    <button type="button" class="m-1 text-black/80 px-4 py-1 rounded-lg bg-main text-white">{{skill.skill}}</button>
                  }
              </div>
            }@else{
              <div id="off-skills" class="text-center">
                  <p class="font-bold text-base text-main mb-3">Tambahkan keahlian terbaikmu disini!</p>
                  <p class="font-second text-black/80 text-sm font-medium px-2 lg:px-24 mb-5 lg:mb-2">Keahlian yang kamu tambahkan, dapat membantu kami memberikan rekomondasi lowongan yang cocok dengan profilmu</p>
                  <button id="button-profile-skills" class="flex items-center gap-1 bg-main text-white rounded-lg text-sm py-2 px-4 m-auto mt-4">Tambahkan Keahlian</button>
              </div>
            }
        </div>
    </div>
  `,
})
export class ProfileSkillsComponent {
  @Input() userData!: UserInterface
  @Input() openPopup: any
}
