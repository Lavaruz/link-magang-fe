import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-summary-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="hidden popup popup-summary border-2 border-main w-full lg:w-[720px] rounded-2xl overflow-hidden lg:rounded-2xl overflow-hidden">
        <form id="form-profile-summary" [formGroup]="formSummary" (submit)="submitSummary()">
            <div class="hidden header bg-main lg:flex justify-between px-5 py-3 items-center">
                <p class="font-normal text-white text-base tracking-[1.6px] flex items-center gap-2">MENGEDIT RINGKASAN PROFIL</p>
                <p (click)="closePopup('summary')" class="close-x cursor-pointer font-second font-medium text-sm text-teal-100">Close x</p>
            </div>
            <div class="body bg-background noise lg:bg-body p-5 pb-20 lg:pb-6">
                <p class="font-bold text-lg text-main">Ringkasan Profilmu</p>
                <p class="text-black/80 font-second font-medium text-sm mb-3">Ringkasan profil adalah kesempatan kamu untuk memberikan kesan mendalam pada orang lain!, tuliskan ringkasan yang menggambarkan kamu secara keseluruhan dengan menarik.</p>        
                <textarea formControlName="summary" id="popup-summary-textarea" rows="8" name="summary" class="focus:ring-0 focus:border-main block border-2 border-gray-300 resize-none px-3 py-2.5 w-full font-second text-sm text-black/80 rounded-lg" placeholder="Tuliskan tentang dirimu disini..."></textarea>
                <div class="flex gap-3 lg:justify-end mt-8">
                    <button (click)="closePopup('summary')" type="button" class="close-x rounded-lg bg-teal-8 text-main py-4 lg:py-2 px-10 font-second text-base">Tutup</button>
                    <button type="submit" class="rounded-lg lg:w-max w-full bg-main py-4 lg:py-2 px-14 text-white">Simpan</button>
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
  @Output() userDataUpdated = new EventEmitter<string>()
  formSummary!:FormGroup

  ngOnInit(): void {
    this.formSummary = new FormGroup({
      summary: new FormControl(this.userData.summary)
    })
  }

  submitSummary() {
    const summaryData = this.formSummary.value;

    this.userService.updateUserData(summaryData)
      .then(() => {
        this.closePopup("summary");
        this.userDataUpdated.emit()
      })
      .catch((e) => {
        alert("ERROR");
        console.log(e);
      });
  }
}
