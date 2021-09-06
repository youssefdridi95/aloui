import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheQuizzComponent } from './affiche-quizz.component';

describe('AfficheQuizzComponent', () => {
  let component: AfficheQuizzComponent;
  let fixture: ComponentFixture<AfficheQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficheQuizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
