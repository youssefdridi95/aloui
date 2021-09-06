import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTeacherComponent } from './navbar.component';

describe('NavbarTeacherComponent', () => {
  let component: NavbarTeacherComponent;
  let fixture: ComponentFixture<NavbarTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
