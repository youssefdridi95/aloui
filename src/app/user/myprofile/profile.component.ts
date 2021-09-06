import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild  } from '@angular/core';
import * as Rellax from 'rellax';
import { UserService } from '../../shared/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators  } from "@angular/forms";
import { FileUploadService } from "../../shared/file-upload.service";
import { HttpEvent, HttpEventType} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AngularTawkComponent } from 'angular-tawk';
import { PrimeNGConfig } from 'primeng/api';
import { NavbarTeacherComponent } from './../../shared/navbarteacher/navbar.component';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { ChatService } from './../../shared/chat.service';
@Component({
  selector: 'app-myprofile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService,ChatService]
  
})
export class MyProfileComponent implements OnInit {
  message: string="hello";
  @ViewChild(NavbarTeacherComponent) navbar: NavbarTeacherComponent;
  rating=0;
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
      nm;
      private _router: Subscription;
    constructor(private chatService: ChatService,private element : ElementRef, public location: Location, private renderer : Renderer2, @Inject(DOCUMENT,) private document: any, private messageService: MessageService, private userService: UserService, private router: Router,private _formBuilder: FormBuilder) {
     
     }

    ngOnInit() {
      
      var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
          if (window.outerWidth > 991) {
              window.document.children[0].scrollTop = 0;
          }else{
              window.document.activeElement.scrollTop = 0;
          }
          this.navbar.sidebarClose();

          this.renderer.listen('window', 'scroll', (event) => {
              const number = window.scrollY;
              var _location = this.location.path();
              _location = _location.split('/')[2];

              if (number > 150 || window.pageYOffset > 150) {
                  navbar.classList.remove('navbar-transparent');
              } else if (_location !== 'login' && this.location.path() !== '/nucleoicons') {
                  // remove logic
                  navbar.classList.add('navbar-transparent');
              }
          });
      });



      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });



     
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
        { this.sendMessage();
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

      sendMessage() {
        this.chatService.sendMessage(this.message);
        this.message = '';
      }
  
}
