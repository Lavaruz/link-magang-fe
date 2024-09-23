import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent{
  userService = inject(UserService)
  router = inject(Router)
  FORM_LOGIN = new FormGroup({
    credentials: new FormControl("")
  })

  submitFormCredentials(): void {
    if(this.FORM_LOGIN.invalid) return

    const formData = this.FORM_LOGIN.value
    this.userService.adminLoginHandler(formData).then(loginData => {
      this.userService.setCookie({role:"admin"}, "adminAuthenticate")
      this.router.navigate(["/admin/posts"])
    }).catch(err => {
      console.error(err.error);
    })
    
  }
}
