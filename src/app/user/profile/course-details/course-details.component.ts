import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../shared/course.service'
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-course-details-component',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  closeResult: string;
  course: any;
  currentUser: any;
  activeStars: Number;
  inactiveStars: Number;
  ratedStarsCount: Number = 0;
  comment: String = '';
  inputCouponCode: String = '';
  API_IMAGE_FETCH = `${environment.apiBaseUrl}/course`
  constructor(private route: ActivatedRoute,
              private service: CourseService,
              private modalService: NgbModal,
              private router: Router
  ) {
  
  }

  open(content, type, modalDimension) {
    if (type === 'purchase') {
      this.service.purchaseCourse(this.course, this.currentUser).subscribe((payload) => {
        console.log(payload);
        this.course = payload;
      })
    }
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini modal-primary', size: 'sm' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === undefined && type === 'Login') {
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
  handleOnRatingPopupSubmitted(): void {

    const payload = {
      comment: {
        content: this.comment,
        commentedBy: this.currentUser.name
      },
      rating: {
        value: this.ratedStarsCount,
        ratedBy: this.currentUser.name
      }
    }
    this.service.rateCourse(this.course, payload).subscribe((response) => {
      this.course = response;
      this.updateRatingCounts();
      this.modalService.dismissAll();
    });
  }
  updateRatingCounts() {
    this.activeStars = Math.round(this.course.ratingAvg);
    this.inactiveStars = Math.round(( 5 - this.course.ratingAvg));
  }
  onCouponCodeChanged() {
    const coupon = this.course.coupon.filter((coupon) => coupon.user === this.currentUser?._id);
   return coupon[0].code === this.inputCouponCode;
  }
  isCouponBought() {
    const coupon = this.course.coupon.filter((coupon) => coupon.user === this.currentUser?._id);
    return coupon !== undefined && coupon !== null && coupon.length > 0 ;
  }
  getRatingByComment(course, timeStamp) {
    return course.ratings.find((rate) => rate.timeStamp === timeStamp);
  }
  onCouponCodeSubmitted() {
    const payload = {
      'userId': this.currentUser._id
    }
    this.service.createCourseEvent(this.course, payload ).subscribe((response) => {
      console.log(`${response.message}`);
    })
  }

  ngOnInit(): void {
    var str = this.router.url; 
    var splitted = str.split("/", 3); 
    console.log(splitted[2]);
    this.service.getCourse(splitted[2]).subscribe(
      res => {
        console.log(res['data'][0]);
  },
  err => { 
    console.log(err);
  });}

}
