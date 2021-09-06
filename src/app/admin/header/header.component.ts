import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  redirectToHome() {
    this.router.navigateByUrl('dashboard/home');
  }
  redirectToAbout() {
    this.router.navigateByUrl('dashboard/about');
  }
  logMeOut() {
    this.router.navigateByUrl('');
  }


}
