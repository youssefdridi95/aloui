import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from '../../../../shared/user.service';
import { OrderserviceService } from '../../../../shared/orderservice.service';
@Component({
    selector: 'app-navbarlearner',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarLearnerComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    userDetails;
    orders;
    notifExist:boolean;
    notifNb:number=0;
    awaiting=[];
    constructor(private orderService : OrderserviceService, public location: Location, private element : ElementRef, private userService: UserService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbarlearner: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbarlearner.getElementsByClassName('navbar-toggler')[0];
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
    this.orderService.getteacherorders(this.userDetails.email).subscribe(
        res => {
          this.orders = res['data'];
          for (let i = 0; i < res['data'].length; i++) {
            if (this.orders[i].orderstatus=="Confirmed")
            {
              this.notifExist=true;
              this.notifNb=this.notifNb+1;
              this.awaiting.push(this.orders[i]);
            }
          }
          console.log(this.notifExist);
          console.log(this.notifNb);
        },
        err => { 
          console.log(err);
        }
      );
}

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
  
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
}
