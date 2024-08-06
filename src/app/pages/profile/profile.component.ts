import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Location, NgIf } from '@angular/common';
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

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf, ReactiveFormsModule, 
    ProfileBasicInformationComponent, ProfileBasicInformationPopupComponent,
    ProfileSummaryComponent, ProfileSummaryPopupComponent,
    ProfileExperiencesComponent, ProfileExperiencesPopupComponent,
    ProfileEducationsComponent, ProfileEducationsPopupComponent
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

  constructor( private location: Location){
    this.userService.getUserData().then((userData:UserInterface) => {
      this.USER = userData
    })
    this.userService.getUserEducations().then((educationData: EducationInterface[]) => {
      this.EDUCATIONS = educationData
    })
    this.userService.getUserExperiences().then((experienceData: ExperienceInterface[]) => {
      this.EXPERIENCES = experienceData
    })
  }

  async ngOnInit() {
    try {
      
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






  logoutFunction(){
    this.userService.logoutUser()
    this.location.back()
  }

}
