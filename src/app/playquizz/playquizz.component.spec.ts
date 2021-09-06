import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayquizzComponent } from './playquizz.component';

describe('PlayquizzComponent', () => {
  let component: PlayquizzComponent;
  let fixture: ComponentFixture<PlayquizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayquizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayquizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
