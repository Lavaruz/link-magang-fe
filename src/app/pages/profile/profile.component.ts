import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule, Location, NgIf } from '@angular/common';
import { UserInterface } from '../../interface/user.interface';
import $ from "jquery"
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// IMPORT COMPONENTS
import { ProfileBasicInformationComponent } from '../../components/ProfileComponents/BasicInformation/profile-basic-information.component';
import { ProfileBasicInformationPopupComponent } from '../../components/ProfileComponents/BasicInformation/profile-basic-information-popup.component';
import { ProfileSummaryComponent } from '../../components/ProfileComponents/Summary/profile-summary.component';
import { ProfileSummaryPopupComponent } from '../../components/ProfileComponents/Summary/profile-summary-popup.component';
import { ProfileExperiencesComponent } from '../../components/ProfileComponents/Experiences/profile-experiences.component';
import { ProfileExperiencesPopupComponent } from '../../components/ProfileComponents/Experiences/profile-experiences-popup.component';
import { ProfileEducationsComponent } from '../../components/ProfileComponents/Educations/profile-educations.component';
import { ProfileEducationsPopupComponent } from '../../components/ProfileComponents/Educations/profile-educations-popup.component';
import { ExperienceInterface } from '../../interface/experience.interface';
import { EducationInterface } from '../../interface/education.interface';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProfileSkillsComponent } from '../../components/ProfileComponents/Skills/profile-skills.component';
import { ProfileSkillsPopupComponent } from '../../components/ProfileComponents/Skills/profile-skills-popup.component';
import { ProfileAttachmentsComponent } from '../../components/ProfileComponents/Attachments/profile-attachment.component';
import { ProfileAttachmentsPopupComponent } from '../../components/ProfileComponents/Attachments/profile-attachment-popup.component';
import { ProfileSocialsComponent } from '../../components/ProfileComponents/Socials/profile-socials.component';
import { ProfileSocialsPopupComponent } from '../../components/ProfileComponents/Socials/profile-socials-popup.component';
import { ProfileTalentComponent } from '../../components/ProfileComponents/TalentHunt/profile-talent.component';
import { ProfileTalentPopupComponent } from '../../components/ProfileComponents/TalentHunt/profile-talent-popup.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, 
    ProfileBasicInformationComponent, ProfileBasicInformationPopupComponent,
    ProfileSummaryComponent, ProfileSummaryPopupComponent,
    ProfileExperiencesComponent, ProfileExperiencesPopupComponent,
    ProfileEducationsComponent, ProfileEducationsPopupComponent,
    ProfileSkillsComponent, ProfileSkillsPopupComponent,
    ProfileAttachmentsComponent, ProfileAttachmentsPopupComponent,
    ProfileSocialsComponent, ProfileSocialsPopupComponent,
    ProfileTalentComponent, ProfileTalentPopupComponent,
    NavbarComponent
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  userService: UserService = inject(UserService);

  FORM_BASIC:FormGroup = new FormGroup("")
  FORM_SUMMARY:FormGroup = new FormGroup("")

  USER!: UserInterface
  EXPERIENCES!: ExperienceInterface[]
  EDUCATIONS!: EducationInterface[]

  DONE_LOADING = false

  constructor( private location: Location){}

  async ngOnInit() {
    try {
      this.userService.getUserData().then(userData => {
        this.USER = userData
        this.EDUCATIONS = userData.educations
        this.EXPERIENCES = userData.experiences
        this.DONE_LOADING = true
      })
      
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Tambahkan penanganan kesalahan sesuai kebutuhan Anda.
    }

  }






  ngAfterViewInit(){
    $(".close-x").click(function(){
      $(this).closest(".popup").slideToggle(function(){
        $("#popup").fadeOut()
        $("body").css("overflow", "auto")
      })
    })
  }
  openPopup(name:any){
    $("#popup").fadeIn(function(){
      $(`.popup-${name}`).slideToggle()
      $("body").css("overflow", "hidden")
    }).css("display","flex");
  }
  closePopup(name:any){
    $(`.popup-${name}`).slideToggle(function(){
      $("#popup").fadeOut()
      $("body").css("overflow", "auto")
    })
  }
  toParagraph(summary:any){
    if (!summary) return ''; // pastikan summary tidak null atau undefined
    // Memisahkan teks berdasarkan baris baru (\n) dan menggabungkan dengan <br>
    return summary.split('\n').map((line:any) => line.trim()).join('<br>');
  }





  buttonLogout(){
    this.userService.deleteCookie(false)
    this.location.back()
  }

  public formatDateMonth(inputDate:any) {
      // Parse tanggal dalam format "YYYY-MM-DD"
      const dateParts = inputDate.split('-');
      const year = dateParts[0];
      const month = dateParts[1];

      // Daftar nama bulan
      const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
          'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
      ];

      // Konversi komponen bulan ke nama bulan
      const formattedMonth = monthNames[parseInt(month, 10) - 1];

      // Gabungkan komponen-komponen dalam format yang diinginkan
      const formattedDate = `${formattedMonth} ${year}`;

      return formattedDate;
  }

  public calculateMonthDifference(startDate:any, endDate:any) {
      let start = new Date(startDate);
      let end = new Date(endDate);

      let yearDiff = end.getFullYear() - start.getFullYear();
      let monthDiff = end.getMonth() - start.getMonth();

      if (monthDiff < 0) {
          yearDiff -= 1;
          monthDiff += 12;
      }

      if (yearDiff === 0) {
          return `${monthDiff} Bulan`;
      } else if (yearDiff === 1) {
          return `1 Tahun ${monthDiff} Bulan`;
      } else {
          return `${yearDiff} Tahun ${monthDiff} Bulan`;
      }
  }

  public getFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Dapat ditambahkan 1 karena bulan dimulai dari 0.
      const day = String(today.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
  }

}
