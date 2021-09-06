import { Component, OnInit } from '@angular/core';
import { User } from './../../shared/User';
import { UserService } from './../../shared/user.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
providers: [MessageService,ConfirmationService]
})
export class HomeComponent implements OnInit {
  productDialog: boolean;
  users: User[];
rating=5;
  user: User;

  selectedUsers: User[];

  submitted: boolean;
  constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  //  this.userService.getAllUsers().then(users => setTimeout(() => this.users = users,2000));
  this.userService.getAllUsers().subscribe((res) => {
    this.users = res['users'];
  });  
  setTimeout(() => console.log(this.users),5000); 
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected users?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => !this.selectedUsers.includes(val));
            for (let u of this.selectedUsers) {
                console.log(u._id); // 1, "string", false
                this.userService.DeleteUser(u._id).subscribe((res) => {
                   console.log(res);
                  });  
              }
            
            this.selectedUsers = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
        }
    });
}

deleteUser(user: User) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.username + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.users = this.users.filter(val => val._id !== user._id);
          this.userService.DeleteUser(user._id).subscribe((res) => {
            console.log(res);
           });  
          this.user = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
      }
  });
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}


findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
          index = i;
          break;
      }
  }

  return index;
}



}
