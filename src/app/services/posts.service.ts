import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private requestServices: RequestService) { }

  async GetAllPosts(QUERY: any) {
    try {
      const postData = await this.requestServices.getEncryptedRequest(`/api/v1/posts?limit=${QUERY.limit}&page=${QUERY.page}&search=${QUERY.search}&platform=${QUERY.platform}`);
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
