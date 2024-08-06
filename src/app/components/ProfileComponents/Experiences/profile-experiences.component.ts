import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { CommonModule } from '@angular/common';
import { ExperienceInterface } from '../../../interface/experience.interface';

@Component({
  selector: 'app-profile-experiences',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="w-full border border-main rounded-2xl bg-white noise overflow-hidden shadow-lg mt-4">
      <div class="flex justify-between py-4 px-8 bg-main">
          <p class="text-sm font-medium text-background flex items-center gap-2"><i class="uil uil-bag"></i>EXPERIENCES</p>
          <button (click)="openPopup('experience')" class="text-sm text-background flex items-center gap-2"><i class="uil uil-pen"></i>Edit</button>
      </div>
      <div class="py-4 pb-8 px-8">
          <!-- <p class="text-black/80">{{USER.summary}}</p> -->
          <div *ngIf="experiencesData.length <= 0" class="flex flex-col text-center justify-center py-4">
              <p class="font-bold">Tambahkan pengalaman kamu disini!</p>
              <p class="text-black/80 w-[85%] mx-auto mt-1">Ini adalah kesempatan Anda untuk menyampaikan kabar baik tentang diri Anda, sehingga perekrut dapat melihat sekilas Anda sebagai kandidat.</p>
              <button (click)="openPopup('experience')" type="button" class="text-white bg-main/90 w-max mx-auto px-6 py-1.5 rounded mt-4 flex items-center gap-2"><i class="uil uil-plus"></i>Tambah Pengalaman</button>
          </div>

          <!-- KETIKA EXPERIENCES TIDAK KOSONG -->
          <div *ngIf="experiencesData.length > 0" class="">
            <div class="w-full py-4">
                <!-- HEAD -->
                <div class="flex justify-between items-start">
                  <div class="">
                    <p class="mb-1 text-sm bg-main/60 px-2 w-max text-white">SELF EMPLOYE</p>
                    <p class="text-xl font-semibold">Chief Technology Officer</p>
                    <div class="flex items-center gap-1 text-black/70">
                      <p>Internshit</p>
                      <p>•</p>
                      <p>Full-Time</p>
                      <p>•</p>
                      <p>Hybrid (Jakarta)</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm">Nov 2023 - Now</p>
                    <p class="text-xs text-black/60">8 MONTH</p>
                  </div>
                </div>
                <!-- BODY -->
                <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium eum fugiat architecto recusandae reiciendis ratione accusamus tempore libero ad voluptas odio eligendi, consequatur tenetur non est ea repudiandae vitae!</p>
            </div>
          </div>
      </div>
    </section>
  `,
})
export class ProfileExperiencesComponent implements OnInit {
  @Input() userData!:UserInterface
  @Input() experiencesData!:ExperienceInterface[]
  @Input() openPopup:any

  ngOnInit(): void {
    
  }

}
