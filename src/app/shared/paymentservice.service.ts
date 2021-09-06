import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentserviceService {
   header1 = {
    'Authorization': 'Token ccc3751ae3ae852090a13b51e7b45f3bdbfcfe24',
  }

 headers = { 'Authorization': 'Token ccc3751ae3ae852090a13b51e7b45f3bdbfcfe24'};

  constructor(private http: HttpClient) { }

 
}
