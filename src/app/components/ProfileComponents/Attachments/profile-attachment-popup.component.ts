import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-attachments-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="hidden popup popup-attachments border-2 border-main w-full lg:w-[720px] rounded-2xl overflow-hidden">
      <div class="hidden header bg-main lg:flex justify-between px-5 py-3 items-center">
          <p class="font-normal text-white text-base tracking-[1.6px] flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9.58333 18.3333C8.30556 18.3333 7.22222 17.8889 6.33333 17C5.44444 16.1111 5 15.0278 5 13.75V4.99999C5 4.08332 5.32639 3.2986 5.97917 2.64582C6.63194 1.99305 7.41667 1.66666 8.33333 1.66666C9.25 1.66666 10.0347 1.99305 10.6875 2.64582C11.3403 3.2986 11.6667 4.08332 11.6667 4.99999V12.9167C11.6667 13.5 11.4653 13.993 11.0625 14.3958C10.6597 14.7986 10.1667 15 9.58333 15C9 15 8.50694 14.7986 8.10417 14.3958C7.70139 13.993 7.5 13.5 7.5 12.9167V5.62499C7.5 5.44443 7.55903 5.29513 7.67708 5.17707C7.79514 5.05902 7.94444 4.99999 8.125 4.99999C8.30556 4.99999 8.45486 5.05902 8.57292 5.17707C8.69097 5.29513 8.75 5.44443 8.75 5.62499V12.9167C8.75 13.1528 8.82986 13.3507 8.98958 13.5104C9.14931 13.6701 9.34722 13.75 9.58333 13.75C9.81944 13.75 10.0174 13.6701 10.1771 13.5104C10.3368 13.3507 10.4167 13.1528 10.4167 12.9167V4.99999C10.4167 4.41666 10.2153 3.9236 9.8125 3.52082C9.40972 3.11805 8.91667 2.91666 8.33333 2.91666C7.75 2.91666 7.25694 3.11805 6.85417 3.52082C6.45139 3.9236 6.25 4.41666 6.25 4.99999V13.75C6.25 14.6667 6.57639 15.4514 7.22917 16.1042C7.88194 16.7569 8.66667 17.0833 9.58333 17.0833C10.5 17.0833 11.2847 16.7569 11.9375 16.1042C12.5903 15.4514 12.9167 14.6667 12.9167 13.75V5.62499C12.9167 5.44443 12.9757 5.29513 13.0938 5.17707C13.2118 5.05902 13.3611 4.99999 13.5417 4.99999C13.7222 4.99999 13.8715 5.05902 13.9896 5.17707C14.1076 5.29513 14.1667 5.44443 14.1667 5.62499V13.75C14.1667 15.0278 13.7222 16.1111 12.8333 17C11.9444 17.8889 10.8611 18.3333 9.58333 18.3333Z" fill="white"/>
            </svg> MENGEDIT LAMPIRAN</p>
          <p (click)="closePopup('attachments')" class="close-x cursor-pointer font-second font-medium text-sm text-teal-100">Close x</p>
      </div>
      <div class="body bg-background noise lg:bg-body h-[85vh] lg:h-[500px] overflow-y-scroll">
          <form id="form-edit-attachment" class="relative" [formGroup]="formAttachment" (submit)="submitAttachment()">
              <div class="divide-y divide-header pb-40 lg:pb-0">
                  <div class="p-5">
                      <p class="font-bold text-lg text-main mb-1">Lampiran</p>
                      <p class="text-black/80 text-sm font-second font-medium">Disini kamu dapat menampilkan CV dan Portfolio yang kamu didapatkan dari pekerjaan sebelumnya!</p>
                  </div>
                  <div class="divide-y divide-header px-5">
                      <div class="flex items-start gap-3 py-5">
                          <i class="uil uil-file-alt text-2xl text-main"></i>
                          <div class="w-full lg:w-max">
                              <p class="text-main font-bold text-lg">Curriculum Vitae (CV)*</p>
                              <p class="hidden lg:block font-second text-black/80 text-sm font-medium">Harap di perhatikan beberapa perusahaan masih mewajibkan penggunaan CV, tampilkan link yang dapat langsung mengarah ke CV mu, seperti Google Drive!</p>
                              <label class="flex items-center gap-3 mt-4 lg:mt-3">
                                  <span class="hidden lg:block text-black/80 tracking-[1.4px] font-normal text-sm">LINK</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input formControlName="atc_resume" id="popup-body-resume" type="url" name="atc_resume" placeholder="https://drive.google.com/file" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-sm placeholder-black/40 text-black/80 focus:border-main focus:ring-0 font-second
                                    focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                          </div>
                      </div>
                      <div class="flex items-start gap-3 py-5">
                          <i class="uil uil-brush-alt text-2xl text-main"></i>
                          <div class="">
                              <p class="text-main font-bold text-lg">Portfolio</p>
                              <p class="font-second text-black/80 text-sm font-medium">Tampilkan karya karya yang telah kamu buat sebelumnya, lampiran dapat berupa berbagai hal seperti GitHub, Behance, Google Drive, dll.</p>
                              <label class="flex items-center gap-3 mt-4 lg:mt-3">
                                  <span class="hidden lg:block text-black/80 tracking-[1.4px] font-normal text-sm">LINK</span>
                                  <!-- Using form state modifiers, the classes can be identical for every input -->
                                  <input formControlName="atc_portfolio" id="popup-body-portfolio" type="url" name="atc_portfolio" placeholder="https://drive.google.com/file" class="block border-2 border-gray-300 w-full lg:w-[360px] px-4 lg:px-3 py-4 lg:py-[10px] bg-header rounded-lg text-sm placeholder-black/40 text-black/80 focus:border-main focus:ring-0 font-second
                                    focus:invalid:border-red-500 focus:invalid:ring-red-500
                                  "/>
                              </label>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="fixed lg:mx-5 lg:mb-6 lg:static left-0 bottom-0 flex gap-3 w-full lg:w-max lg:ms-auto lg:justify-end mt-8 lg:p-0 lg:pe-0 border-t-2 lg:border-none border-main bg-background lg:bg-transparent">
                  <button (click)="closePopup('attachments')" type="button" class="close-x rounded-lg text-main py-4 lg:py-2 px-10 font-second text-base">Tutup</button>
                  <button type="submit" class="w-full lg:w-max lg:rounded-lg bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Simpan</button>
              </div>
          </form>
      </div>
  </div>
  `,
  styles: ``
})
export class ProfileAttachmentsPopupComponent implements OnInit {
  userService = inject(UserService)

  @Input() closePopup: any
  @Input() userData!: any
  @Output() userDataUpdated = new EventEmitter<string>()
  formAttachment = new FormGroup({
    atc_resume: new FormControl(""),
    atc_portfolio: new FormControl("")
  })

  ngOnInit(): void {
    this.formAttachment.controls['atc_resume'].setValue(this.userData.attachments.atc_resume)
    this.formAttachment.controls['atc_portfolio'].setValue(this.userData.attachments.atc_portfolio)
  }

  submitAttachment(){
    const attachmentData = this.formAttachment.value;

    this.userService.UpdateUserSpecificData(attachmentData, "attachments")
      .then(() => {
        this.closePopup("attachments");
        this.userDataUpdated.emit()
      })
      .catch((e) => {
        alert("ERROR");
        console.log(e);
      });
    }
}
