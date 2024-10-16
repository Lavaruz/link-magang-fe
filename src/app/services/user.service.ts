import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public cookieData: any = {};
  private authValue: any;
  private JWT_EXPIRED = 1;
  private oneDay = 24 * 60 * 60 * 1000;
  private expired_time = new Date(new Date().getTime() + this.JWT_EXPIRED * this.oneDay);
  public userData: any = {};


  constructor(private requestService: RequestService, private cookieService: CookieService) {}

  checkAuth(cookieName:any = "userAuthenticate") {
    return this.cookieService.check(cookieName);
  }

  setCookie(value: any, key = 'userAuthenticate') {
    this.cookieService.set(key, (typeof value == 'string') ? value : JSON.stringify(value), this.expired_time, '/');
    
    if (key === 'userAuthenticate') {
      this.authValue = value;
    } else {
      this.cookieData[key] = value;
    }
  }

  deleteCookie(reload = true) {
    new Promise((resolve: any) =>{
      // this.cookieService.set('wbAuthentication', '', 1000);
      this.cookieService.deleteAll('/');
      this.authValue = '';
      this.userData = {};
      this.cookieData = {};
      resolve();
    })
    .then(() =>{
      if(reload) {
        location.reload()
      }
    }); 
  }

  getCookieData(key: any) {
    var retData: any = '';

    if(this.cookieData[key])
        retData = this.cookieData[key];
    else 
        retData = (this.IsJsonString(this.cookieService.get(key))) ? JSON.parse(this.cookieService.get(key)) : this.cookieService.get(key);
    
    return retData;
  }

  IsJsonString(str: any) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }





  async getUserData(){
    const userData:any = await this.requestService.getEncryptedRequest(`/api/v1/users/info`)
    return userData
  }
  async getUserById(id:any){
    const userData:any = await this.requestService.getEncryptedRequest(`/api/v1/users/${id}`)
    return userData
  }
  async getAllUserActiveData(QUERY:any){
    const userData:any = await this.requestService.getEncryptedRequest(
      `/api/v1/users/active?gender=${QUERY.gender}&work_pref=${QUERY.work_pref}&institute=${QUERY.institute}&edu_type=${QUERY.edu_type}&gpa=${QUERY.gpa}&search_person=${QUERY.search_person}&limit=${QUERY.limit}&page=${QUERY.page}`
    )
    return userData
  }
  
  async updateUserData(userData:any){
    const updatedData = await this.requestService.putEncryptedRequest("/api/v1/users", userData)
    return updatedData
  }
  async updateUserSkills(skillData:any){
    const updatedSkill = await this.requestService.putEncryptedRequest("/api/v1/users/info/skills", skillData)
    return updatedSkill
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

  async googleLoginHandler(userData:any){
    const userAuthenticate:any = await this.requestService.postEncryptedRequest("/api/v1/users/auth/google", userData)
    return userAuthenticate
  }

  async adminLoginHandler(loginData:any){
    const adminAuthenticate:any = await this.requestService.postEncryptedRequest("/api/v1/users/admin/login", loginData)
    return adminAuthenticate
  }

  async logoutUser(){
    const LOGOUT = this.cookieService.delete("access-token")
    return LOGOUT
  }

  async verifyToken(){
    const isVerified = await this.requestService.getEncryptedRequest(`/api/v1/users/verify-token`)
    return isVerified
  }


  // -------------- USER RELEATED ----------------

  async GetAllLocations() {
    try {
      const locationsData = await this.requestService.getEncryptedRequest(`/api/v1/users/locations`);
      return locationsData
    } catch (error) {
      console.error('Error on Get Membership Price:', error);
    }
  }
  async GetAllSkills() {
    try {
      const skillsData = await this.requestService.getEncryptedRequest(`/api/v1/users/skills`);
      return skillsData
    } catch (error) {
      console.error('Error on Get Membership Price:', error);
    }
  }
  async GetAllSavedPost() {
    try {
      const savedPost = await this.requestService.getEncryptedRequest(`/api/v1/users/info/saved-post`);
      return savedPost
    } catch (error) {
      console.error('Error on Get All Saved Post:', error);
    }
  }
  async HandleSavedPost(data:any) {
    try {
      const savedPost = await this.requestService.postEncryptedRequest(`/api/v1/users/info/saved-post`, data);
      return savedPost
    } catch (error) {
      return console.error('Error on Get All Saved Post:', error);
    }
  }

  


  async GetAllProfilePictureAvailable(){
    const picturesData = await this.requestService.getEncryptedRequest(`/api/v1/users/pictures`)
    return picturesData
  }
  async GetAllSpesificData(route:string){
    const fetchedData = await this.requestService.getEncryptedRequest(`/api/v1/users/info/${route}`)
    return fetchedData
  }
  async UpdateUserSpecificData(data:any, route:string){
    const updatedData = await this.requestService.putEncryptedRequest(`/api/v1/users/info/${route}`, data)
    return updatedData
  }
  async UpdateUserEduExpData(id:any, data:any, route:string){
    const updatedData = await this.requestService.putEncryptedRequest(`/api/v1/users/info/${route}/${id}`, data)
    return updatedData
  }
  async DeleteUserEduExpData(id:any, route:string){
    const updatedData = await this.requestService.deleteEncryptedRequest(`/api/v1/users/info/${route}/${id}`)
    return updatedData
  }
  async AddUserSpesificData(data:any, route:string){
    const addedData = await this.requestService.postEncryptedRequest(`/api/v1/users/info/${route}`, data)
    return addedData
  }



  async AddNewSkill(skillName:any) {
    try {
      const skillsData:any = await this.requestService.postEncryptedRequest(`/api/v1/users/skills`, skillName);
      return skillsData
    } catch (error) {
      console.error('Error on Get Membership Price:', error);
    }
  }
  async AddNewLocation(locationName:any) {
    try {
      const locationData:any = await this.requestService.postEncryptedRequest(`/api/v1/users/locations`, locationName);
      return locationData
    } catch (error) {
      console.error('Error on Get Membership Price:', error);
    }
  }
}
