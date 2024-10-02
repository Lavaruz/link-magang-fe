import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RequestService } from '../../../services/request.service';
import $ from "jquery"

@Component({
  selector: 'app-profile-basic-information-popup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOptimizedImage],
  template: `
    <div class="hidden popup popup-basic border-2 border-main w-full lg:w-[720px] rounded-2xl lg:rounded-2xl overflow-hidden">
      <form id="form-basic-information" [formGroup]="formBasic" (submit)="submitBasic()">
          <div class="hidden lg:flex header bg-main justify-between px-5 py-3 items-center">
              <p class="font-normal text-white text-base tracking-[1.6px] flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10.0002 10C9.0835 10 8.29877 9.67362 7.646 9.02084C6.99322 8.36807 6.66683 7.58334 6.66683 6.66668C6.66683 5.75001 6.99322 4.96529 7.646 4.31251C8.29877 3.65973 9.0835 3.33334 10.0002 3.33334C10.9168 3.33334 11.7016 3.65973 12.3543 4.31251C13.0071 4.96529 13.3335 5.75001 13.3335 6.66668C13.3335 7.58334 13.0071 8.36807 12.3543 9.02084C11.7016 9.67362 10.9168 10 10.0002 10ZM5.00016 16.6667C4.54183 16.6667 4.14947 16.5035 3.82308 16.1771C3.49669 15.8507 3.3335 15.4583 3.3335 15V14.3333C3.3335 13.8611 3.45502 13.4271 3.69808 13.0313C3.94113 12.6354 4.26405 12.3333 4.66683 12.125C5.52794 11.6945 6.40294 11.3715 7.29183 11.1563C8.18072 10.941 9.0835 10.8333 10.0002 10.8333C10.9168 10.8333 11.8196 10.941 12.7085 11.1563C13.5974 11.3715 14.4724 11.6945 15.3335 12.125C15.7363 12.3333 16.0592 12.6354 16.3022 13.0313C16.5453 13.4271 16.6668 13.8611 16.6668 14.3333V15C16.6668 15.4583 16.5036 15.8507 16.1772 16.1771C15.8509 16.5035 15.4585 16.6667 15.0002 16.6667H5.00016Z" fill="white"/>
              </svg> MENGEDIT INFORMASI BASIC</p>
              <button (click)="closePopup('basic')" type="button" class="close-x cursor-pointer font-second font-medium text-sm text-teal-100">Close x</button>
          </div>

          <div class="relative body bg-background noise lg:bg-body h-[85vh] lg:h-[500px] overflow-y-scroll">
              <!-- BASIC INPUT -->
              <div *ngIf="isDisplay" id="basic-input" class="divide-y divide-gray-300">
                  <!-- PROFILE PICTURE HANDLE -->
                  <div class="p-5">
                      <p class="font-bold text-xl lg:text-lg text-main mb-3">Foto Profil</p>
                      <div class="flex items-center gap-5">
                          <div class="min-w-[88px] max-w-[88px] min-h-[88px] max-h-[88px] rounded-full overflow-hidden border-2 border-main bg-main">
                              <img width="88" height="88" id="popup-profile-pic" ngSrc="{{userData.profile_picture}}" onerror="ngSrc='assets/img/no-profile.jpg'" alt="profile-pic" class="w-full h-full object-cover">
                          </div>
                          <div class="">
                              <div class="">
                                  <p class="text-white-60 font-second text-sm font-medium mb-2">Pilih foto profil yang paling menampilkan personamu.<br>
                              </div>
                              <button (click)="isDisplay = false; isPicture = true" id="button-choose-profile-pic" type="button" class="flex items-center gap-1 bg-main text-white text-sm py-2 px-4 rounded-lg">Pilih foto profil</button>
                          </div>
                      </div>
                  </div>

                  <!-- BASIC INFORMATION, EMAIL, FIRSTNAME, LASTNAME, DLL -->
                  <div class="p-5">
                      <p class="font-bold text-xl lg:text-lg text-main mb-3">Informasi Basic</p>
                      <div class="lg:flex gap-5 mb-4">
                          <label class="block">
                              <label class="block mb-1 text-white-60 tracking-[1.4px] font-normal text-sm">NAMA DEPAN</label>
                              <input formControlName="firstname" id="popup-firstname" type="text" name="firstname" placeholder="Ex. Assami" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder:text-black/40 text-black/80"/>
                          </label>
                          <label class="block mt-4 lg:mt-0">
                              <label class="block mb-1 text-white-60 tracking-[1.4px] font-normal text-sm">NAMA BELAKANG</label>
                              <input formControlName="lastname" id="popup-lastname" type="text" name="lastname" placeholder="Ex. Muzaki" class="block border-2 border-gray-300 w-full lg:w-[280px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder:text-black/40 text-black/80"/>
                          </label>
                      </div>

                      <div class="">
                          <label class="block mt-4 lg:mt-0">
                              <label class="block mb-1 text-white-60 tracking-[1.4px] font-normal text-sm">HEADLINE</label>
                              <input maxlength="50" max="50" formControlName="headline" id="popup-headline" type="text" name="headline" placeholder="Founder | Backend Developer" class="block border-2 border-gray-300 w-full lg:w-[380px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder:text-black/40 text-black/80"/>
                          </label>
                      </div>

                      <div class="lg:flex gap-5  mt-4">
                          <label class="block">
                              <label class="block mb-1 text-white-60 tracking-[1.4px] font-normal text-sm">DOMISILI</label>
                              <input formControlName="domicile" id="popup-domicile" type="text" name="domicile" placeholder="Ex. Jakarta" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder:text-black/40 text-black/80"/>
                          </label>
                          <label class="block mt-4 lg:mt-0">
                              <label class="block mb-1 text-white-60 tracking-[1.4px] font-normal text-sm">TANGGAL LAHIR</label>
                              <input formControlName="date_of_birth" id="popup-birthdate" type="date" name="date_of_birth" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder:text-black/40 text-black/80"/>
                          </label>
                      </div>
                      <label class="block mt-4">
                          <label class="block mb-1 text-white-60 tracking-[1.4px] font-normal text-sm">KELAMIN</label>
                          <div class="flex gap-4 w-max rounded-xl px-4 bg-main">
                              <div class="flex items-center gap-3 lg:justify-between rounded-lg px-4 lg:px-3 py-4 lg:py-2.5 bg-darkest-grey lg:w-max w-full">
                                  <input [checked]="userData.sex == 'Male'" formControlName="sex" id="Male" type="radio" value="Male" name="sex" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                  <label for="Male" class="text-white font-second text-xs font-medium">Laki Laki</label>
                              </div>
                              <div class="flex items-center gap-3 lg:justify-between rounded-lg px-4 lg:px-3 py-4 lg:py-2.5 bg-darkest-grey lg:w-max w-full">
                                  <input [checked]="userData.sex == 'Female'" formControlName="sex" id="Female" type="radio" value="Female" name="sex" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                  <label for="Female" class="text-white font-second text-xs font-medium">Perempuan</label>
                              </div>
                          </div>
                      </label>
                  </div>

                  <div class="p-5">
                      <p class="font-bold text-xl lg:text-lg text-main mb-3">Kontak Informasi</p>
                      <div class="lg:flex gap-5">
                          <label class="block">
                              <label class="block mb-1 text-white-60 tracking-[1.4px] font-normal text-sm">EMAIL</label>
                              <input [value]="userData.email" id="popup-email" type="text" name="email" disabled title="Email address cannot be updated" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder:text-black/40 text-black/80"/>
                          </label>
                          <label class="block mt-4 lg:mt-0">
                              <label class="block mb-1 text-white-60 tracking-[1.4px] font-normal text-sm">NO HANDPHONE</label>
                              <input formControlName="mobile" id="popup-mobile" type="text" name="mobile" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder:text-black/40 text-black/80"/>
                          </label>
                      </div>
                  </div>

                  <div class="p-5 pb-40 lg:pb-6">
                      <p class="font-bold text-xl lg:text-lg text-main mb-3">Preferensi Pekerjaan</p>
                      <div class="lg:flex gap-5">
                          <label class="block">
                              <span class="text-white-60 tracking-[1.4px] font-normal text-sm">STATUS PEKERJAAN*</span>
                              <select formControlName="work_pref_status" required id="popup-pref-status" name="work_pref_status" class="block border-2 border-gray-300 w-full lg:w-[300px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80 focus:ring-white">
                                  <option selected value="WFO">Work From Office (WFO)</option>
                                  <option value="WFH">Work From Home (WFH)</option>
                                  <option value="WFA">Work From Anywhere (WFA)</option>
                              </select>
                          </label>
                      </div>
                      <div class="lg:flex gap-5 mb-14 pt-4">
                          <label class="block">
                              <span class="text-white-60 tracking-[1.4px] font-normal text-sm">EKSPEKTASI GAJI*</span>
                              <input formControlName="salary" id="popup-salary" type="text" value="0" name="salary" class="block border-2 border-gray-300 w-full lg:w-[280px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder:text-black/40 text-black/80"/>
                          </label>
                      </div>
                      <div class="fixed lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                          <button type="button" (click)="closePopup('basic')" class="close-x rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Tutup</button>
                          <button type="submit" class="lg:rounded-lg w-full lg:w-max bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Simpan</button>
                      </div>
                  </div>
              </div>

              <!-- IMAGE INPUT -->
              <div *ngIf="isPicture && DONE_LOADING" id="image-input" class="p-6">
                  <div class="">
                      <p class="text-main text-2xl font-medium">Pilih personamu: </p>
                      <p class="text-black/70">Semua gambar dibawah tersedia pada <a href="https://www.openpeeps.com/" class="text-main">open peeps.</a></p>
                  </div>
                  <hr class="my-4">
                  <div id="images" class="grid grid-cols-3 lg:grid-cols-5 gap-4 h-[500px] pb-28 lg:pb-0 lg:h-[300px] overflow-y-scroll">
                      @for(picture of PICTURES_DATA; track picture){
                        <div (click)="selectPicture(picture)" class="text-center">
                            <button #avatar [ngClass]="{'bg-main': selectedPicture === picture}" type="button" class="button-select-avatar aspect-square border-2 shadow-md border-main rounded-full overflow-hidden">
                                <img width="88" height="88" ngSrc="{{requestService.getURL() + picture}}" alt="profile-pic" class="w-full h-full object-cover">
                            </button>
                            <p class="text-main font-bold">{{picture.split("/img/ProfilePic/").pop().replace(".webp", "")}}</p>
                        </div>
                      }
                  </div>
                  <div class="fixed lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                      <button (click)="isDisplay = true; isPicture = false" type="button" class="back-basic rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Batal</button>
                      <button type="submit" class="lg:rounded-lg w-full lg:w-max bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Simpan</button>
                  </div>
              </div>
          </div>
      </form>
  </div>
  `
})
export class ProfileBasicInformationPopupComponent {
  @Input() userData!:UserInterface
  @Input() closePopup: any
  @Output() userDataUpdated = new EventEmitter<string>()
  
