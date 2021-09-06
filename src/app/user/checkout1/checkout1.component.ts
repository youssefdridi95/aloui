import { Component, OnInit, ElementRef,ViewChild, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import * as Rellax from 'rellax';
import { UserService } from '../../shared/user.service';
import { OrderserviceService } from '../../shared/orderservice.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators  } from "@angular/forms";
import { FileUploadService } from "../../shared/file-upload.service";
import { HttpClient, HttpEvent, HttpEventType,HttpHeaders, HttpBackend} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AngularTawkComponent } from 'angular-tawk';
import { PrimeNGConfig } from 'primeng/api';
import { CourseService } from '../../shared/course.service';
//import { Course } from 'app/shared/course.model';
import {CdkPortal,DomPortalHost} from '@angular/cdk/portal';
//import { create } from '../../../../node_modules1/@angular/language-service/index';

@Component({
  selector: 'app-checkout1',
  templateUrl: './checkout1.component.html',
  styleUrls: ['./checkout1.component.scss'],
  providers: [MessageService]
  
})
export class Checkout1Component implements OnInit {
  coursecreator; 
  img;
  nbhours;
  note;
  finaltime;
  finaldate;
  clndr:Date;
  d: number[] = [];
  blockeddays;
  startday;
  endday;
  startdaynb:number;
  enddaynb:number;
  payment_status:boolean = null;
  order_token;
  @ViewChild(CdkPortal) portal: CdkPortal;
  private externalWindow = null;
  private httpClient: HttpClient;
  currentamount;
  packages: string[];
  selectedPackage= 'Basic';
  rating=5;
  profilep = null;
  imgURL: any;
  public imagePath;
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
    data : Date = new Date();
    focus;
    focus1;
    userDetails;
    displayBasic2: boolean;
    @ViewChild('fileInput',{static:false}) fileInput: ElementRef;
    isLinear = false; 
    firstFormGroup: FormGroup;
      secondFormGroup: FormGroup;
      thirdFormGroup: FormGroup;
      nm;
      currentcource:any;
    constructor(private orderService : OrderserviceService ,private handler: HttpBackend, private componentFactoryResolver: ComponentFactoryResolver,private applicationRef: ApplicationRef, private injector: Injector, private courseService : CourseService, private messageService: MessageService, private userService: UserService, private router: Router,private _formBuilder: FormBuilder) {
        this.packages = [ 'Basic','Standard','Premium' ];
        this.httpClient = new HttpClient(handler);
     }

    ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
      this.thirdFormGroup = this._formBuilder.group({
        thirdCtrl: ['', Validators.required]
      });

      //getting course
      var str = this.router.url; 
      var splitted = str.split("/", 3); 
      console.log(splitted[2]);
      this.courseService.getCourse(splitted[2]).subscribe(
        res => {
          console.log(res['data'][0]);
          this.currentcource=(res['data'][0]);
          console.log(this.currentcource);
          var str2 = this.currentcource.available;
          var splitted2 = str2.split(" ", 4); 
          switch(splitted2[0]) { 
            case "Sunday": { 
              this.startdaynb=0
               break; 
            } 
            case "Monday": { 
              this.startdaynb=1
               break; 
            }
            case "Tuesday": { 
              this.startdaynb=2
               break; 
            }
            case "Wednesday": { 
              this.startdaynb=3
               break; 
            }
            case "Thursday": { 
              this.startdaynb=4
               break; 
            }
            case "Friday": { 
              this.startdaynb=5
               break; 
            }
            case "Saturday": { 
              this.startdaynb=6
               break; 
            }  }

            switch(splitted2[2]) { 
              case "Sunday": { 
                this.enddaynb=0
                 break; 
              } 
              case "Monday": { 
                this.enddaynb=1
                 break; 
              }
              case "Tuesday": { 
                this.enddaynb=2
                 break; 
              }
              case "Wednesday": { 
                this.enddaynb=3
                 break; 
              }
              case "Thursday": { 
                this.enddaynb=4
                 break; 
              }
              case "Friday": { 
                this.enddaynb=5
                 break; 
              }
              case "Saturday": { 
                this.enddaynb=6
                 break; 
              }  }
              
              
              for (let i = 0; i < 7; i++) {
                if (i < this.startdaynb) {
                  this.d.push(i);
                }
              }
              for (let j = 0; j < 7; j++) {
                if (j > this.enddaynb) {
                  this.d.push(j);
                }
              }
              
        },
        err => { 
          console.log(err);
          
        }
      );
     
