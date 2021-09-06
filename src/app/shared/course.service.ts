import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Course } from './course.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  selectedCourse : Course;
  courses : Course [];
  HttpUploadOptions = {
    headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })}
  constructor(private http: HttpClient) { }
 
  getCourse(id) {
    return this.http.get(environment.apiBaseUrl + '/getonecourse/'+id);
  }

  getCourseList() {
    return this.http.get(environment.apiBaseUrl+'/getCourse');
    }

    modifyCourse(course: any){
      return this.http.post(environment.apiBaseUrl+'/ModifyCourse',course);
    }

  addCourse(course: FormData)
  {
    console.log(course);
    return this.http.post(environment.apiBaseUrl+'/addcourse',course);
  }
  DeletCourse(id) {
    return this.http.delete(environment.apiBaseUrl + '/courses/delete/'+id);
  }

  mycourses(id) {
    return this.http.get(environment.apiBaseUrl + '/getmycourses/'+id);
  }

  fetchCourses() {
    return this.http.get<Array<object>>(environment.apiBaseUrl + '/getCourse');
  }
  fetchCourseById(id: string) {
    return this.http.get(environment.apiBaseUrl + '/getonecourse/'+id);
  }
  purchaseCourse(course, user) {
    console.log(course._id);
    console.log(user._id);
    return this.http.patch<object>(environment.apiBaseUrl+'/courses/'+user._id+'/'+course._id, { });
  }
  fetchCoursesByCategory(category: String) {
    return this.http.get<Array<object>>(environment.apiBaseUrl + `/courses?category=${category}`)
  }
  rateCourse(course, rating) {
    return this.http.put<object>(environment.apiBaseUrl+'/courses/'+course._id+'/rate', rating);
  }
  fetchCategories() {
    return this.http.get<any>(`${environment.apiBaseUrl}/course/categories`);
  }
  createCourseEvent(course, user ) {
    return this.http.post<any>(environment.apiBaseUrl+'/courses/'+course._id+'/invite-user', user);
  }
  
}
