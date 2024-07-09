import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.development';
import CryptoJS from "crypto-js"

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private rootURL: string = environment.rootURL;

  constructor(private http: HttpClient) { }

  getURL(){
    return this.rootURL
  }

  HandleFormData(formdata: FormData): FormData {
    let json: { [key: string]: any } = {};
    let list_keys: string[] = [];

    formdata.forEach((entries: any, keys: string) => {
      if (!(entries instanceof File)) {
        json[keys] = entries;
        list_keys.push(keys);
      }
    });

    for (let a = 0; a < list_keys.length; a++) {
        formdata.delete(list_keys[a]);
    }

    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(json), environment.AES_KEY.toString()).toString();
    formdata.append('d', encryptedData);
    return formdata;
  }

  getHeaders({options = null, return_type = 'HttpHeaders'}: any = {}) {
    var list_headers: any = {
      'key': "Aljshdbas8D70whbnaSjdbaks9",
      'web_role': 'marketplace',
      // 'Authorization': this.user.getAuthentication(),
      // 'responseType': 'json'
    }
      
    if(options == null)
      list_headers['Content-Type'] = 'application/json';
    else {
      for(let option in options) {
        list_headers[option] = options[option];
      }
    }

    let httpOptions;
    if(return_type == 'HttpHeaders') {
      httpOptions = {
        headers: new HttpHeaders(list_headers),
        observe: 'response' as 'response'
      };
    } else{
      httpOptions = list_headers;
    }

      return httpOptions;
  }

  decryptData(data:any) {
    if(environment.secure == false || !data.r) return data;
    
    var decData = CryptoJS.AES.decrypt(data.r, environment.AES_KEY.toString()).toString(CryptoJS.enc.Utf8);
    
    return JSON.parse(decData);
  }

  encryptData(data:any) {
    if(environment.secure == false) return data;
    
    if(typeof data == 'object') {
      data = JSON.stringify(data);
    } else if(data instanceof FormData) {
      data = this.HandleFormData(data);
      return data
    }

    return {d: CryptoJS.AES.encrypt(data, environment.AES_KEY.toString()).toString()};
  }

  getEncryptedRequest(url: string = ""): Promise<any> {
    
    const toURL = `${this.rootURL}${url}`;

    return new Promise((resolve, reject) => {
      this.http.get<any>(toURL)
        .subscribe({
          next: (response) => {
            let decryptedData = this.decryptData(response);
            resolve(decryptedData);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }

  postEncryptedRequest(url: string = "", post_data: any  = {}, option:any={}) {
    const toURL = `${this.rootURL}${url}`;
    const httpOptions = this.getHeaders(option)
    post_data = this.encryptData(post_data)

    return new Promise((resolve, reject) => {
      this.http.post<any>(toURL, post_data, httpOptions)
        .subscribe({
          next: (response:any) => {
            let decryptedData = this.decryptData(response.body);
            resolve(decryptedData);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  } 
}