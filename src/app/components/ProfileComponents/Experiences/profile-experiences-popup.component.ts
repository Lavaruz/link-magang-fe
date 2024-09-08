import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInterface } from '../../../interface/user.interface';

@Component({
  selector: 'app-profile-experiences-popup',
  standalone: true,
  imports: [],
  template: `
    <div class="hidden popup popup-experiences border-2 border-main w-full lg:w-[720px] rounded-t-2xl lg:rounded-2xl overflow-hidden">
      <div class="hidden header bg-main lg:flex justify-between px-5 py-3 items-center">
          <p class="font-normal text-white text-base tracking-[1.6px] flex items-center gap-2">PENGALAMAN</p>
          <p (click)="closePopup('experiences')" class="close-x cursor-pointer font-second font-medium text-sm text-teal-100">Close x</p>
      </div>

      <div id="popup-experiences-s" class="body bg-background lg:bg-background h-[85vh] lg:h-[500px] overflow-y-scroll">

          <!-- ADDING NEW EXPERIENCE -->

          <div id="adding-new-experience" class="hidden additional-popup">
              <form id="form-add-experience" class="relative">
                  <div class="pb-40 lg:pb-5 p-5 divide-gray-300 divide-y flex flex-col gap-4">
                      <div class="lg:flex flex-col gap-4 py-4 lg:py-0">
                          <p class="font-bold text-xl lg:text-lg text-main mb-6 lg:mb-1">Menambahkan Pengalaman</p>
                          <label class="block">
                              <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">POSISI DI PEKERJAAN/ORGANISASI*</label>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input required id="popup-firstname" type="text" placeholder="Software Engineer" name="exp_position" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                          <label class="block">
                              <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">NAMA PERUSAHAAN/ORGANISASI*</label>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input required id="popup-firstname" type="text" placeholder="Internshit" name="exp_orgname" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                      </div>
                      <div class="flex flex-col gap-4 py-4">
                          <div class="lg:flex gap-5">
                              <label class="block">
                                  <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">TIPE PENGALAMAN*</label>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <select id="countries" name="exp_type" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
                                      <option value="Karyawan" selected>Karyawan</option>
                                      <option value="Relawan">Relawan</option>
                                      <option value="Organisasi Siswa">Organisasi Siswa</option>
                                      <option value="Bekerja Sendiri">Bekerja Sendiri</option>
                                  </select>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">STATUS PEKERAAN*</label>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <select id="countries" name="exp_time" class="block border-2 border-gray-300 w-full lg:w-[140px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
                                      <option selected value="Internship">Internship</option>
                                      <option value="Part-time">Part-time</option>
                                      <option value="Full-time">Full-time</option>
                                  </select>
                              </label>
                          </div>
                          <div class="lg:flex gap-5 items-center">
                              <label class="block lg:w-max">
                                  <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">WAKTU MULAI*</label>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input required id="popup-firstname" type="month" placeholder="" name="exp_startdate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                              <label class="block lg:w-max mt-4 lg:mt-0">
                                  <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">WAKTU BERAKHIR*</label>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input id="popup-firstname" type="month" placeholder="" name="exp_enddate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:opacity-50
                                  "/>
                              </label>
                              <div class="flex items-center mt-5">
                                  <input id="still-work-here" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-header border-0 rounded focus:ring-blue-500 focus:ring-0 focus:outline-none focus:border-0">
                                  <label for="still-work-here" class="ml-2 font-second text-sm font-medium text-black/80">Saya masih bekerja disini</label>
                              </div>
                          </div>
                      </div>
                      <div class="lg:flex gap-5 py-4">
                          <label class="block">
                              <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">TIPE LOKASI</label>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <select id="countries" name="exp_status" class="block border-2 border-gray-300 w-full lg:w-[140px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
                                  <option value="On-Site" selected>On-Site</option>
                                  <option value="Hybrid">Hybrid</option>
                                  <option value="Remote">Remote</option>
                              </select>
                          </label>
                          <label class="block mt-4 lg:mt-0">
                              <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">LOKASI KANTOR*</label>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input required id="popup-firstname" type="text" placeholder="Jakarta" name="exp_location" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                      </div>
                      <div class="pt-4">
                          <label class="block mb-1 text-black/80 tracking-[1.4px] font-normal text-sm">DESKRIPSI PEKERJAAN</label>
                          <textarea id="" rows="4" name="exp_description" class="block border-2 border-gray-300 resize-none px-4 lg:px-3 py-4 lg:py-[10px] w-full h-[240px] font-second text-sm text-black/80 bg-header rounded-lg focus:ring-white-60" placeholder="Tuliskan deskripsi pekerjaanmu disini..."></textarea>
                      </div>
                  </div>
                  <div class="fixed lg:mx-5 lg:mb-6 lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                      <button type="button" class="cancle-add rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Kembali</button>
                      <button type="submit" class="lg:rounded-lg w-full bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Tambahkan</button>
                  </div>
              </form>
          </div>

          <!-- EDITING EXPERIENCE -->

          <div id="editing-experience" class="hidden additional-popup-edit">
              <form id="form-editing-experience" class="relative">
                  <div class="pb-40 lg:pb-5 p-5 divide-gray-300 divide-y flex flex-col gap-4">
                      <div class="flex flex-col gap-4">
                          <p class="font-bold text-xl lg:text-lg text-main mb-4 lg:mb-1">Ubah Pengalaman</p>
                          <label class="block">
                              <span class="text-black/80 tracking-[1.4px] font-normal text-sm">POSISI DI PEKERJAAN/ORGANISASI*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input required type="text" placeholder="Software Engineer" name="exp_position" class="block border-2 border-gray-300 w-full lg:w-[360px] px-3 py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                          <label class="block">
                              <span class="text-black/80 tracking-[1.4px] font-normal text-sm">NAMA PERUSAHAAN/ORGANISASI*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input required type="text" placeholder="" name="exp_orgname" class="block border-2 border-gray-300 w-full lg:w-[360px] px-3 py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
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
                                  <select id="countries" name="exp_type" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
                                      <option value="Karyawan" selected>Karyawan</option>
                                      <option value="Relawan">Relawan</option>
                                      <option value="Organisasi Siswa">Organisasi Siswa</option>
                                      <option value="Bekerja Sendiri">Bekerja Sendiri</option>
                                  </select>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <span class="text-black/80 tracking-[1.4px] font-normal text-sm">STATUS PEKERAAN*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <select name="exp_time" class="block border-2 border-gray-300 w-full lg:w-[140px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
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
                                  <input required type="month" placeholder="Hup! Indonesia" name="exp_startdate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <span class="text-black/80 tracking-[1.4px] font-normal text-sm">WAKTU BERAKHIR*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input type="month" placeholder="Hup! Indonesia" name="exp_enddate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:opacity-50
                                  "/>
                              </label>
                              <div class="flex items-center mt-5">
                                  <input id="still-work-here" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-header border-0 rounded focus:ring-blue-500 focus:ring-0 focus:outline-none focus:border-0">
                                  <label for="still-work-here" class="ml-2 font-second text-sm font-medium text-black/80">Saya masih bekerja disini</label>
                              </div>
                          </div>
                      </div>
                      <div class="lg:flex gap-5 py-4">
                          <label class="block">
                              <span class="text-black/80 tracking-[1.4px] font-normal text-sm">TIPE LOKASI</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <select id="countries" name="exp_status" class="block border-2 border-gray-300 w-full lg:w-[140px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80 focus:ring-white-60">
                                  <option value="On-Site" selected>On-Site</option>
                                  <option value="Hybrid">Hybrid</option>
                                  <option value="Remote">Remote</option>
                              </select>
                          </label>
                          <label class="block mt-4 lg:mt-0">
                              <span class="text-black/80 tracking-[1.4px] font-normal text-sm">LOKASI KANTOR*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input required type="text" placeholder="Jakarta" name="exp_location" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/30 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                      </div>
                      <div class="pt-4">
                          <span class="text-black/80 tracking-[1.4px] font-normal text-sm mb-2">DESKRIPSI PEKERJAAN*</span>
                          <textarea id="" rows="4" name="exp_description" class="block border-0 resize-none px-3 py-[10px] w-full h-[240px] font-second text-sm text-black/80 bg-header rounded-lg focus:ring-white-60" placeholder="Tuliskan deskripsi pekerjaanmu disini..."></textarea>
                      </div>
                  </div>
                  <div class="fixed lg:mx-5 lg:mb-6 lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                      <button type="button" class="cancle-edit rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Kembali</button>
                      <button type="submit" class="lg:rounded-lg w-full bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Simpan</button>
                  </div>
              </form>
          </div>

          <!-- REGISTERED EXPERIENCES -->

          <div id="registered-experience" class="main-popup">
              <div class="">
                  <div class="p-5">
                      <button (click)="closePopup('experiences')" type="button" class="lg:hidden my-4 mb-6 flex items-center gap-2 close-x text-main font-medium text-base">
                          <i class="uil uil-arrow-left"></i> Kembali ke Profil
                      </button>
                      <p class="font-bold text-xl lg:text-lg text-main mb-1">Pengalaman Kamu</p>
                      <p class="text-black/80 text-sm font-second font-medium">Kamu bisa menambhakan pengalaman sebanyak yang kamu mau! Kamu bahkan dapat menambahkan pengalaman organisasi. Ingat untuk selalu menjelaskan responsibilitymu dengan jelas di deskripsi.</p>
                  </div>
                  <div class="px-5">
                      <div class="lg:divide-y divide-gray-300">
                          <div class="block mb-4">
                              <button id="add-experience" class="font-second text-sm font-medium w-[90%] m-auto rounded-lg bg-main text-white p-4 my-5 flex items-center gap-2 justify-center">
                                  Tambah Pengalaman
                              </button>
                          </div>

                          <div id="popup-body-experiences" class="flex flex-col gap-4 pt-4 pb-20">
                              <!-- ADD BY JS -->
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
