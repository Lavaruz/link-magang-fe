import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';

@Component({
  selector: 'app-profile-basic-information',
  standalone: true,
  imports: [],
  template: `
    <section class="w-full border border-main rounded-2xl bg-white noise overflow-hidden shadow-lg">
      <div class="flex justify-between py-4 px-8 bg-main">
          <p class="text-sm font-medium text-background flex items-center gap-2"><i class="uil uil-user"></i>BASIC INFORMATION</p>
          <button (click)="openPopup('basic')" class="text-sm text-background flex items-center gap-2"><i class="uil uil-pen"></i>Edit</button>
      </div>
      @if(userData){
          <div class="flex gap-6 py-6 px-8">
              <!-- PROFILE PICTURE -->
              <div class="max-w-20 w-20 overflow-hidden min-w-20 max-h-20 h-20 min-h-20 rounded-full bg-main">
                  <img [src]="userData.profile_picture" alt="{{userData.firstname}} photo profile">
              </div>

              <!-- MAIN BASIC INFORMATION -->
              <div class="w-full">
                  <!-- USERNAME AND PROFILE BADGE -->
                  <div class="">
                      <div class="flex items-center gap-2">
                          <p class="text-2xl font-bold">{{userData.firstname}} {{userData.lastname ? userData.lastname : ""}}</p>
                          <span class="bg-gradient-to-tr from-green-400 to-amber-500 text-xs text-white font-medium me-2 px-2.5 py-0.5 rounded">Founder</span>
                      </div>
                      <p class="text-black/60">Backend Developer at Enviromate Technology International</p>
                  </div>

                  <hr class="my-4">

                  <!-- ADDITIONAL INFORMATION -->
                  <div class="flex flex-col gap-4">
                      <div class="flex items-center gap-12">
                          <div class="">
                              <p class="text-sm text-black/60 font-medium">EMAIL</p>
                              <p class="text-black/80">{{userData.email}}</p>
                          </div>
                      </div>

                      <div class="grid grid-cols-2 gap-y-4">
                          <div class="">
                              <p class="text-sm text-black/60 font-medium">MOBILE</p>
                              <p class="text-black/80">{{userData.mobile ? userData.mobile : "no data"}}</p>
                          </div>
                          <div class="">
                              <p class="text-sm text-black/60 font-medium">BIRTHDAY</p>
                              <p class="text-black/80">{{userData.date_of_birth ? userData.date_of_birth : "no data"}}</p>
                          </div>

                          <div class="">
                              <p class="text-sm text-black/60 font-medium">SEX</p>
                              <p class="text-black/80">{{userData.sex ? userData.sex : "no data"}}</p>
                          </div>
                          <div class="">
                              <p class="text-sm text-black/60 font-medium">DOMICILE</p>
                              <p class="text-black/80">{{userData.domicile ? userData.domicile : "no data"}}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      }
  </section>
  `
})
export class ProfileBasicInformationComponent implements OnInit {
  @Input() userData!:UserInterface
  @Input() openPopup:any  

  ngOnInit() {
    
  }
}
