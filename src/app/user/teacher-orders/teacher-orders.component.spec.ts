import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherOrdersComponent } from './teacher-orders.component';

describe('TeacherOrdersComponent', () => {
  let component: TeacherOrdersComponent;
  let fixture: ComponentFixture<TeacherOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
