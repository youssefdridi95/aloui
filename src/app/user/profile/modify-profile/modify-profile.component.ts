import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { error } from 'selenium-webdriver';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css'],
  providers: [MessageService]
})
export class ModifyProfileComponent implements OnInit {

  closeResult: string;
  userDetails= {
    _id: '', 
    name: '',
    email: '',
    username: ''};
  
  userprev;
  mname;
  memail;
  mpassword;
  musername;

  pass_confirm;
  new_pass1;
  new_pass2;
  serverErrorMessages: string;

  newdata = {
    _id: '', 
    name: '',
    email: '',
    username: ''};
    

  constructor(private userService: UserService, private modalService: NgbModal, private messageService: MessageService) { }

  ngOnInit(): void {
    console.log('welcome to modify');
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(res);
      },
      err => { 
        console.log(err);
        
      }
    );
  //  setTimeout(() => this.assign(this.userDetails),1500);

    
    
  }
  

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini modal-primary', size: 'sm' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else if (modalDimension == undefined && type === 'Login') {
      this.modalService.open(content, { windowClass: 'modal-login modal-primary' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}

  assign (userDetails:any)
  {
    this.memail=this.userDetails.email;this.mname=this.userDetails.name;this.musername=this.userDetails.username;
  }

  apply()
  {
    this.newdata._id= this.userDetails._id;
    this.newdata.email=this.memail;
    console.log(this.musername);
    this.newdata.username=this.musername;
    this.newdata.name=this.mname;
    console.log('updating...'+ this.newdata.email);
    this.userService.ModifyUser(this.newdata).subscribe(
      res => {
       console.log(res); setTimeout(() => window.location.reload(),1500);
      },
      err => {
        this.messageService.add({severity:'success', summary:'Update', detail: err['errorMessage'] });
        this.serverErrorMessages = err['errorMessage'] ;
      }
  )


  }

  Changepassword()
{
  const authcreds = {
    email: this.userDetails.email,
    password: this.pass_confirm};
    
  this.userService.login(authcreds).subscribe(
    res => { if (res['error'])
    {
     console.log('your password is wrong!');
     this.serverErrorMessages = 'your password is wrong!';
    } else{
      if (this.new_pass1!=this.new_pass2) {this.serverErrorMessages = 'Fields do not match!';}
  else { const authcreds2 = {
    _id: this.userDetails._id,
    password: this.new_pass1};
    this.userService.ChangePassword(authcreds2).subscribe(
      res => { console.log(res)
      });
      this.serverErrorMessages = 'your password has changed!';
    this.messageService.add({severity:'success', summary:'Settings', detail:'Password changed.'});}
    }
    },
    err => {
      console.log('error happened!');
    }
  );

}

}
