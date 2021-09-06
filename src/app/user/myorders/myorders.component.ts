import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { OrderserviceService } from '../../shared/orderservice.service';
import { TalkService } from '../../shared/talk.service';
import Talk from 'talkjs';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  userDetailsother;
  userDetails;
  orders;
  currentorder;
  awaiting=[];
  active=[];
  completed=[];
  cancelled=[];
  displayBasic2: boolean;
  private chatbox: Talk.Chatbox;
  private session: Talk.Session;
  constructor(private talkService: TalkService, private userService : UserService,private orderService:OrderserviceService ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(res);
      },
      err => { 
        console.log(err);
        
      }
    );
    setTimeout(() => this.getorders(),1500);
  }

  getorders()
{
    this.orderService.getlearnerorders(this.userDetails.email).subscribe(
        res => {
          console.log(res);
          this.orders = res['data'];
          for (let i = 0; i < this.orders.length; i++) {
            if (this.orders[i].orderstatus=="Confirmed")   
            {this.awaiting.push(this.orders[i]);}         
            else if (this.orders[i].orderstatus=="Active")
            { this.active.push(this.orders[i]);}
            else if (this.orders[i].orderstatus=="Completed")
            { this.completed.push(this.orders[i]);}
            else if (this.orders[i].orderstatus=="Cancelled")
            { this.cancelled.push(this.orders[i]);}
          }
        },
        err => { 
          console.log(err);
        }
      );
}


find(mail)
{
  
const promise = new Promise((resolve, reject) => {
  this.userService.getUserProfilebyemail(mail)
    .toPromise()
    .then((res: any) => {
      // Success
      this.userDetailsother = res['data']; ;
      resolve();
    },
      err => {
        // Error
        reject(err);
      }
    );
});
return promise;
 
}

private async createInbox(mail) {
  await this.find(mail);
  const otheruser = {
    id: this.userDetailsother._id,
    username: this.userDetailsother.username,
    email: this.userDetailsother.email,
    photoUrl: this.userDetailsother.profilepic,
    welcomeMessage: 'Hey, how can I help?',
    role: 'booker'
  };
  const session = await this.talkService.createCurrentSession();
  this.chatbox = await this.talkService.createInbox(session,otheruser);
  this.chatbox.mount(document.getElementById("talkjscontainer"));
}

showBasicDialog2(order) {
  console.log('hello'+order);
  this.currentorder=order;
  
  this.displayBasic2 = true;

  this.createInbox(order.courseemail);
 
}

updatestatus(status,status2)
{
  this.displayBasic2 =false;
  var data = new FormData();
  data.append('_id',this.currentorder._id);
  data.append('orderstatus',status);
  data.append('sendermail',this.currentorder.sendermail);
  data.append('teacherstatus',status2);


  this.orderService.updatestatus(data).subscribe( res => { console.log(res); if (res['success'])
  {
    console.log(res);
    window.location.reload();
  } else{
    console.log('something went wrong');
  }

   
  },
  err => {
    console.log('something went wrong');
      this.displayBasic2=false;
  });
  
  
}

}