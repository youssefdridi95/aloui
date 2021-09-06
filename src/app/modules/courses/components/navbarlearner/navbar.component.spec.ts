import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLearnerComponent } from './navbar.component';

describe('NavbarTeacherComponent', () => {
  let component: NavbarLearnerComponent;
  let fixture: ComponentFixture<NavbarLearnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarLearnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