  imagePreview: string = "";
  isDisplay = true
  isPicture = false
  PICTURES_DATA:any
  DONE_LOADING = false

  userService = inject(UserService)
  requestService = inject(RequestService)

  formBasic!:FormGroup
  selectedPicture: string | null = null; // Variable to track the selected picture

  selectPicture(picture: string) {
    this.selectedPicture = picture;
  }

  ngOnInit(): void {
    this.formBasic = new FormGroup({
      profile_picture: new FormControl(this.userData.profile_picture),
      firstname: new FormControl(this.userData.firstname),
      lastname: new FormControl(this.userData.lastname),
      headline: new FormControl(this.userData.headline),
      email: new FormControl(this.userData.email),
      domicile: new FormControl(this.userData.domicile),
      date_of_birth: new FormControl(this.userData.date_of_birth),
      sex: new FormControl(this.userData.sex),
      mobile: new FormControl(this.userData.mobile),
      work_pref_status: new FormControl(this.userData.work_pref_status),
      salary: new FormControl(this.userData.salary),
    })

    this.userService.GetAllProfilePictureAvailable().then(picturesData => {
        this.PICTURES_DATA = picturesData
        this.DONE_LOADING = true
    })
  }

  selectedAvatar(element:any){
    $(".button-select-avatar").each(function(){
        $(this).removeClass("bg-main")
    })
    $(element).addClass("bg-main")
  }

    submitBasic() {
        const basicData = this.formBasic.value;
        if(this.selectedPicture){
            basicData.profile_picture = `${this.requestService.getURL()}${this.selectedPicture}`
        }

        this.userService.updateUserData(basicData)
        .then(() => {
            this.closePopup("basic");
            this.isDisplay = true
            this.isPicture = false
            this.userDataUpdated.emit()
        })
        .catch((e) => {
            alert("ERROR");
            console.log(e);
        });
    }

}
