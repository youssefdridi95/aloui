import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfficheQuizzComponent } from './affiche-quizz/affiche-quizz.component';
import { NavbarLearnerComponent } from 'app/modules/courses/components/navbarlearner/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AfficheQuizzComponent,
    NavbarLearnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule
  ]
})
export class QuizzModule { }
