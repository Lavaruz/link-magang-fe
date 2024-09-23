import { Component, inject, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { UtilsService } from '../../../services/utils.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-basic-information',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="basic-info rounded-2xl overflow-hidden shadow-md border-2 border-main">
        <div class="lg:w-100 bg-main flex items-center justify-between px-5 py-3">
            <p class="text-white flex items-center gap-2"><i class="uil uil-info-circle"></i> PROFIL SINGKAT</p>
            <button (click)="openPopup('basic')" id="edit-basic-info" class="cursor-pointer text-white text-sm font-second flex items-center gap-2">Edit</button>
        </div>
        <div class="lg:w-100 p-5 pb-6 bg-white noise lg:rounded-none border-2 lg:border-0 border-header">
            <div class="lg:flex lg:items-start lg:gap-5">
                <div class="w-[88px] h-[88px] min-w-[88px] min-h-[88px] rounded-full overflow-hidden mx-auto lg:mx-0">
                    <img id="basic-profile-pic" src="{{userData.profile_picture}}" onerror="src='assets/img/no-profile.jpg'" alt="profile-picture" class="w-full h-full object-cover">
                </div>
                <div class="w-full">
                    <div class="mb-4 text-center lg:text-left">
                        <p id="basic-fullname" class="font-bold text-xl text-main">
                            {{userData.firstname}} {{userData.lastname || ""}}
                            <i *ngIf="userData.sex === 'Male'" class="uil uil-mars text-blue-500"></i>
                            <i *ngIf="userData.sex === 'Female'" class="uil uil-venus text-pink-500"></i>
                        </p>
                        <p id="basic-headline" class="text-sm text-thrid/60 font-medium">{{userData.headline || ""}}</p>
                    </div>
                    <hr>
                    <div class="grid grid-cols-2 w-full gap-3 pt-4 text-white">
                        <div class="col-span-2">
                            <span class="text-thrid/60 font-medium text-sm">EMAIL</span>
                            <p id="basic-email" class="text-second/80 font-second font-medium text-sm">{{userData.email || "-"}}</p>
                        </div>
                        <div class="">
                            <span class="text-thrid/60 font-medium text-sm">NO HP</span>
                            <p id="basic-mobile" class="text-second/80 font-second font-medium text-sm">{{userData.mobile || "-"}}</p>
                        </div>
                        <div class="">
                            <span class="text-thrid/60 font-medium text-sm">TANGGAL LAHIR</span>
                            <p id="basic-birthdate" class="text-second/80 font-second font-medium text-sm">{{ utilsService.formatIndonesianDateFull(userData.date_of_birth) || "-"}}</p>
                        </div>
                        <div class="">
                            <span class="text-thrid/60 font-medium text-sm">DOMISILI</span>
                            <p id="basic-domicile" class="text-second/80 font-second font-medium text-sm">{{userData.domicile || "-"}}</p>
                        </div>
                        <div class="">
                            <span class="text-thrid/60 font-medium text-sm">PREFERENSI KERJA</span>
                            <p id="basic-pref-status" class="text-second/80 font-second font-medium text-sm">{{userData.work_pref_status}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `
})
export class ProfileBasicInformationComponent implements OnInit {
  @Input() userData!:UserInterface
  @Input() openPopup:any  

  utilsService = inject(UtilsService)

  ngOnInit(): void {
      console.log(this.userData);
      
  }
}
