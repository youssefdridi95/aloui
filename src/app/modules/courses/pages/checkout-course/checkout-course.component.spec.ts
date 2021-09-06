import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCourseComponent } from './checkout-course.component';

describe('CheckoutCourseComponent', () => {
  let component: CheckoutCourseComponent;
  let fixture: ComponentFixture<CheckoutCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
