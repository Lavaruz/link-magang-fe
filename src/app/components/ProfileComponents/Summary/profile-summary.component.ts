import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';

@Component({
  selector: 'app-profile-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="w-full border border-main rounded-2xl bg-white noise overflow-hidden shadow-lg mt-4">
      <div class="flex justify-between py-4 px-8 bg-main">
          <p class="text-sm font-medium text-background flex items-center gap-2"><i class="uil uil-bag"></i>PROFILE SUMMARY</p>
          <button (click)="openPopup('summary')" class="text-sm text-background flex items-center gap-2"><i class="uil uil-pen"></i>Edit</button>
      </div>
      <div class="py-4 pb-8 px-8">
          <!-- <p class="text-black/80">{{USER.summary}}</p> -->
          <div *ngIf="userData.summary == null" class="flex flex-col text-center justify-center py-4">
              <p class="font-bold">Tambahkan tentang kamu disini!</p>
              <p class="text-black/80 w-[85%] mx-auto mt-1">Ini adalah kesempatanmu untuk menyampaikan tentang dirimu, sehingga orang lain dapat melihat sekilas Anda sebagai kandidat.</p>
              <button (click)="openPopup('summary')" type="button" class="text-white bg-main/90 w-max mx-auto px-6 py-1.5 rounded mt-4 flex items-center gap-2"><i class="uil uil-plus"></i>Add Profile Summary</button>
          </div>
          <div *ngIf="userData.summary" class="">
              <p class="text-black/80" style="white-space: pre-line;">{{userData.summary}}</p>
          </div>
      </div>
    </section>
  `,
})
export class ProfileSummaryComponent {
  @Input() userData!: UserInterface
  @Input() openPopup: any
}
