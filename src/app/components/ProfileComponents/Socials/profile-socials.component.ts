import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';

@Component({
  selector: 'app-profile-socials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="socials bg-white border-main border-2 noise rounded-2xl p-4 pb-5 shadow-md">
        <div class="w-100 flex items-center justify-between rounded-t-2xl">
            <p class="text-main flex items-center gap-2"><i class="uil uil-share"></i> SOSIAL</p>
            <p (click)="openPopup('socials')" id="edit-socials" class="cursor-pointer text-main text-sm font-second flex items-center gap-2">Edit</p>
        </div>
        <p class="font-second text-sm font-semibold text-black/80 mt-3 mb-4">Buat semua orang lebih mudah mengenali tentang kamu!</p>
        <div id="" class="socials flex items-center gap-4 text-thrid/80 text-2xl">
            <a id="" *ngIf="userData.socials.twitter" [href]="userData.socials.twitter" target="_blank" rel="noopener"><i class="uil uil-twitter"></i></a>
            <a id="" *ngIf="userData.socials.instagram" [href]="userData.socials.instagram" target="_blank" rel="noopener"><i class="uil uil-instagram-alt"></i></a>
            <a id="" *ngIf="userData.socials.linkedin" [href]="userData.socials.linkedin" target="_blank" rel="noopener"><i class="uil uil-linkedin"></i></a>
            <a id="" *ngIf="userData.socials.behance" [href]="userData.socials.behance" target="_blank" rel="noopener"><i class="uil uil-behance"></i></a>
            <a id="" *ngIf="userData.socials.github" [href]="userData.socials.github" target="_blank" rel="noopener"><i class="uil uil-github"></i></a>
            <a id="" *ngIf="userData.socials.youtube" [href]="userData.socials.youtube" target="_blank" rel="noopener"><i class="uil uil-youtube"></i></a>
        </div>
    </div>
  `,
})
export class ProfileSocialsComponent {
  @Input() userData!: UserInterface
  @Input() openPopup: any
}
