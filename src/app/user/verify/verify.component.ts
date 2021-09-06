import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { error } from 'selenium-webdriver';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  providers: [UserService]
})
export class VerifyComponent implements OnInit {
  code:number=4154;
    
    constructor(private userService: UserService,private router : Router) { }

    ngOnInit() {

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

     
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

      
    }

     // this called every time when user changed the code
  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    console.log(code);
  }
   
     
}
