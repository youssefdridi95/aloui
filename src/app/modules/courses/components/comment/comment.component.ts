import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: any;
  activeStars: Number;
  inactiveStars: Number;
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.comment.rating.value);
    this.activeStars = this.comment.rating.value;
    this.inactiveStars = 5 - this.comment.rating.value;
    console.log(this.activeStars);
    console.log(this.inactiveStars);
  }

}
