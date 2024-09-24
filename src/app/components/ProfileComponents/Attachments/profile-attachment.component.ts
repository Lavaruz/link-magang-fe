import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../interface/user.interface';

@Component({
  selector: 'app-profile-attachments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="attachments bg-white border-main border-2 noise rounded-2xl p-4 pb-6 shadow-md">
        <div class="w-100 flex items-center justify-between rounded-t-2xl">
            <p class="text-main flex items-center gap-2"><i class="uil uil-file-alt"></i> LAMPIRAN</p>
            <p (click)="openPopup('attachments')" id="edit-attachment" class="cursor-pointer text-main text-sm font-second flex items-center gap-2">Edit</p>
        </div>
        <p class="font-second text-sm font-semibold text-black/80 mt-3 mb-4">Kamu bisa menambahkan CV dan Portfolio terbarumu disini!</p>
        <div class="">
            <div class="attachment-body-resume">
                <p class="flex items-center gap-2 text-black/80">CURRICULUM VITAE*</p>
                <div class="porto flex items-center bg-background rounded-lg border border-main justify-between p-3 mt-2">
                    <div class="truncate w-[70vw] lg:w-full">
                        <a [href]="userData.attachments.atc_resume" target="_blank" class="font-second text-sm text-main flex items-center gap-2 truncate"><i class="uil uil-link-h text-main"></i>{{userData.attachments.atc_resume || "-"}}</a>
                    </div>
                </div>
            </div>
            <div class="mt-3 attachment-body-portfolio">
                <p class="flex items-center gap-2 text-black/80">PORTFOLIO</p>
                <div class="porto flex items-center bg-background border border-main rounded-lg justify-between p-3 mt-2">
                    <div class="flex items-center gap-2 w-full">
                        <div class="truncate w-[70vw] lg:w-full">
                            <a target="_blank" [href]="userData.attachments.atc_portfolio" class="font-second text-sm text-main flex items-center gap-2 text-ellipsis">
                                <i class="uil uil-link-h text-main"></i>
                                {{ userData.attachments.atc_portfolio || "-" }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
})
export class ProfileAttachmentsComponent {
  @Input() userData!: UserInterface
  @Input() openPopup: any
}
