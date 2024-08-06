import { Component, inject, Input } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import $ from "jquery"

@Component({
  selector: 'app-profile-basic-information-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="hidden popup popup-basic border-2 border-header w-full lg:w-[720px] rounded-t-2xl lg:rounded-2xl overflow-hidden">
      <div class="hidden lg:flex header bg-main justify-between px-5 py-3 items-center">
          <p class="font-normal text-white text-base tracking-[1.6px] flex items-center gap-2">EDITING BASIC INFORMATION</p>
          <p class="close-x cursor-pointer font-second font-medium text-sm text-teal-100">Close x</p>
      </div>

      <div class="relative body bg-background noise lg:bg-body divide-y divide-main h-[92vh] lg:h-[500px] overflow-y-scroll p-5">
        <form [formGroup]="formBasic" (submit)="submitBasic()">
          <!-- UPLOAD PROFILE PICTURE -->
          <div class="py-5">
              <p class="font-bold text-xl lg:text-lg text-main mb-3">Profile Picture</p>
              <div class="flex items-center gap-5">
                  <div class="min-w-[88px] max-w-[88px] min-h-[88px] max-h-[88px] rounded-full overflow-hidden">
                      <img id="popup-profile-pic" [src]="userData.profile_picture" onerror="this.src='assets/images/no-profile.jpg'" alt="{{userData.firstname}} profile-picture" class="w-full h-full object-cover">
                  </div>

                  <div class="">
                      <div class="hidden lg:block">
                          <p class="text-white-60 font-second text-sm font-medium mb-2">Make sure your profile picture is professional and shows your face clearly.<br>
                          <span class="text-main">Maximum file size is 1 MB.</span></p>
                      </div>
                      <label for="custom-input-file">
                          <input #fileUplaoder type="file" id="custom-input-file" class="hidden" accept="image/*"/>
                          <button (click)="fileUplaoder.click()" type="button" class="flex items-center gap-1 bg-main text-white py-2 px-4 rounded-lg">Upload Profile Picture</button>
                      </label>
                  </div>
              </div>
          </div>

          <div class="py-5">
              <p class="font-bold text-xl lg:text-lg text-main mb-3">Basic Information</p>
              <div class="lg:flex gap-5 mb-4">
                  <label class="block">
                      <label class="text-white-60 block tracking-[1.4px] font-normal text-sm">FIRST NAME</label>
                      <input formControlName="firstname" type="text" class="block border-0 w-full border-2 border-gray-300 lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/60 text-black/80"/>
                  </label>
                  <label class="block mt-4 lg:mt-0">
                      <label class="text-white-60 block tracking-[1.4px] font-normal text-sm">LAST NAME</label>
                      <input formControlName="lastname" type="text" class="block border-0 w-full border-2 border-gray-300 lg:w-[280px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/60 text-black/80"/>
                  </label>
              </div>
              <div class="lg:flex gap-5">
                  <label class="block">
                      <label class="text-white-60 block tracking-[1.4px] font-normal text-sm">DOMICILE</label>
                      <input formControlName="domicile" type="text" class="block border-0 w-full border-2 border-gray-300 lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/60 text-black/80"/>
                  </label>
                  <label class="block mt-4 lg:mt-0">
                      <label class="text-white-60 block tracking-[1.4px] font-normal text-sm">DATE OF BIRTH</label>
                      <input formControlName="date_of_birth" type="date"class="block border-0 w-full border-2 border-gray-300 lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/60 text-black/80"/>
                  </label>
              </div>
              <label class="block mt-4">
                  <label class="text-white-60 block tracking-[1.4px] font-normal text-sm">SEX</label>
                  <div class="flex gap-4 w-full">
                      <div class="flex items-center gap-3 lg:justify-between rounded-lg px-4 lg:px-3 py-4 lg:py-2.5 bg-darkest-grey lg:w-max w-full">
                          <input formControlName="sex" value="Male" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                          <label for="male" class="text-main font-second text-sm font-medium">Male</label>
                      </div>
                      <div class="flex items-center gap-3 lg:justify-between rounded-lg px-4 lg:px-3 py-4 lg:py-2.5 bg-darkest-grey lg:w-max w-full">
                          <input formControlName="sex" value="Female" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                          <label for="female" class="text-main font-second text-sm font-medium">Female</label>
                      </div>
                  </div>
              </label>
          </div>
  
          <div class="py-5 pb-40 lg:pb-5">
              <p class="font-bold text-xl lg:text-lg text-main mb-3">Contact Information</p>
              <div class="lg:flex gap-5 mb-4">
                  <label class="block">
                      <span class="text-main-60 tracking-[1.4px] font-normal text-sm">EMAIL</span>
                      <input formControlName="email" type="text" readonly title="Email address cannot be updated" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/60 text-black/80"/>
                  </label>
                  <label class="block mt-4 lg:mt-0">
                      <span class="text-white-60 tracking-[1.4px] font-normal text-sm">MOBILE</span>
                      <input formControlName="mobile" type="text" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/60 text-black/80"/>
                  </label>
              </div>
              <div class="fixed lg:static left-0 bottom-0 flex gap-4 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 py-8 lg:pt-10 lg:pb-0 p-5 pe-8 lg:p-0 lg:pe-0 bg-[#2A2A2A] lg:bg-transparent rounded-t-2xl">
                  <button type="button" class="close-x rounded-lg bg-background text-main py-4 lg:py-2 px-10 font-second text-base">Cancel</button>
                  <button type="submit" class="rounded-lg w-full lg:w-max bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Save</button>
              </div>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ProfileBasicInformationPopupComponent {
  @Input() userData!:UserInterface
  @Input() closePopup: any
  
  imagePreview: string = "";

  userService = inject(UserService)

  formBasic = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    domicile: new FormControl(""),
    date_of_birth: new FormControl(""),
    email: new FormControl(""),
    mobile: new FormControl(""),
    sex: new FormControl(""),
  })

  ngOnInit(): void {
    this.formBasic.controls['firstname'].setValue(this.userData.firstname)
    this.formBasic.controls['lastname'].setValue(this.userData.lastname)
    this.formBasic.controls['domicile'].setValue(this.userData.domicile)
    this.formBasic.controls['date_of_birth'].setValue(this.userData.date_of_birth)
    this.formBasic.controls['email'].setValue(this.userData.email)
    this.formBasic.controls['mobile'].setValue(this.userData.mobile)
    this.formBasic.controls['sex'].setValue(this.userData.sex)
  }

  submitBasic(){
    const summaryData = this.formBasic.value

    console.log(summaryData);
    
    
    if(summaryData.firstname && summaryData.email){
      this.userData.firstname = summaryData.firstname
      this.userData.lastname = summaryData.lastname || null
      this.userData.domicile = summaryData.domicile || null
      this.userData.date_of_birth = summaryData.date_of_birth || null
      this.userData.email = summaryData.email
      this.userData.mobile = summaryData.mobile || null
      this.userData.sex = summaryData.email

      this.userService.updateUserData(summaryData)
      .then(() => {
        this.closePopup("basic")
      })
      .catch((e) => {
        alert("ERROR")
        console.log(e)
      })
    }
  }

}
