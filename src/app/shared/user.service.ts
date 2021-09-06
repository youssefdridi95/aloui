import { Injectable } from '@angular/core';
import { User } from './User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    profilepic: '',
    _id: '',
    name: '',
    email: '',
    username: '',
    type: '',
    createdAt: '',
    fcmToken: '',
    chatId: ''
  };
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }
  //HttpMethods

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/user',user,this.noAuthHeader);
  }

  ModifyUser(user: any){
    return this.http.post(environment.apiBaseUrl+'/modifyuser',user,this.noAuthHeader);
  }

  getAllUsers() {
  return this.http.get<any>(environment.apiBaseUrl+'/users',this.noAuthHeader)
  
  //    .toPromise()
    //    .then(res => <User[]>res.users)
   //     .then(users => { console.log(users); return users; });
        
  }

  verifyemail(email,code) {
    return this.http.post(environment.apiBaseUrl + '/verifyemail/'+email+'/'+code,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/auth',authCredentials,this.noAuthHeader);
  }
  ChangePassword(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/ChangePassword',authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userprofile');
  }

  getUserProfilebyemail(email)
  {
        return this.http.get(environment.apiBaseUrl + '/userprofilebyemail/'+email);
  }

  DeleteUser(id) {
    return this.http.delete(environment.apiBaseUrl + '/users/delete/'+id);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }


  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return true;
    else
      return false;
  }

  updateimg(imginfo : FormData)
  {
    console.log('posting update!')
    return this.http.post(environment.apiBaseUrl+'/updateImg',imginfo,this.noAuthHeader);
  }

  
}
