import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout-course',
  templateUrl: './checkout-course.component.html',
  styleUrls: ['./checkout-course.component.css']
})
export class CheckoutCourseComponent implements OnInit {

  constructor(private router: Router) {
    if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === undefined) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

}
