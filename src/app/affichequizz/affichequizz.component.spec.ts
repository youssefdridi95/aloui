import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichequizzComponent } from './affichequizz.component';

describe('AffichequizzComponent', () => {
  let component: AffichequizzComponent;
  let fixture: ComponentFixture<AffichequizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichequizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichequizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
