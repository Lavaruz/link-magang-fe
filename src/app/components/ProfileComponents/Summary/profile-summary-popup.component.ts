import { Component, inject, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-summary-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="hidden popup popup-summary border-2 border-header w-full lg:w-[720px] rounded-t-2xl lg:rounded-2xl overflow-hidden">
        <form [formGroup]="formSummary" (submit)="submitSummary()">
            <div class="hidden header bg-main lg:flex justify-between px-5 py-3 items-center">
                <p class="font-normal text-white text-base tracking-[1.6px] flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10.0002 10C9.0835 10 8.29877 9.67362 7.646 9.02084C6.99322 8.36807 6.66683 7.58334 6.66683 6.66668C6.66683 5.75001 6.99322 4.96529 7.646 4.31251C8.29877 3.65973 9.0835 3.33334 10.0002 3.33334C10.9168 3.33334 11.7016 3.65973 12.3543 4.31251C13.0071 4.96529 13.3335 5.75001 13.3335 6.66668C13.3335 7.58334 13.0071 8.36807 12.3543 9.02084C11.7016 9.67362 10.9168 10 10.0002 10ZM5.00016 16.6667C4.54183 16.6667 4.14947 16.5035 3.82308 16.1771C3.49669 15.8507 3.3335 15.4583 3.3335 15V14.3333C3.3335 13.8611 3.45502 13.4271 3.69808 13.0313C3.94113 12.6354 4.26405 12.3333 4.66683 12.125C5.52794 11.6945 6.40294 11.3715 7.29183 11.1563C8.18072 10.941 9.0835 10.8333 10.0002 10.8333C10.9168 10.8333 11.8196 10.941 12.7085 11.1563C13.5974 11.3715 14.4724 11.6945 15.3335 12.125C15.7363 12.3333 16.0592 12.6354 16.3022 13.0313C16.5453 13.4271 16.6668 13.8611 16.6668 14.3333V15C16.6668 15.4583 16.5036 15.8507 16.1772 16.1771C15.8509 16.5035 15.4585 16.6667 15.0002 16.6667H5.00016Z" fill="white"/>
                  </svg> EDITING PROFILE SUMMARY</p>
                <p class="close-x cursor-pointer font-second font-medium text-sm text-teal-100">Close x</p>
            </div>
            <div class="body bg-background noise lg:bg-body p-5 pb-20 lg:pb-6">
                <p class="font-bold text-lg text-main">Your Profile Summary</p>
                <p class="text-white-60 font-second font-medium text-sm mb-3 mt-2">Ringkasan profil Anda adalah kesempatan Anda untuk memberikan kesan mendalam pada calon pemberi kerja! <a href="" class="text-main">Berikut adalah artikel</a> bermanfaat tentang cara membuat ringkasan profil yang menarik.</p>        
                <textarea formControlName="summary" rows="4" class="focus:ring-main focus:border-main block border-2 border-gray-300 resize-none px-3 py-[10px] w-full h-[240px] font-second text-black/80 bg-header rounded-lg" placeholder="Write your thoughts here..."></textarea>
                <div class="flex gap-3 lg:justify-end mt-8">
                    <button type="button" class="close-x rounded-lg bg-background text-main py-4 lg:py-2 px-10 font-second text-base">Cancel</button>
                    <button type="submit" class="rounded-lg lg:w-max w-full bg-main text-white py-4 lg:py-2 px-14 font-second text-base">Save</button>
                </div>
            </div>
        </form>
    </div>
  `,
  styles: ``
})
export class ProfileSummaryPopupComponent implements OnInit {
  
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
