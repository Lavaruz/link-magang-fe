import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserInterface } from '../../../interface/user.interface';
import { UtilsService } from '../../../services/utils.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-experiences-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="hidden popup popup-experiences border-2 border-main w-full lg:w-[720px] rounded-t-2xl lg:rounded-2xl overflow-hidden">
      <div class="hidden header bg-main lg:flex justify-between px-5 py-3 items-center">
          <p class="font-normal text-white text-base tracking-[1.6px] flex items-center gap-2">PENGALAMAN</p>
          <p (click)="closePopup('experiences')" class="close-x cursor-pointer font-second font-medium text-sm text-teal-100">Close x</p>
      </div>

      <div id="popup-experiences-s" class="bg-background bg-background h-[85vh] lg:h-[500px] overflow-y-scroll">
          <!-- ADDING NEW EXPERIENCE -->

          <div *ngIf="isCreate" id="adding-new-experience" class="w-[99vw] lg:w-full">
              <form id="form-add-experience" class="relative" [formGroup]="formExperience" (submit)="submitAddExperience()">
                  <div class="pb-40 lg:pb-5 p-5 divide-gray-300 divide-y flex flex-col gap-4">
                      <div class="lg:flex flex-col gap-4 py-4 lg:py-0">
                          <p class="font-bold text-xl lg:text-lg text-main mb-6 lg:mb-1">Menambahkan Pengalaman</p>
                          <label class="block">
                              <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">POSISI DI PEKERJAAN/ORGANISASI*</label>
                              <input formControlName="exp_position" required id="popup-firstname" type="text" placeholder="Software Engineer" name="exp_position" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                          <label class="block">
                              <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">NAMA PERUSAHAAN/ORGANISASI*</label>
                              <input formControlName="exp_orgname" required id="popup-firstname" type="text" placeholder="Gatera Indonesia" name="exp_orgname" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                      </div>
                      <div class="flex flex-col gap-4 py-4">
                          <div class="lg:flex gap-5">
                              <label class="block">
                                  <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">TIPE PENGALAMAN*</label>
                                  <select formControlName="exp_type" id="countries" name="exp_type" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
                                      <option value="Karyawan" selected>Karyawan</option>
                                      <option value="Relawan">Relawan</option>
                                      <option value="Organisasi Siswa">Organisasi Siswa</option>
                                      <option value="Bekerja Sendiri">Bekerja Sendiri</option>
                                  </select>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">STATUS PEKERAAN*</label>
                                  <select formControlName="exp_time" id="countries" name="exp_time" class="block border-2 border-gray-300 w-full lg:w-[140px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
                                      <option selected value="Internship">Internship</option>
                                      <option value="Part-time">Part-time</option>
                                      <option value="Full-time">Full-time</option>
                                  </select>
                              </label>
                          </div>
                          <div class="lg:flex gap-5 items-center">
                              <label class="block lg:w-max">
                                  <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">WAKTU MULAI*</label>
                                  <input formControlName="exp_startdate" required id="popup-firstname" type="month" placeholder="" name="exp_startdate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                              <label class="block lg:w-max mt-4 lg:mt-0">
                                  <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">WAKTU BERAKHIR*</label>
                                  <input formControlName="exp_enddate" id="popup-firstname" type="month" placeholder="" name="exp_enddate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:opacity-50
                                  "/>
                              </label>
                              <div class="flex items-center mt-5">
                                  <input (change)="toggleCurrentlyWorking($event)" id="still-work-here" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-header border-0 rounded focus:ring-blue-500 focus:ring-0 focus:outline-none focus:border-0">
                                  <label for="still-work-here" class="ml-2 font-second text-sm font-medium text-black/80">Saya masih bekerja disini</label>
                              </div>
                          </div>
                      </div>
                      <div class="lg:flex gap-5 py-4">
                          <label class="block">
                              <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">TIPE LOKASI</label>
                              <select formControlName="exp_status" id="countries" name="exp_status" class="block border-2 border-gray-300 w-full lg:w-[140px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
                                  <option value="On-Site" selected>On-Site</option>
                                  <option value="Hybrid">Hybrid</option>
                                  <option value="Remote">Remote</option>
                              </select>
                          </label>
                          <label class="block mt-4 lg:mt-0">
                              <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">LOKASI KANTOR*</label>
                              <input formControlName="exp_location" required id="popup-firstname" type="text" placeholder="Jakarta" name="exp_location" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                      </div>
                      <div class="pt-4">
                          <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">DESKRIPSI PEKERJAAN</label>
                          <textarea formControlName="exp_description" id="" rows="4" name="exp_description" class="block border-2 border-gray-300 resize-none px-4 lg:px-3 py-4 lg:py-[10px] w-full h-[240px] font-second text-sm text-black/80 bg-header rounded-lg focus:ring-white-60" placeholder="Tuliskan deskripsi pekerjaanmu disini..."></textarea>
                      </div>
                  </div>
                  <div class="fixed lg:mx-5 lg:mb-6 lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                      <button (click)="isCreate = false; isDisplay = true" type="button" class="cancle-add rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Kembali</button>
                      <button type="submit" class="lg:rounded-lg w-full bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Tambahkan</button>
                  </div>
              </form>
          </div>

          <!-- EDITING EXPERIENCE -->

          <div *ngIf="isEdit" id="editing-experience" class="w-[99vw] lg:w-full">
              <form id="form-editing-experience" class="relative" [formGroup]="formExperience" (submit)="submitEditExperience(editId)">
                  <div class="pb-40 lg:pb-5 p-5 divide-gray-300 divide-y flex flex-col gap-4">
                      <div class="flex flex-col gap-4">
                          <p class="font-bold text-xl lg:text-lg text-main mb-4 lg:mb-1">Ubah Pengalaman</p>
                          <label class="block">
                              <span class="text-black/80 tracking-[1.4px] font-normal text-sm">POSISI DI PEKERJAAN/ORGANISASI*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input required type="text" placeholder="Software Engineer" formControlName="exp_position" class="block border-2 border-gray-300 w-full lg:w-[360px] px-3 py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                          <label class="block">
                              <span class="text-black/80 tracking-[1.4px] font-normal text-sm">NAMA PERUSAHAAN/ORGANISASI*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input required type="text" placeholder="" formControlName="exp_orgname" class="block border-2 border-gray-300 w-full lg:w-[360px] px-3 py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                      </div>
                      <div class="flex flex-col gap-4 py-4">
                          <div class="lg:flex gap-5">
                              <label class="block">
                                  <span class="text-black/80 tracking-[1.4px] font-normal text-sm">TIPE PENGALAMAN*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <select id="countries" formControlName="exp_type" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
                                      <option value="Karyawan" selected>Karyawan</option>
                                      <option value="Relawan">Relawan</option>
                                      <option value="Organisasi Siswa">Organisasi Siswa</option>
                                      <option value="Bekerja Sendiri">Bekerja Sendiri</option>
                                  </select>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <span class="text-black/80 tracking-[1.4px] font-normal text-sm">STATUS PEKERAAN*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <select formControlName="exp_time" class="block border-2 border-gray-300 w-full lg:w-[140px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
                                      <option selected value="Internship">Internship</option>
                                      <option value="Full-time">Full-time</option>
                                      <option value="Part-time">Part-time</option>
                                  </select>
                              </label>
                          </div>
                          <div class="lg:flex gap-5 items-center">
                              <label class="block">
                                  <span class="text-black/80 tracking-[1.4px] font-normal text-sm">WAKTU MULAI*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input required type="month" placeholder="Hup! Indonesia" formControlName="exp_startdate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <span class="text-black/80 tracking-[1.4px] font-normal text-sm">WAKTU BERAKHIR*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input type="month" placeholder="Hup! Indonesia" formControlName="exp_enddate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:opacity-50
                                  "/>
                              </label>
                              <div class="flex items-center mt-5">
                                  <input [checked]="isCurrentlyWorking" id="still-work-here" (change)="toggleCurrentlyWorking($event)" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-header border-0 rounded focus:ring-blue-500 focus:ring-0 focus:outline-none focus:border-0">
                                  <label for="still-work-here" class="ml-2 font-second text-sm font-medium text-black/80">Saya masih bekerja disini</label>
                              </div>
                          </div>
                      </div>
                      <div class="lg:flex gap-5 py-4">
                          <label class="block">
                              <span class="text-black/80 tracking-[1.4px] font-normal text-sm">TIPE LOKASI</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <select id="countries" formControlName="exp_status" class="block border-2 border-gray-300 w-full lg:w-[140px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
                                  <option value="On-Site" selected>On-Site</option>
                                  <option value="Hybrid">Hybrid</option>
                                  <option value="Remote">Remote</option>
                              </select>
                          </label>
                          <label class="block mt-4 lg:mt-0">
                              <span class="text-black/80 tracking-[1.4px] font-normal text-sm">LOKASI KANTOR*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input required type="text" placeholder="Jakarta" formControlName="exp_location" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                      </div>
                      <div class="pt-4">
                          <span class="text-black/80 tracking-[1.4px] font-normal text-sm mb-2">DESKRIPSI PEKERJAAN*</span>
                          <textarea id="" rows="4" formControlName="exp_description" class="block border-0 resize-none px-3 py-[10px] w-full h-[240px] font-second text-sm text-black/80 bg-header rounded-lg focus:ring-white-60" placeholder="Tuliskan deskripsi pekerjaanmu disini..."></textarea>
                      </div>
                  </div>
                  <div class="fixed lg:mx-5 lg:mb-6 lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                      <button (click)="isEdit = false; isDisplay = true" type="button" class="cancle-edit rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Kembali</button>
                      <button type="submit" class="lg:rounded-lg w-full bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Simpan</button>
                  </div>
              </form>
          </div>

          <!-- REGISTERED EXPERIENCES -->

          <div *ngIf="isDisplay" id="registered-experience" class="main-popup">
              <div class="">
                  <div class="p-5">
                      <button (click)="closePopup('experiences')" type="button" class="lg:hidden my-4 mb-6 flex items-center gap-2 close-x text-main font-medium text-base">
                          <i class="uil uil-arrow-left"></i> Kembali ke Profil
                      </button>
                      <p class="font-bold text-xl lg:text-lg text-main mb-1">Pengalaman Kamu</p>
                      <p class="text-black/80 text-sm font-second font-medium">Kamu bisa menambahkan pengalaman sebanyak yang kamu mau! Kamu bahkan dapat menambahkan pengalaman organisasi. Ingat untuk selalu menjelaskan responsibilitymu dengan jelas di deskripsi.</p>
                  </div>
                  <div class="px-5">
                      <div class="lg:divide-y divide-gray-300">
                          <div class="block mb-4">
                              <button (click)="isCreate = true; isDisplay = false" id="add-experience" class="font-second text-sm font-medium w-[90%] m-auto rounded-lg bg-main text-white p-4 my-5 flex items-center gap-2 justify-center">
                                  Tambah Pengalaman
                              </button>
                          </div>

                          <div id="popup-body-experiences" class="flex flex-col gap-4 pt-4 pb-20">
                              @for(experience of userData.experiences; track experience.id; let idx = $index){
                                <div class="card-experience bg-white p-5 py-4 rounded-lg border border-main">
                                    <div class="relative flex gap-4">
                                        <div class="w-full">
                                            <div class="head lg:flex justify-between mb-4">
                                                <div class="">
                                                    <p class="text-white bg-main/60 py-[2px] px-2 inline cursor-default text-xs font-second font-medium">{{ experience.exp_type.toUpperCase() }}</p>
                                                    <p class="font-bold text-lg text-main mt-2 lg:mt-0">{{ experience.exp_position }}</p>
                                                    <p class="font-semibold text-sm text-black/80 font-second">{{ experience.exp_orgname }} • {{ experience.exp_time }} • {{ experience.exp_status }} ({{ experience.exp_location }}) </p>
                                                </div>
                                                <div class="text-left mt-1 lg:mt-0 lg:text-right flex gap-2 lg:block">
                                                    <p class="font-second text-xs font-normal text-black/80">{{ utilService.formatDateMonth(experience.exp_startdate) }} - {{ experience.exp_enddate ? utilService.formatDateMonth(experience.exp_enddate) : "Now" }}</p>
                                                    <p class="text-xs font-semibold text-[#A5A5A5]">{{ utilService.calculateMonthDifference(experience.exp_startdate, experience.exp_enddate ? experience.exp_enddate : utilService.getFormattedDate()).toUpperCase() }}</p>
                                                </div>
                                            </div>
                                            <div *ngIf="experience.exp_description" class="mb-6 paragraph flex gap-2">
                                                <p>{{ isExpanded[idx] 
                                                        ? experience.exp_description 
                                                        : (experience.exp_description | slice: 0:100) + '...' }}
                                                        <button class="text-sm text-main font-medium" *ngIf="experience.exp_description.length > 100 && !isExpanded[idx]" (click)="toggleDescription(idx)">
                                                        Read More
                                                        </button></p>
                                            </div>
                                        </div>
                                        <div class="flex absolute lg:static right-0 lg:flex-col flex-row-reverse gap-4 lg:gap-2">
                                            <svg (click)="clickEditExperience(experience); isDisplay = false; isEdit = true" class="cursor-pointer update-experience-button" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none">
                                                <path d="M19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM4 21C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20V17.175C3 17.0417 3.025 16.9125 3.075 16.7875C3.125 16.6625 3.2 16.55 3.3 16.45L13.6 6.15L17.85 10.4L7.55 20.7C7.45 20.8 7.3375 20.875 7.2125 20.925C7.0875 20.975 6.95833 21 6.825 21H4Z" fill="#A5A5A5"/>
                                            </svg>
                                            <p class="id" style="display: none;">{{ experience.id }}</p>
                                            <svg (click)="deleteExperience(experience)" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer delete-experience-button" width="26" height="26" viewBox="0 0 24 24" fill="none">
                                                <path d="M6.525 21C6.125 21 5.775 20.85 5.475 20.55C5.175 20.25 5.025 19.9 5.025 19.5V5.25H4.75C4.53333 5.25 4.35417 5.17917 4.2125 5.0375C4.07083 4.89583 4 4.71667 4 4.5C4 4.28333 4.07083 4.10417 4.2125 3.9625C4.35417 3.82083 4.53333 3.75 4.75 3.75H8.7C8.7 3.53333 8.77083 3.35417 8.9125 3.2125C9.05417 3.07083 9.23333 3 9.45 3H14.55C14.7667 3 14.9458 3.07083 15.0875 3.2125C15.2292 3.35417 15.3 3.53333 15.3 3.75H19.25C19.4667 3.75 19.6458 3.82083 19.7875 3.9625C19.9292 4.10417 20 4.28333 20 4.5C20 4.71667 19.9292 4.89583 19.7875 5.0375C19.6458 5.17917 19.4667 5.25 19.25 5.25H18.975V19.5C18.975 19.9 18.825 20.25 18.525 20.55C18.225 20.85 17.875 21 17.475 21H6.525ZM9.175 16.6C9.175 16.8167 9.24583 16.9958 9.3875 17.1375C9.52917 17.2792 9.70833 17.35 9.925 17.35C10.1417 17.35 10.3208 17.2792 10.4625 17.1375C10.6042 16.9958 10.675 16.8167 10.675 16.6V8.125C10.675 7.90833 10.6042 7.72917 10.4625 7.5875C10.3208 7.44583 10.1417 7.375 9.925 7.375C9.70833 7.375 9.52917 7.44583 9.3875 7.5875C9.24583 7.72917 9.175 7.90833 9.175 8.125V16.6ZM13.325 16.6C13.325 16.8167 13.3958 16.9958 13.5375 17.1375C13.6792 17.2792 13.8583 17.35 14.075 17.35C14.2917 17.35 14.4708 17.2792 14.6125 17.1375C14.7542 16.9958 14.825 16.8167 14.825 16.6V8.125C14.825 7.90833 14.7542 7.72917 14.6125 7.5875C14.4708 7.44583 14.2917 7.375 14.075 7.375C13.8583 7.375 13.6792 7.44583 13.5375 7.5875C13.3958 7.72917 13.325 7.90833 13.325 8.125V16.6Z" fill="#A5A5A5"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                              }
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  `,
})
export class ProfileExperiencesPopupComponent implements OnInit {
    userService = inject(UserService)
    utilService = inject(UtilsService)
    @Output() userDataUpdated = new EventEmitter<string>()

    isEdit = false
    isCreate = false
    isDisplay = true
    isCurrentlyWorking = false;
    editId:any
    isExpanded: boolean[] = [];

    toggleCurrentlyWorking(event: Event) {
        const checkbox = event.target as HTMLInputElement;
        if(checkbox.checked){
            this.formExperience.controls["exp_enddate"].disable()
            this.isCurrentlyWorking = true
        }else{
            this.formExperience.controls["exp_enddate"].enable()
            this.isCurrentlyWorking = false
        }
    }

    toggleDescription(idx: number) {
        this.isExpanded[idx] = !this.isExpanded[idx];
    }

    @Input() closePopup: any
    @Input() userData!: UserInterface

    formExperience = new FormGroup({
        exp_position: new FormControl(""),
        exp_type: new FormControl("Karyawan"),
        exp_orgname: new FormControl(""),
        exp_time: new FormControl("Internship"),
        exp_startdate: new FormControl(""),
        exp_enddate: new FormControl({value:"", disabled: this.isCurrentlyWorking}),
        exp_description: new FormControl(""),
        exp_location: new FormControl(""),
        exp_status: new FormControl("On-Site"),
    })

    ngOnInit(): void {
        this.isExpanded = this.userData.experiences.map(() => false);
    }

    clickEditExperience(experience:any){
        this.editId = experience.id
        this.formExperience.controls["exp_position"].setValue(experience.exp_position)
        this.formExperience.controls["exp_type"].setValue(experience.exp_type)
        this.formExperience.controls["exp_orgname"].setValue(experience.exp_orgname)
        this.formExperience.controls["exp_time"].setValue(experience.exp_time)
        this.formExperience.controls["exp_startdate"].setValue(experience.exp_startdate)
        this.formExperience.controls["exp_enddate"].setValue(experience.exp_enddate)
        if(this.formExperience.controls["exp_enddate"].value == null){
            this.isCurrentlyWorking = true
            this.formExperience.controls["exp_enddate"].disable()
        }

        this.formExperience.controls["exp_description"].setValue(experience.exp_description)
        this.formExperience.controls["exp_location"].setValue(experience.exp_location)
        this.formExperience.controls["exp_status"].setValue(experience.exp_status)
    }

    deleteExperience(experience:any){
        const isConfirm = confirm("apakah kamu yakin ingin menghapus pengalaman ini?")
        if(isConfirm){
            this.userService.DeleteUserEduExpData(experience.id, "experiences")
                .then(() => {
                    this.closePopup("experiences");
                    this.isDisplay = true
                    this.isCreate = false
                    this.isEdit = false
                    this.userDataUpdated.emit()
                })
                .catch((e) => {
                    alert("ERROR");
                    console.log(e);
                });
        }
    }

    submitAddExperience() {
        const experienceData = this.formExperience.value;

        this.userService.AddUserSpesificData(experienceData, "experiences")
            .then(() => {
                this.closePopup("experiences");
                this.isDisplay = true
                this.isCreate = false
                this.formExperience.reset()
                this.userDataUpdated.emit()
            })
            .catch((e) => {
                alert("ERROR");
                console.log(e);
            });
    }

    submitEditExperience(id:any) {
        const experienceData = this.formExperience.value;

        this.userService.UpdateUserEduExpData(id, experienceData, "experiences")
            .then(() => {
                this.closePopup("experiences");
                this.isDisplay = true
                this.isEdit = false
                this.formExperience.reset()
                this.userDataUpdated.emit()
            })
            .catch((e) => {
                alert("ERROR");
                console.log(e);
            });
    }
}
