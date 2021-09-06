import { Component, OnInit, Input,ElementRef,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../../shared/user.service';
import * as Rellax from 'rellax';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-modify-course',
  templateUrl: './modify-course.component.html',
  styleUrls: ['./modify-course.component.css'],
  providers: [MessageService]
  
})
export class ModifyCourseComponent implements OnInit {
id;
userDetails;
profilep = null;
imgURL: any;
  public imagePath;
  @ViewChild('fileInput',{static:false}) fileInput: ElementRef;
  constructor(private route: ActivatedRoute, private userService: UserService,private router: Router,private messageService: MessageService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = this.route.snapshot.params['id'];
      
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
