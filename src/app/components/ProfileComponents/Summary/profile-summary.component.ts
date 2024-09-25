import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';

@Component({
  selector: 'app-profile-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-summary rounded-2xl overflow-hidden shadow-md border-2 border-main">
        <div class="w-100 bg-main flex items-center justify-between px-5 py-3">
            <p class="text-white flex items-center gap-2"><i class="uil uil-user"></i> TENTANG SAYA</p>
            <p (click)="openPopup('summary')" id="edit-profile-summary" class="cursor-pointer text-white text-sm font-second flex items-center gap-2">Edit</p>
        </div>
        <div id="profile-summary" class="w-full p-5 pb-6 noise bg-white border-2 lg:border-0 border-header lg:rounded-b-2xl">
            @if(userData.summary && userData.summary.length !== 0){
              <div id="on-summary" class="paragraph" [innerHTML]="userData.summary"></div>
            }@else{
              <div id="off-summary" class="text-center">
                  <p class="font-bold text-base text-main mb-3">Tuliskan tentang kamu disini!</p>
                  <p class="font-second text-black/80 text-sm font-medium px-2 lg:px-24 mb-5 lg:mb-2">Ini kesempatan bagus untuk menunjukan siapa diri kamu secara ringkas, sehingga orang lain mendapatkan gambaran tentang dirimu.</p>
                  <button (click)="openPopup('summary')" id="button-profile-summary" class="flex items-center gap-1 bg-main text-white rounded-lg text-sm py-2 px-4 m-auto mt-4">Tambahkan ringkasan profil
                  </button>
              </div>
            }
        </div>
    </div>
  `,
})
export class ProfileSummaryComponent {
  @Input() userData!: UserInterface
  @Input() openPopup: any

}
