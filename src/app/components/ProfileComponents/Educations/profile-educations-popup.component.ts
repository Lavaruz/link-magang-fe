import { Component, inject, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserInterface } from '../../../interface/user.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-educations-popup',
  standalone: true,
  imports: [],
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

          <div id="adding-new-education" class="additional-popup hidden">
              <form id="form-add-education" class="relative">
                  <div class="pb-40 lg:pb-5 p-5 divide-header divide-y flex flex-col gap-4">
                      <div class="flex flex-col gap-4 py-4 lg:py-0">
                          <p class="font-bold text-xl lg:text-lg text-main mb-1">Menambahkan Pendidikan</p>
                          <label class="block">
                              <span class="text-white-60 tracking-[1.4px] font-normal text-sm">NAMA GELAR/PROGRAM*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input id="popup-firstname" type="text" placeholder="Computer Science" name="edu_program" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                          <label class="block">
                              <span class="text-white-60 tracking-[1.4px] font-normal text-sm">INSTITUSI*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input id="popup-firstname" type="text" placeholder="Universitas Internshit" name="edu_institution" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                      </div>
                      <div class="flex flex-col gap-4 py-4">
                          <div class="lg:flex gap-5">
                              <label class="block">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">TIPE PENDIDIKAN*</span>
                                  <select required id="countries" name="edu_type" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80 focus:ring-white">
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
                                  <input id="popup-firstname" type="text" pattern="^[0-9.]+" placeholder="3.42" name="edu_gpa" class="block border-2 border-gray-300 w-full lg:w-[80px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                          </div>
                          <div class="lg:flex gap-5 items-center">
                              <label class="block">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">TANGGAL MULAI*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input id="popup-firstname" type="month" name="edu_startdate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">TANGGAL SELESAI*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input id="popup-firstname" type="month" name="edu_enddate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                          </div>
                      </div>
                      <div class="py-4">
                          <span class="text-white-60 tracking-[1.4px] font-normal text-sm">DESKRIPSI ORGANISASI</span>
                          <textarea id="" rows="4" name="edu_description" class="border-2 border-gray-300 block resize-none px-3 py-[10px] w-full h-[240px] font-second text-black/80 bg-header rounded-lg focus:ring-white-60" placeholder="Tuliskan deskripsi organisasimu disini..."></textarea>
                      </div>
                  </div>
                  <div class="fixed lg:mx-5 lg:mb-6 lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                      <button type="button" class="cancle-add rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Kembali</button>
                      <button type="submit" class="lg:rounded-lg w-full bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Tambahkan</button>
                  </div>
              </form>
          </div>

          <!-- EDITING EDUCATION -->

          <div id="editing-education" class="additional-popup-edit hidden">
              <form id="form-editing-education" class="relative">
                  <div class="pb-40 lg:pb-5 p-5 divide-gray-300 divide-y flex flex-col gap-4">
                      <div class="flex flex-col gap-4 py-4 lg:py-0">
                          <p class="font-bold text-xl lg:text-lg text-main mb-1">Ubah Pendidikan</p>
                          <label class="block">
                              <span class="text-white-60 tracking-[1.4px] font-normal text-sm">NAMA GELAR/PROGRAM*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input type="text" placeholder="Computer Science" name="edu_program" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                              focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                              focus:invalid:border-red-500 focus:invalid:ring-red-500
                              "/>
                          </label>
                          <label class="block">
                              <span class="text-white-60 tracking-[1.4px] font-normal text-sm">INSTITUSI*</span>
                              <!-- Using form state modifiers, the classes can be identical for every input -->
                              <input type="text" placeholder="Universitas Internshit" name="edu_institution" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
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
                                  <select required id="countries" name="edu_type" class="block border-2 border-gray-300 w-full lg:w-[240px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80 focus:ring-white">
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
                                  <input type="text" pattern="^[0-9.]+" placeholder="3.42" name="edu_gpa" class="block border-2 border-gray-300 w-full lg:w-[80px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                          </div>
                          <div class="lg:flex gap-5 items-center">
                              <label class="block">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">WAKTU MULAI*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input type="month" placeholder="Hup! Indonesia" name="edu_startdate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                              <label class="block mt-4 lg:mt-0">
                                  <span class="text-white-60 tracking-[1.4px] font-normal text-sm">WAKTU BERAKHIR*</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input type="month" placeholder="Hup! Indonesia" name="edu_enddate" class="block border-2 border-gray-300 w-full lg:w-[200px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-base placeholder-black/40 text-black/80
                                  focus:outline-none focus:border-white-60 focus:ring-1 focus:ring-white-60
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                          </div>
                      </div>
                      <div class="py-4">
                          <span class="text-white-60 tracking-[1.4px] font-normal text-sm">DESKRIPSI ORGANISASI</span>
                          <textarea id="" rows="4" name="edu_description" class="border-2 border-gray-300 block resize-none px-3 py-[10px] w-full h-[240px] font-second text-black/80 bg-header rounded-lg focus:ring-white-60" placeholder="Tulis deskripsi organisasimu disini..."></textarea>
                      </div>
                  </div>
                  <div class="fixed lg:mx-5 lg:mb-6 lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                      <button type="button" class="cancle-edit rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Kembali</button>
                      <button type="submit" class="lg:rounded-lg w-full bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Simpan</button>
                  </div>
              </form>
          </div>

          <!-- REGISTERED EDUCATION -->

          <div id="registered-education" class="main-popup">
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
                              <button type="button" id="add-education" class="font-second text-sm font-medium w-[90%] m-auto rounded-lg bg-main text-white p-4 my-5 flex items-center gap-2 justify-center">
                                  Tambah Pendidikan
                              </button>
                          </div>
                          <div id="popup-body-educations" class="flex flex-col gap-4 pt-4 pb-20">
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
export class ProfileEducationsPopupComponent {
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
