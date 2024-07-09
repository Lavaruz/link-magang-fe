import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private requestService: RequestService, private cookieService: CookieService) {}

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
