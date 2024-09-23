import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserInterface } from '../../../interface/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '../../../services/utils.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-educations-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="hidden popup popup-educations border-2 border-main w-full lg:w-[720px] rounded-2xl overflow-hidden">
      <div class="hidden header bg-main lg:flex justify-between px-5 py-3 items-center">
          <p class="font-normal text-white text-base tracking-[1.6px] flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18.6667 14.2708C18.4167 14.2708 18.2118 14.1875 18.0521 14.0208C17.8924 13.8542 17.8125 13.6597 17.8125 13.4375V8.5L10.8958 12.2292C10.7708 12.2847 10.625 12.3333 10.4583 12.375C10.2917 12.4167 10.1319 12.4375 9.97917 12.4375C9.82639 12.4375 9.67014 12.4167 9.51042 12.375C9.3507 12.3333 9.20833 12.2847 9.08333 12.2292L2.0625 8.375C1.89583 8.30556 1.77083 8.19792 1.6875 8.05208C1.60417 7.90625 1.5625 7.73611 1.5625 7.54167C1.5625 7.36111 1.60417 7.19792 1.6875 7.05208C1.77083 6.90625 1.89583 6.79167 2.0625 6.70833L9.08333 2.875C9.22222 2.81944 9.37153 2.76389 9.53125 2.70833C9.69097 2.65278 9.84028 2.625 9.97917 2.625C10.1181 2.625 10.2674 2.65278 10.4271 2.70833C10.5868 2.76389 10.75 2.81944 10.9167 2.875L18.9792 7.27083C19.1319 7.34028 19.2535 7.45486 19.3438 7.61458C19.434 7.77431 19.4792 7.9375 19.4792 8.10417V13.4375C19.4792 13.6597 19.3993 13.8542 19.2396 14.0208C19.0799 14.1875 18.8889 14.2708 18.6667 14.2708ZM9.97917 17.2917C9.84028 17.2917 9.6875 17.2743 9.52083 17.2396C9.35417 17.2049 9.20833 17.1528 9.08333 17.0833L4.79167 14.7708C4.47222 14.6181 4.22569 14.3889 4.05208 14.0833C3.87847 13.7778 3.79167 13.4444 3.79167 13.0833V10.125L8.66667 12.8125C8.875 12.9236 9.08333 13.0278 9.29167 13.125C9.5 13.2222 9.72917 13.2708 9.97917 13.2708C10.2292 13.2708 10.4653 13.2222 10.6875 13.125C10.9097 13.0278 11.1181 12.9167 11.3125 12.7917L16.1875 10.125V13.0833C16.1875 13.4444 16.0972 13.7778 15.9167 14.0833C15.7361 14.3889 15.4931 14.6181 15.1875 14.7708L10.8958 17.0833C10.7569 17.1528 10.6042 17.2049 10.4375 17.2396C10.2708 17.2743 10.1181 17.2917 9.97917 17.2917Z" fill="white"/>
            </svg> MENGEDIT PENDIDIKAN</p>
          <p (click)="closePopup('educations')" class="close-x cursor-pointer font-second font-medium text-sm text-teal-100">Close x</p>
      </div>
      <div id="popup-educations-s" class="body bg-background h-[85vh] lg:h-[500px] overflow-y-scroll">

          <!-- ADDING NEW EDUCATION -->

          <div *ngIf="isCreate == true" id="adding-new-education" class="additional-popup w-[99vw] lg:w-full">
              <form id="form-add-education" class="relative" [formGroup]="formEducations" (submit)="submitAddEducation()">
                  <div class="pb-40 lg:pb-5 p-5 divide-header divide-y flex flex-col gap-4">
                      <div class="flex flex-col gap-4 py-4 lg:py-0">
                          <p class="font-bold text-xl lg:text-lg text-main mb-1">Menambahkan Pendidikan</p>
                          <label class="block">
                              <span class="text-white-60 tracking-[1.4px] font-normal text-sm">NAMA GELAR/PROGRAM*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input id="popup-firstname" type="text" placeholder="Computer Science" formControlName="edu_program" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                          <label class="block">
                              <span class="text-white-60 tracking-[1.4px] font-normal text-sm">INSTITUSI*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input id="popup-firstname" type="text" placeholder="Universitas Internshit" formControlName="edu_institution" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                      </div>
                      <div class="flex flex-col gap-4 py-4">
                          <div class="lg:flex gap-5">
                              <label class="block">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">TIPE PENDIDIKAN*</span>
                                  <select required id="countries" formControlName="edu_type" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80 focus:ring-white">
                                      <option value="" selected>Pilih Tipe</option>
                                      <option value="Pascasarjana (S2)">Pascasarjana (S2)</option>
                                      <option value="Sarjana (S1)">Sarjana (S1)</option>
                                      <option value="Sekolah Menengah Atas">Sekolah Menengah Atas</option>
                                      <option value="Sekolah Menengah Pertama">Sekolah Menengah Pertama</option>
                                      <option value="Sekolah Dasar">Sekolah Dasar</option>
                                      <option value="Bootcamp">Bootcamp</option>
                                  </select>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">IPK/RATA-RATA (JIKA TERSEDIA)</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input id="popup-firstname" type="text" pattern="^[0-9.]+" placeholder="3.42" formControlName="edu_gpa" class="block border-2 border-gray-300 w-full lg:w-[80px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                          </div>
                          <div class="lg:flex gap-5 items-center">
                              <label class="block">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">TANGGAL MULAI*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input id="popup-firstname" type="month" formControlName="edu_startdate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">TANGGAL SELESAI*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input id="popup-firstname" type="month" formControlName="edu_enddate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                          </div>
                      </div>
                      <div class="py-4">
                          <span class="text-white-60 tracking-[1.4px] font-normal text-sm">DESKRIPSI ORGANISASI</span>
                          <textarea id="" rows="4" formControlName="edu_description" class="border-2 border-gray-300 block resize-none px-3 py-[10px] w-full h-[240px] font-second text-black/80 bg-header rounded-lg focus:ring-white-60" placeholder="Tuliskan deskripsi organisasimu disini..."></textarea>
                      </div>
                  </div>
                  <div class="fixed lg:mx-5 lg:mb-6 lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                      <button (click)="isDisplay = true; isCreate = false" type="button" class="cancle-add rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Kembali</button>
                      <button type="submit" class="lg:rounded-lg w-full bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Tambahkan</button>
                  </div>
              </form>
          </div>

          <!-- EDITING EDUCATION -->

          <div *ngIf="isEdit == true" id="editing-education" class="additional-popup-edit w-[99vw] lg:w-full">
              <form id="form-editing-education" class="relative" [formGroup]="formEducations" (submit)="submitEditEducation(editId)">
                  <div class="pb-40 lg:pb-5 p-5 divide-gray-300 divide-y flex flex-col gap-4">
                      <div class="flex flex-col gap-4 py-4 lg:py-0">
                          <p class="font-bold text-xl lg:text-lg text-main mb-1">Ubah Pendidikan</p>
                          <label class="block">
                              <span class="text-white-60 tracking-[1.4px] font-normal text-sm">NAMA GELAR/PROGRAM*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input type="text" placeholder="Computer Science" formControlName="edu_program" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                          <label class="block">
                              <span class="text-white-60 tracking-[1.4px] font-normal text-sm">INSTITUSI*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input type="text" placeholder="Universitas Internshit" formControlName="edu_institution" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                      </div>
                      <div class="flex flex-col gap-4 py-4">
                          <div class="lg:flex gap-5">
                              <label class="block">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">TIPE PENDIDIKAN*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <select required id="countries" formControlName="edu_type" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80 focus:ring-white">
                                      <option selected>Pilih Tipe</option>
                                      <option value="Pascasarjana (S2)">Pascasarjana (S2)</option>
                                      <option value="Sarjana (S1)">Sarjana (S1)</option>
                                      <option value="Sekolah Menengah Atas">Sekolah Menengah Atas</option>
                                      <option value="Sekolah Menengah Pertama">Sekolah Menengah Pertama</option>
                                      <option value="Sekolah Dasar">Sekolah Dasar</option>
                                      <option value="Bootcamp">Bootcamp</option>
                                  </select>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">IPK/RATA-RATA (JIKA TERSEDIA)</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input type="text" pattern="^[0-9.]+" placeholder="3.42" formControlName="edu_gpa" class="block border-2 border-gray-300 w-full lg:w-[80px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                          </div>
                          <div class="lg:flex gap-5 items-center">
                              <label class="block">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">WAKTU MULAI*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input type="month" placeholder="Hup! Indonesia" formControlName="edu_startdate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">WAKTU BERAKHIR*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input type="month" placeholder="Hup! Indonesia" formControlName="edu_enddate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                          </div>
                      </div>
                      <div class="py-4">
                          <span class="text-white-60 tracking-[1.4px] font-normal text-sm">DESKRIPSI ORGANISASI</span>
                          <textarea id="" rows="4" formControlName="edu_description" class="border-2 border-gray-300 block resize-none px-3 py-[10px] w-full h-[240px] font-second text-black/80 bg-header rounded-lg focus:ring-white-60" placeholder="Tulis deskripsi organisasimu disini..."></textarea>
                      </div>
                  </div>
                  <div class="fixed lg:mx-5 lg:mb-6 lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                      <button (click)="isDisplay = true; isEdit = false" type="button" class="cancle-edit rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Kembali</button>
                      <button type="submit" class="lg:rounded-lg w-full bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Simpan</button>
                  </div>
              </form>
          </div>

          <!-- REGISTERED EDUCATION -->

          <div *ngIf="isDisplay == true" id="registered-education" class="main-popup">
              <div class="">
                  <div class="p-5">
                      <button (click)="closePopup('educations')" type="button" class="lg:hidden my-4 mb-6 flex items-center gap-2 close-x text-main font-medium font-second text-base">
                          <i class="uil uil-arrow-left"></i> Kembali ke Profil
                      </button>
                      <p class="font-bold text-xl lg:text-lg text-main mb-1">Pendidikan Kamu</p>
                      <p class="text-black/80 text-sm font-second font-medium">Disini tampat kamu memamerkan pendidikanmu ke orang lain! Kamu bisa menambahkan pendidikan yang telah kamu lalui, atau yang sedang kamu jalankan.</p>
                  </div>
                  <div class="px-5">
                      <div class="divide-y divide-gray-300">
                          <div class="block mb-4">
                              <button (click)="isDisplay = false ; isCreate = true;" type="button" id="add-education" class="font-second text-sm font-medium w-[90%] m-auto rounded-lg bg-main text-white p-4 my-5 flex items-center gap-2 justify-center">
                                  Tambah Pendidikan
                              </button>
                          </div>
                          <div id="popup-body-educations" class="flex flex-col gap-4 pt-4 pb-20">
                              @for(education of userData.educations; track education.id; let idx = $index){
                                <div class="card-education bg-white p-5 py-4 rounded-lg border border-main">
                                    <div class="relative flex gap-4">
                                        <div class="w-full">
                                            <div class="head lg:flex justify-between mb-4">
                                                <div class="">
                                                    <div class="flex items-center gap-2">
                                                        <p class="text-white bg-main/60 py-[2px] px-2 inline cursor-default text-xs font-second font-medium">{{education.edu_type.toUpperCase()}}</p>
                                                        <p class="text-white bg-white/30 py-[2px] px-2 inline cursor-default text-xs font-second font-medium">GPA {{education.edu_gpa}}</p>
                                                    </div>
                                                    <p class="font-bold text-lg text-main">{{education.edu_program}}</p>
                                                    <p class="font-semibold text-sm text-white-80 font-second">{{education.edu_institution}}</p>
                                                </div>
                                                <div class="text-left mt-1 lg:mt-0 lg:text-right flex gap-2 lg:block">
                                                    <p class="font-second text-xs font-normal text-black/80">{{utilService.formatDateMonth(education.edu_startdate)}} - {{utilService.formatDateMonth(education.edu_enddate)}}</p>
                                                    <p class="text-xs font-semibold text-[#A5A5A5]">{{utilService.calculateMonthDifference(education.edu_startdate, education.edu_enddate).toUpperCase()}}</p>
                                                </div>
                                            </div>
                                            <div *ngIf="education.edu_description.length > 0" class="mb-6 paragraph flex gap-2">
                                                <p>{{ isExpanded[idx] 
                                                    ? education.edu_description 
                                                    : (education.edu_description | slice: 0:100) + '...' }}
                                                    <button class="text-sm text-main font-medium" *ngIf="education.edu_description.length > 100 && !isExpanded[idx]" (click)="toggleDescription(idx)">
                                                    Read More
                                                    </button></p>
                                            </div>
                                        </div>
                                        <div class="absolute lg:static right-0 flex lg:flex-col flex-row-reverse gap-4 lg:gap-2">
                                            <svg (click)="clickEditEducation(education); isEdit = true; isDisplay = false" title="Edit Pengalaman" class="cursor-pointer update-education-button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM4 21C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20V17.175C3 17.0417 3.025 16.9125 3.075 16.7875C3.125 16.6625 3.2 16.55 3.3 16.45L13.6 6.15L17.85 10.4L7.55 20.7C7.45 20.8 7.3375 20.875 7.2125 20.925C7.0875 20.975 6.95833 21 6.825 21H4Z" fill="#A5A5A5"/>
                                            </svg>
                                            <p class="id" style="display: none;">{{education.id}}</p>
                                            <svg (click)="deleteEducation(education)" title="Hapus Pendidikan" class="cursor-pointer delete-education-button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
export class ProfileEducationsPopupComponent {
    userService = inject(UserService)
    utilService = inject(UtilsService)
    
    @Input() closePopup: any
    @Input() userData!: UserInterface
    @Output() userDataUpdated = new EventEmitter<string>()

    isEdit = false
    isCreate = false
    isDisplay = true
    editId:any
    isExpanded: boolean[] = [];


    formEducations = new FormGroup({
        edu_type: new FormControl(""),
        edu_program: new FormControl(""),
        edu_faculty: new FormControl(""),
        edu_institution: new FormControl(""),
        edu_gpa: new FormControl(""),
        edu_startdate: new FormControl(""),
        edu_enddate: new FormControl(""),
        edu_description: new FormControl(""),
        edu_location: new FormControl(""),
        edu_status: new FormControl(""),
    })

    ngOnInit(): void {
        this.isExpanded = this.userData.educations.map(() => false);
    }

    toggleDescription(idx: number) {
        this.isExpanded[idx] = !this.isExpanded[idx];
    }

    clickEditEducation(education:any){
        this.editId = education.id
        this.formEducations.controls["edu_program"].setValue(education.edu_program)
        this.formEducations.controls["edu_institution"].setValue(education.edu_institution)
        this.formEducations.controls["edu_type"].setValue(education.edu_type)
        this.formEducations.controls["edu_faculty"].setValue(education.edu_faculty)
        this.formEducations.controls["edu_gpa"].setValue(education.edu_gpa)
        this.formEducations.controls["edu_startdate"].setValue(education.edu_startdate)
        this.formEducations.controls["edu_enddate"].setValue(education.edu_enddate)
        this.formEducations.controls["edu_description"].setValue(education.edu_description)
        this.formEducations.controls["edu_location"].setValue(education.edu_location)
        this.formEducations.controls["edu_status"].setValue(education.edu_status)
    }

    deleteEducation(education:any){
        const isConfirm = confirm("apakah kamu yakin ingin menghapus pendidikan ini?")
        if(isConfirm){
            this.userService.DeleteUserEduExpData(education.id, "educations")
                .then(() => {
                    this.closePopup("educations");
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

    submitAddEducation() {
        const educationData = this.formEducations.value;

        this.userService.AddUserSpesificData(educationData, "educations")
            .then(() => {
                this.closePopup("educations");
                this.isDisplay = true
                this.isCreate = false
                this.formEducations.reset()
                this.userDataUpdated.emit()
            })
            .catch((e) => {
                alert("ERROR");
                console.log(e);
            });
    }

    submitEditEducation(id:any) {
        const educationData = this.formEducations.value;

        this.userService.UpdateUserEduExpData(id, educationData, "educations")
            .then(() => {
                this.closePopup("educations");
                this.isDisplay = true
                this.isEdit = false
                this.formEducations.reset()
                this.userDataUpdated.emit()
            })
            .catch((e) => {
                alert("ERROR");
                console.log(e);
            });
    }
}
