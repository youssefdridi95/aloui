import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MessageService]
})
export class CheckoutComponent implements OnInit {
  isLinear = false; 
  firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    order_token: any;
    payment_status:boolean;
    private httpClient: HttpClient;

    constructor(private messageService: MessageService,private _formBuilder: FormBuilder,private handler: HttpBackend) { this.httpClient = new HttpClient(handler);}

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
          });
          this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
          });
    }   
    
check()
{
  var header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Token ccc3751ae3ae852090a13b51e7b45f3bdbfcfe24`)
  }
  this.httpClient.get<any>('https://sandbox.paymee.tn/api/v1/payments/'+this.order_token+'/check',header ).subscribe(data => {
    
    console.log(data);
});

}

    create()
    {
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Token ccc3751ae3ae852090a13b51e7b45f3bdbfcfe24`)
      }

   //   const headers = { 'Authorization': 'Token ccc3751ae3ae852090a13b51e7b45f3bdbfcfe24'};
      const body = { 
        "vendor" : 1707,
        "amount": 1.5,
        "note" : "Order #1000132"
     };
     
      this.httpClient.post<any>('https://sandbox.paymee.tn/api/v1/payments/create',body, header ).subscribe(data => {
         // this.order_token=Object.values(data['data'])[0];
          console.log(this.order_token);
      });


}

}
