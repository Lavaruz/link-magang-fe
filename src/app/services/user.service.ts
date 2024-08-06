import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private requestService: RequestService, private cookieService: CookieService) {}

  async getUserData(){
    const userData:any = await this.requestService.getEncryptedRequest(`/api/v1/users/info`)
    return userData
  }
  
  async updateUserData(userData:any){
    const updatedData = await this.requestService.putEncryptedRequest("/api/v1/users", userData)
    return updatedData
  }

  async getUserEducations(){
    const educationsData:any = await this.requestService.getEncryptedRequest(`/api/v1/users/info/educations`)
    return educationsData
  }

  async getUserExperiences(){
    const experiencesData:any = await this.requestService.getEncryptedRequest(`/api/v1/users/info/experiences`)
    return experiencesData
  }



  // ----------- AUTHENTICATION --------------

  async loginUser(userData:any){
    const LOGIN:any = await this.requestService.postEncryptedRequest("/api/v1/users/auth/google", userData)
    this.cookieService.set("access-token", LOGIN)
    // const LOGIN = this.cookieService.delete("access-token")
    return LOGIN
  }

  async logoutUser(){
    const LOGOUT = this.cookieService.delete("access-token")
    return LOGOUT
  }

  async verifyToken(){
    const isVerified = await this.requestService.getEncryptedRequest(`/api/v1/users/verify-token`)
    return isVerified
  }
}
