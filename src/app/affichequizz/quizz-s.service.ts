import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizzSService {

  constructor(private http: HttpClient) {
  }
  getAllQuizzUsingGETResponse(): __Observable<any> {
    return this.http.get(environment.apiBaseUrl+'/quizz/getQuizz');
      
  }
  addQuizz(quizz: FormData)
  {
    console.log(quizz.values);
    return this.http.post(environment.apiBaseUrl+'/quizz/addQuizz',quizz);
  }
  getQuizz(id) {
   return this.http.get(environment.apiBaseUrl + '/quizz/getonequizz/'+id);
  }

}
