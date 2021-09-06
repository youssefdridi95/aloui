import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('dashboard/home');
  }

}
