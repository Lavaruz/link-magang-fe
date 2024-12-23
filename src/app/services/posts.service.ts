import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private requestServices: RequestService) { }

  async GetAllPosts(QUERY: any) {
    try {
      const postData = await this.requestServices.getEncryptedRequest(`/api/v1/posts?limit=${QUERY.limit}&page=${QUERY.page}&search=${QUERY.search}&type=${QUERY.type}&locations=${QUERY.locations}&skills=${QUERY.skills}`);
      return postData
    } catch (error) {
      console.error('Error on Get Membership Price:', error);
    }
  }

  async GetAllPostsReleatedSkill(QUERY: any) {
    try {
      const postData = await this.requestServices.getEncryptedRequest(`/api/v1/posts/skills?skills=${QUERY.skills}`);
      return postData
    } catch (error) {
      console.error('Error on Get Post Releated Skill:', error);
    }
  }

  async GetAllPostsInternal(QUERY: any) {
    try {
      const postData = await this.requestServices.getEncryptedRequest(`/api/v1/posts/internal?limit=${QUERY.limit}&page=${QUERY.page}&search=${QUERY.search}&type=${QUERY.type}&locations=${QUERY.locations}&skills=${QUERY.skills}`);
      return postData
    } catch (error) {
      console.error('Error on Get Membership Price:', error);
    }
  }
  async GetAllPostsPartner(QUERY: any) {
    try {
      const postData = await this.requestServices.getEncryptedRequest(`/api/v1/posts/partner?limit=${QUERY.limit}&page=${QUERY.page}&search=${QUERY.search}&type=${QUERY.type}&locations=${QUERY.locations}&skills=${QUERY.skills}`);
      return postData
    } catch (error) {
      console.error('Error on Get Membership Price:', error);
    }
  }

  async GetAllMatchPosts(QUERY: any) {
    try {
      const postData = await this.requestServices.getEncryptedRequest(`/api/v1/posts/match?limit=${QUERY.limit}&page=${QUERY.page}&search=${QUERY.search}`);
      return postData
    } catch (error) {
      console.error('Error on Get Membership Price:', error);
    }
  }

  async GetPostById(CARD_ID: any) {
    try {
      const postData = await this.requestServices.getEncryptedRequest(`/api/v1/posts/${CARD_ID}`);
      return postData
    } catch (error) {
      console.error('Error on Get Membership Price:', error);
    }
  }

  async GetCountAllPosts() {
    try {
      const postData = await this.requestServices.getEncryptedRequest(`/api/v1/posts/count-all`);
      return postData
    } catch (error) {
      console.error('Error on Get Membership Price:', error);
    }
  }

  async CreateNewPost(newPostData:any) {
    try {
      const postData:any = await this.requestServices.postEncryptedRequest(`/api/v1/posts`, newPostData, { httpOptions: {} });
      return postData
    } catch (error) {
      return error
    }
  }

  async UpdatePostById(newPostData:any, id:string) {
    try {
      const postData:any = await this.requestServices.putEncryptedRequest(`/api/v1/posts/${id}`, newPostData, { httpOptions: {} });
      return postData
    } catch (error) {
      return error
    }
  }

  async DeletePosts(postIds:any) {
    try {
      const postData:any = await this.requestServices.deleteEncryptedRequest(`/api/v1/posts?ids=${postIds}`);
      return postData
    } catch (error) {
      return error
    }
  }
}
