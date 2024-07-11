import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private requestService: RequestService, private cookieService: CookieService) {}

  async getUserData(){
    const TOKEN = this.cookieService.get("access-token")
    const userData:any = await this.requestService.getEncryptedRequest(`/api/v1/users/info?token=${TOKEN}`)
    return userData
  }

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
    const TOKEN = this.cookieService.get("access-token");
    const isVerified = await this.requestService.getEncryptedRequest(`/api/v1/users/verify-token?token=${TOKEN}`)
    return isVerified
  }
}
