import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
//import { Body } from '../../../node_modules1/@angular/http/src/body';


@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  constructor(private http: HttpClient) { 
    
  }
  createOrder(Body) {
    return this.http.post(environment.apiBaseUrl + '/createOrder',Body);
  }

  getteacherorders(email) {
    return this.http.get(environment.apiBaseUrl+'/getteacherorders/'+email);
    }

  getlearnerorders(email) {
    return this.http.get(environment.apiBaseUrl+'/getlearnerorders/'+email);
    }

  updatestatus(data) {
      return this.http.post(environment.apiBaseUrl+'/orders/updatestatus',data);
      }
}
