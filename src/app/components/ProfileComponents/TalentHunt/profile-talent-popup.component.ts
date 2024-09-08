import { Component, inject, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-talent-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="hidden popup popup-active-search border-2 border-main w-full lg:w-[720px] rounded-2xl overflow-hidden">
      <div class="hidden header bg-main lg:flex justify-between px-5 py-3 items-center">
          <p class="font-normal text-white text-base tracking-[1.6px] flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9.58333 18.3333C8.30556 18.3333 7.22222 17.8889 6.33333 17C5.44444 16.1111 5 15.0278 5 13.75V4.99999C5 4.08332 5.32639 3.2986 5.97917 2.64582C6.63194 1.99305 7.41667 1.66666 8.33333 1.66666C9.25 1.66666 10.0347 1.99305 10.6875 2.64582C11.3403 3.2986 11.6667 4.08332 11.6667 4.99999V12.9167C11.6667 13.5 11.4653 13.993 11.0625 14.3958C10.6597 14.7986 10.1667 15 9.58333 15C9 15 8.50694 14.7986 8.10417 14.3958C7.70139 13.993 7.5 13.5 7.5 12.9167V5.62499C7.5 5.44443 7.55903 5.29513 7.67708 5.17707C7.79514 5.05902 7.94444 4.99999 8.125 4.99999C8.30556 4.99999 8.45486 5.05902 8.57292 5.17707C8.69097 5.29513 8.75 5.44443 8.75 5.62499V12.9167C8.75 13.1528 8.82986 13.3507 8.98958 13.5104C9.14931 13.6701 9.34722 13.75 9.58333 13.75C9.81944 13.75 10.0174 13.6701 10.1771 13.5104C10.3368 13.3507 10.4167 13.1528 10.4167 12.9167V4.99999C10.4167 4.41666 10.2153 3.9236 9.8125 3.52082C9.40972 3.11805 8.91667 2.91666 8.33333 2.91666C7.75 2.91666 7.25694 3.11805 6.85417 3.52082C6.45139 3.9236 6.25 4.41666 6.25 4.99999V13.75C6.25 14.6667 6.57639 15.4514 7.22917 16.1042C7.88194 16.7569 8.66667 17.0833 9.58333 17.0833C10.5 17.0833 11.2847 16.7569 11.9375 16.1042C12.5903 15.4514 12.9167 14.6667 12.9167 13.75V5.62499C12.9167 5.44443 12.9757 5.29513 13.0938 5.17707C13.2118 5.05902 13.3611 4.99999 13.5417 4.99999C13.7222 4.99999 13.8715 5.05902 13.9896 5.17707C14.1076 5.29513 14.1667 5.44443 14.1667 5.62499V13.75C14.1667 15.0278 13.7222 16.1111 12.8333 17C11.9444 17.8889 10.8611 18.3333 9.58333 18.3333Z" fill="white"/>
            </svg>MENGEDIT VISIBILITAS TALENT HUNT</p>
          <p (click)="closePopup('active-search')" class="close-x cursor-pointer font-second font-medium text-sm text-teal-100">Close x</p>
      </div>
      <div class="body bg-background noise lg:bg-body h-[92vh] lg:h-[350px] overflow-y-scroll">
          <form id="form-edit-active-information" class="relative">
              <div class="divide-y divide-header pb-12 lg:pb-0">
                  <div class="p-5">
                      <button type="button" class="lg:hidden my-4 mb-6 flex items-center gap-2 close-x text-main font-medium font-second text-base">
                          <i class="uil uil-arrow-left"></i> Kembali ke Profil
                      </button>
                      <p class="font-bold text-lg text-main mb-1">Visibilitas Talent Hunt</p>
                      <p class="text-black/80 text-sm font-second font-medium">Mendeklarasikan dirimu aktif di talent hunt artinya profilmu akan dapat dikunjungi, dan dilihat oleh orang lain.</p>
                      <p class="text-red-500 text-xs font-second font-medium mt-2">*Visbilitas akan menjadi nonaktif, setiap kamu melakukan update profile</p>
                  </div>
                  <div class="lg:hidden gap-6 p-5">
                      <button class="text-main text-sm font-medium text-left flex items-center gap-2"><i id="active-profile-picture" class="uil uil-times text-lg text-red-500"></i>Tambahkan Foto Profile</button>
                      <button class="text-main text-sm font-medium text-left flex items-center gap-2"><i id="active-profile-skills" class="uil uil-times text-lg text-red-500"></i>Tambahkan Keahlian</button>
                      <button class="text-main text-sm font-medium text-left flex items-center gap-2"><i id="active-educations" class="uil uil-times text-lg text-red-500"></i>Tambahkan Pendidikan</button>
                      <button class="text-main text-sm font-medium text-left flex items-center gap-2"><i id="active-cv" class="uil uil-times text-lg text-red-500"></i>Tambahkan Curriculum Vitae (CV)</button>
                  </div>
                  <div class="divide-y divide-header px-5 pb-6 flex flex-col lg:items-center">
                      <div class="my-6">
                          <div class="flex flex-col lg:items-center mt-4">
                              <label class="relative block inline-flex items-center cursor-pointer">
                                  <input id="show-phone" name="show_phone" type="checkbox" value="" class="sr-only peer">
                                  <div class="w-11 h-6 bg-red-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                  <span id="active-search-status" class="ml-2 text-green-500 font-second text-sm font-semibold">Sembunyikan <span class="font-bold text-red-500">Nomor Handphone</span>.</span>
                              </label>
                          </div>
                          <button id="declare-active-search" disabled class="w-full lg:w-max disabled:opacity-60 shadow-md mx-auto flex items-start gap-1 bg-main text-white rounded-lg text-sm py-4 lg:py-2 px-4 mt-6">Aktifkan kartu Talent Hunt</button>
                          <button id="stop-active-search" class="w-full lg:w-max disabled:opacity-60 shadow-md mx-auto flex items-start gap-1 bg-red-600 text-white rounded-lg text-sm py-4 lg:py-2 px-4 mt-6">Berhenti menampilkan kartu</button>
                          <p id="visibilitas-desc" class="text-black/60 text-xs mt-1 text-center">*Lengkapi profilmu untuk sebelum mengaktifkan visibilitas</p>
                      </div>
                      <div class="hidden lg:flex gap-6 pt-5">
                          <button class="text-main text-sm font-medium text-left flex items-center gap-2"><i id="active-profile-picture" class="uil uil-times text-lg text-red-500"></i>Tambahkan Foto Profile</button>
                          <button class="text-main text-sm font-medium text-left flex items-center gap-2"><i id="active-profile-skills" class="uil uil-times text-lg text-red-500"></i>Tambahkan Keahlian</button>
                          <button class="text-main text-sm font-medium text-left flex items-center gap-2"><i id="active-educations" class="uil uil-times text-lg text-red-500"></i>Tambahkan Pendidikan</button>
                          <button class="text-main text-sm font-medium text-left flex items-center gap-2"><i id="active-cv" class="uil uil-times text-lg text-red-500"></i>Tambahkan Curriculum Vitae (CV)</button>
                      </div>
                  </div>
              </div>
          </form>
      </div>
  </div>
  `,
  styles: ``
})
export class ProfileTalentPopupComponent implements OnInit {
  
  userService = inject(UserService)

  @Input() closePopup: any
  @Input() userData!: UserInterface
  formSummary = new FormGroup({
    summary: new FormControl("")
  })

  ngOnInit(): void {
    this.formSummary.controls['summary'].setValue(this.userData.summary)
  }

  submitSummary(){
    const summaryData = this.formSummary.value
    if(summaryData.summary){
      this.userData.summary = summaryData.summary
      this.userService.updateUserData(summaryData)
      .then(() => {
        this.closePopup("summary")
      })
      .catch((e) => {
        alert(e.error.message)
        console.log(e)
      })
    }
  }
}
