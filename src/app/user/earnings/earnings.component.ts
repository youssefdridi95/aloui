import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { OrderserviceService } from '../../shared/orderservice.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css'],
  providers: [MessageService]
  
})
export class EarningsComponent implements OnInit {


  userDetails;
  l=[];
  t=[];
  all=[];
  displayBasic2: boolean;
  constructor(private messageService: MessageService, private userService: UserService,private orderService:OrderserviceService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(res);
        setTimeout(() => this.gettransactions(this.userDetails.email),1000);
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  withdraw()
  {
    this.messageService.add({severity:'success', summary:'Profile picture', detail:'Your profile picture was updated successfully!'});
    this.displayBasic2 = false;
  }

  showBasicDialog2(balance,email) {
    this.displayBasic2 = true;
  }

gettransactions(email)
{
  this.orderService.getlearnerorders(this.userDetails.email).subscribe(
    res => {
      this.l = res['data'];
    },
    err => { 
    }
  );
  this.orderService.getteacherorders(this.userDetails.email).subscribe(
    res => {
      this.t.push(res['data']);
    },
    err => { 
    }
  );
  
  setTimeout(() => this.concat(),500);
}

concat()
{
  this.all = this.l.concat(this.t);
}



}
