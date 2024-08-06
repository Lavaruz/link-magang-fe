import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { CommonModule } from '@angular/common';
import { ExperienceInterface } from '../../../interface/experience.interface';
import { EducationInterface } from '../../../interface/education.interface';

@Component({
  selector: 'app-profile-educations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="w-full border border-main rounded-2xl bg-white noise overflow-hidden shadow-lg mt-4">
      <div class="flex justify-between py-4 px-8 bg-main">
          <p class="text-sm font-medium text-background flex items-center gap-2"><i class="uil uil-bag"></i>EXPERIENCES</p>
          <button (click)="openPopup('summary')" class="text-sm text-background flex items-center gap-2"><i class="uil uil-pen"></i>Edit</button>
      </div>
      <div class="py-4 pb-8 px-8">
          <!-- <p class="text-black/80">{{USER.summary}}</p> -->
          <div *ngIf="educationsData.length <= 0" class="flex flex-col text-center justify-center py-4">
              <p class="font-bold">Tambahkan pendidikan kamu disini!</p>
              <p class="text-black/80 w-[85%] mx-auto mt-1">Inti dari profil Anda. Anda dapat menambahkan pengalaman apa pun dari organisasi universitas, panitia acara, magang, dan banyak lagi!</p>
              <button (click)="openPopup('summary')" type="button" class="text-white bg-main/90 w-max mx-auto px-6 py-1.5 rounded mt-4 flex items-center gap-2"><i class="uil uil-plus"></i>Tambah Pendidikan</button>
          </div>

          <!-- KETIKA EXPERIENCES TIDAK KOSONG -->
          <div *ngIf="educationsData.length > 0" class="">
            <div class="w-full py-4">
                <!-- HEAD -->
                <div class="flex justify-between items-start">
                  <div class="">
                    <div class="flex items-center gap-2">
                      <p class="mb-1 text-sm bg-main/60 px-2 w-max text-white">BACHELOR DEGREE</p>
                      <p class="mb-1 text-sm bg-gray-200 px-2 w-max text-black/80">IPK 3.72</p>
                    </div>
                    <p class="text-xl font-semibold">Computer Science</p>
                    <div class="flex items-center gap-1 text-black/70">
                      <p>Universitas Indonesia</p>
                      <p>•</p>
                      <p>Jakarta</p>
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
export class ProfileEducationsComponent implements OnInit {
  @Input() userData!:UserInterface
  @Input() educationsData!:EducationInterface[]
  @Input() openPopup:any

  ngOnInit(): void {
    console.log(this.educationsData);
    
  }
  
}
