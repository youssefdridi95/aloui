import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/user.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  nameverif:boolean;
  usernamenameverif:boolean;
  codefalse:boolean=null;
  codetrue:boolean;
  displayBasic2: boolean;
  nb;
  registerForm: FormGroup;
min:number=1000;
max:number=9999;
    data : Date = new Date();
    focus;
    focus1;
    showSucessMessage: boolean;
    serverErrorMessages: string;
    constructor(private userService: UserService,private router : Router, private formBuilder: FormBuilder) { }

    ngOnInit() {

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');


       
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

    }

    verify()
    {
      if (this.userService.selectedUser.name.length<6 ) {this.nameverif=true;console.log(this.nameverif)}
      
    else{ 
      this.nameverif=false;
      this.displayBasic2 = true;
      this.min = Math.ceil(this.min);
      this.max = Math.floor(this.max);
      this.nb= Math.floor(Math.random() * (this.max - this.min)) + this.min;
      this.userService.verifyemail(this.userService.selectedUser.email,this.nb).subscribe(
        res => {
          console.log(res);        },
        err => { 
          console.log(err);
          
        }
      );}
    }

    onCodeChanged(code: string) {
    }
  
    // this called only if user entered full code
    onCodeCompleted(code: string,form: NgForm) {
     
      if (code!=this.nb) {this.codefalse=true;this.codetrue=false;}
     
     else if(code==this.nb) {  
      this.codefalse=false;
      this.onSubmit(form);
 

     }
    }

    onSubmit(form: NgForm) {
        this.displayBasic2 = false;
        this.userService.postUser(form.value).subscribe(
          res => {
            this.serverErrorMessages = 'Your account has been created.';
            setTimeout(() =>  this.router.navigateByUrl('/login'),2000);
            this.resetForm(form);
          },
          err => {
           
            if (err.status === 422) {
              this.serverErrorMessages = err.error.join('<br/>');
            }
            else
              this.serverErrorMessages = 'Something went wrong.Please contact admin.';
             
          }
        );
      }

      resetForm(form: NgForm) {
        this.userService.selectedUser = {
            profilepic: '',
            _id: '',
            name: '',
            email: '',
            username: '',
            type: '',
            createdAt: '',
            fcmToken: '',
            chatId: ''
        };
        form.resetForm();
        this.serverErrorMessages = '';
      }

      MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
    
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
    
            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}
