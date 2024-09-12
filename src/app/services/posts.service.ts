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
}
