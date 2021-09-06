import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { error } from 'selenium-webdriver';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

    data : Date = new Date();
    focus;
    focus1;

    constructor(private userService: UserService,private router : Router) { }
    model ={
        email :'',
        password:''
      };
      serverErrorMessages: string;
    ngOnInit() {
      if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/courses');
    sessionStorage.setItem("type",'L')
   
    }
    ngOnDestroy(){
     
    }
    onSubmit(form : NgForm){
        this.userService.login(form.value).subscribe(
          res => { if (res['error'])
          {
            this.serverErrorMessages = res['errorMessage'];
          } else{
            this.userService.setToken(res['token']);
            this.router.navigateByUrl('/courses');}
          },
          err => {
            
          }
        );
      }

}
