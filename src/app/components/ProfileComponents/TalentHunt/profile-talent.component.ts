import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';

@Component({
  selector: 'app-profile-talent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="visibility-status bg-white border-2 border-main rounded-2xl p-4 pb-5 shadow-md">
        <div class="w-100 rounded-t-2xl">
            <p class="text-main flex items-center gap-2"><i class="uil uil-hunting"></i> VISIBILITAS TALENT HUNT</p>
        </div>
        <p class="font-second text-sm font-semibold text-black/80 mt-3">Jika visibilitas aktif, orang lain dapat melihat profile kamu dalam <a href="/talent" class="text-main">Talent Hunt</a>!</p>
        <label class="relative block inline-flex items-center cursor-pointer mt-5">
            <input name="active_search" disabled [checked]="userData.active_search" type="checkbox" value="" class="active-search sr-only peer">
            <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span [ngClass]="userData.active_search ? 'text-green-500' : 'text-red-500'" class="active-search-status ml-2 font-second text-sm font-semibold">{{userData.active_search == true ? "Visibilitas Aktif" : "Visibilitas Nonaktif"}}</span>
        </label>
        <button (click)="openPopup('active-search')" class="button-active-search flex items-start gap-1 bg-main text-white rounded-lg text-sm py-2 px-4 mt-4">Deklarasi saya butuh pekerjaan !</button>
    </div>
  `,
})
export class ProfileTalentComponent {
  @Input() userData!: UserInterface
  @Input() openPopup: any
}