      this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];
          console.log(res);
        },
        err => { 
          console.log(err);
          
        }
      );
      var rellaxHeader = new Rellax('.rellax-header');

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }

    openSite() {
      //creating payment:
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Token ccc3751ae3ae852090a13b51e7b45f3bdbfcfe24`)
      }

     const headers = { 'Authorization': 'Token ccc3751ae3ae852090a13b51e7b45f3bdbfcfe24'};
      const body = { 
        "vendor" : 1707,
        "amount": parseFloat(this.currentamount),
        "note" : "Order"
     };
     console.log(body);
      this.httpClient.post<any>('https://sandbox.paymee.tn/api/v1/payments/create',body, header ).subscribe(data => {
  this.order_token=Object.values(data['data'])[0];
          console.log(data);
          console.log(this.order_token);
      });
     
     
     setTimeout(() => window.open('https://sandbox.paymee.tn/gateway/'+this.order_token, '_blank'),3000);
  
    
    
  }

  confirm()
   {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Token ccc3751ae3ae852090a13b51e7b45f3bdbfcfe24`)
    }

   this.httpClient.get<any>('https://sandbox.paymee.tn/api/v1/payments/'+this.order_token+'/check',header ).subscribe(data => {
 this.payment_status=Object.values(data['data'])[0]==true;
  });
    setTimeout(() => this.create(),1500);
}

create(){
  console.log('calendar = '+ this.clndr);
  if (this.payment_status)
  {
    const body = {
      "datetime" : this.clndr,
      "image" : this.currentcource.image,
      "sendermail" : this.userDetails.email,
      "sendername" : this.userDetails.name,
      "senderusername" : this.userDetails.username,
      "senderpackage" : this.selectedPackage,
      "courseemail" : this.currentcource.usermail,
      "startdate" : this.finaldate,
      "starttime" : this.finaltime,
      "coursetitle" : this.currentcource.title,
      "orderstatus" : "Confirmed",
      "teacherstatus" : "Awaiting teacher confirmation",
      "token" : this.order_token,
      "note" : this.note,
      "nbhours" : this.nbhours,
      "totalprice" : this.currentamount
   };
   console.log(body);

   this.orderService.createOrder(body).subscribe( res => {
    setTimeout(() => this.noth(),1000);
    const payload = {
      'userId': this.userDetails._id,
      'datetime':this.clndr,
      'order':res['orderid']
    }
    console.log ('orderid = '+payload.order);
        this.courseService.createCourseEvent(this.currentcource._id, payload ).subscribe((response) => {
      console.log(response.message);
    })
    console.log(res);
  },
  err => { 
    console.log(err); });
}
}
   noth()
   {}

    showBasicDialog2() {
      this.displayBasic2 = true;
  }

    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    onLogout(){
      this.userService.deleteToken();
      this.router.navigate(['/login']);
    }

    getdatetime()
    {
      var str =String(this.clndr);
      var splitted = str.split(" ", 5); 
      var splitted2 = splitted[4].split(":",2)
      this.finaltime=(splitted2[0]+':'+splitted2[1]);
      let day = this.clndr.getDate();
      let month = this.clndr.getMonth() + 1; // add 1 because months are indexed from 0
      let year = this.clndr.getFullYear();
      this.finaldate=(year + '-' + month + '-' + day); 
      console.log(this.finaldate);
      if (this.selectedPackage=='Basic'){this.currentamount=this.currentcource.basicprice;this.nbhours=this.currentcource.basichours;}
      else if (this.selectedPackage=='Standard'){this.currentamount=this.currentcource.standardprice;this.nbhours=this.currentcource.standardhours;}
      else {this.currentamount=this.currentcource.premiumprice;this.nbhours=this.currentcource.premiumhours;}
      this.img=this.currentcource.image;
      console.log('img = '+this.img);
      this.userService.getUserProfilebyemail(this.currentcource.usermail).subscribe(
      res => {
        this.coursecreator=res['data'];
        console.log(this.coursecreator);
      },
      err => { 
        console.log(err);
        
      }
    );
    }

    log()
    {console.log(this.selectedPackage);}

    onImgSelected(event: Event) {
    
      console.log('event trigged');
      console.log(event);
      this.profilep = (event.target as HTMLInputElement).files[0];
      this.updatepp();
      var reader = new FileReader();
    this.imagePath = (event.target as HTMLInputElement).files;
    reader.readAsDataURL((event.target as HTMLInputElement).files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
      }
    
      updatepp()
      {
        
        var data = new FormData();
        data.append('email', this.userDetails.email); 
        data.append('profilepic', this.profilep, this.profilep.name);
        this.userService.updateimg(data).subscribe( res => 
        {
         this.messageService.add({severity:'success', summary:'Profile picture', detail:'Your profile picture was updated successfully!'});
         this.navigate(); 

        },
        err => {
          
        });
       

       
      }

      navigate()
      {
        
        setTimeout(() => window.location.reload(),1500);
      }
  
}
