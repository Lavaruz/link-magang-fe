import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import $ from "jquery"
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../../services/posts.service';
import { UtilsService } from '../../../../services/utils.service';


@Component({
  selector: 'app-profile-completion',
  standalone: true,
  imports: [NgOptimizedImage, NavbarComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './completion.component.html',
})
export class ProfileCompletionComponent implements OnInit {
  userService = inject(UserService)
  postService = inject(PostsService)
  utilService = inject(UtilsService)
  aRoute = inject(ActivatedRoute)
  router = inject(Router)


  SKILL_DATAS:any = []
  ACTIVE_SKILLS:any = []
  QUERY:any = {}
  selectedSkills: any[] = [];
  IS_SUBMITED = false

  POST_DATAS:any = []
  POST_COUNT:number = 0

  DONE_LOADING = false
  searchText: string = '';

  ngOnInit() {
    if(!this.userService.checkAuth()) this.router.navigate(["/"])
    this.aRoute.queryParams.subscribe(params => {
      this.QUERY = {
        skills: params["skills"] || "",
      }
      this.postService.GetAllPostsReleatedSkill(this.QUERY).then(postData => {
        this.POST_DATAS = postData.datas
        this.POST_COUNT = postData.total_entries
      })
    })
    this.userService.GetAllSkills().then(skillsData => {
      this.SKILL_DATAS = skillsData
      this.DONE_LOADING = true
    })
  }

  filteredSkills() {
    if (!this.searchText) {
      return this.SKILL_DATAS;
    }
    return this.SKILL_DATAS.filter((skill:any) =>
      skill.skill.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  setSkillsToActive(skill: any, event: any) {
    if (event.target.checked) {
      this.ACTIVE_SKILLS.push(skill.id); // Simpan skill.id
    } else {
      this.ACTIVE_SKILLS = this.ACTIVE_SKILLS.filter((id:any) => id !== skill.id); // Hapus berdasarkan skill.id
    }
  }

  removeSkill(skillId:any){
    $(`#skill-${skillId}`).prop("checked", false)
    this.ACTIVE_SKILLS = this.ACTIVE_SKILLS.filter((id:any) => id !== skillId);
    this.selectedSkills = this.selectedSkills.filter((skill:any) => skill !== this.getSkillName(skillId));
    this.updateSkillsQuery()    
  }

  getSkillName(skillId: any) {
    const skill = this.SKILL_DATAS.find((s:any) => s.id === skillId);
    return skill ? skill.skill : '';
  }

  toggleSkill(skill: any) {
    const index = this.selectedSkills.indexOf(skill.skill);
    if (index === -1) {
      this.selectedSkills.push(skill.skill); // Tambahkan jika skill belum ada di checklist
    } else {
      this.selectedSkills.splice(index, 1); // Hapus jika skill sudah ada di checklist
    }
    this.updateSkillsQuery();
  }

  updateSkillsQuery() {
    this.QUERY.skills = this.selectedSkills.join(";");
    
    this.router.navigate([], {
      queryParams: {
        skills: this.selectedSkills.join(";")
      },
      queryParamsHandling: 'merge'
    });
  }

  isSkillChecked(skill: any): boolean {
    return this.selectedSkills.includes(skill.skill);
  }

  handleSaveSkill(){
    this.IS_SUBMITED = true
    this.userService.updateUserSkills(this.ACTIVE_SKILLS.join(";")).then(() => {
      setTimeout(() => {
        this.router.navigate(["/posts/foryou"])
      }, 500)
    }).catch(err => {
      alert("ERROR")
    })
  }






  getActiveSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(0, 4);
  }

  getRemainingSkills(skills: { skill: string }[]): { skill: string }[] {
    return skills.slice(4);
  }

  timeAgo(dateString: any) {
    const date: any = new Date(dateString);
    const now: any = new Date();
  
    // Menghilangkan perbedaan waktu agar hanya tanggal yang dibandingkan
    date.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
  
    const diffInMilliseconds = now - date;
  
    // Konversi milidetik ke hari yang benar
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
    if (diffInDays < 7) {
      return `minggu ini`;
    } else if (diffInDays < 14) {
      return `minggu lalu`;
    } else {
      return `beberapa minggu lalu`;
    }
  }  

  timeAgoNumber(dateString: any) {
    const date: any = new Date(dateString);
    const now: any = new Date();
  
    // Menghilangkan perbedaan waktu agar hanya tanggal yang dibandingkan
    date.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
  
    const diffInMilliseconds = now - date;
  
    // Konversi milidetik ke hari yang benar
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
    return diffInDays
  }

  getPlatformImageUrl(platform: any): string {
    switch (platform) {
      case 'Glints':
        return 'assets/img/Glints.webp';
      case 'Linkedin':
        return 'assets/img/Linkedin.webp';
      case 'Kalibrr':
        return 'assets/img/Kalibrr.webp';
      case 'Jobstreet':
        return 'assets/img/Jobstreet.webp';
      case 'Indeed':
        return 'assets/img/Indeed.webp';
      case 'Dealls':
        return 'assets/img/Dealls.webp';
      case 'Kitalulus':
        return 'assets/img/Kitalulus.webp';
      default:
        return 'assets/img/Other.webp';
    }
  }  

  openLoginPanel(){
    $("#popup-layer-navbar").fadeIn(function() {
      $("#popup-login").slideToggle("fast");
      $("body").css("overflow", "hidden");
    }).css("display", "flex");
  }

  closeLoginPanel(){
    $("#popup-login").slideToggle(function() {
      $("#popup-layer-navbar").fadeOut(function() {
          $("body").css("overflow", "auto");
      });
    });
  }
}
