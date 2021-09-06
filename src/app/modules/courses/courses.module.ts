import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticlesComponent} from './pages/articles/articles.component';
import {ArticleComponent} from './components/article/article.component';
import {CheckoutCourseComponent} from './pages/checkout-course/checkout-course.component';
import {CommentsComponent} from './components/comments/comments.component';
import {CommentComponent} from './components/comment/comment.component';
import {NavbarLearnerComponent} from './components/navbarlearner/navbar.component';
import {RouterModule} from '@angular/router';
import {CoursesRoutingModule} from './courses-routing.routing';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { RatingModalComponent } from './components/rating-modal/rating-modal.component';
import {FormsModule} from '@angular/forms';
import {RatingModule} from 'primeng/rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    declarations: [
        ArticlesComponent,
        ArticleComponent,
        CheckoutCourseComponent,
        CommentsComponent,
        CommentComponent,
        CourseDetailsComponent,
        RatingModalComponent,
        NavbarLearnerComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        CoursesRoutingModule,
        FormsModule,
        RatingModule,
        NgbModule
    ]
})
export class CoursesModule {
}
