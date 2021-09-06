import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {CheckoutCourseComponent} from './pages/checkout-course/checkout-course.component';
import {ArticlesComponent} from './pages/articles/articles.component';
import {CourseDetailsComponent} from './pages/course-details/course-details.component';

const routes: Routes = [
    {path: ':id', component: CourseDetailsComponent},
    {path: ':id/checkout', component: CheckoutCourseComponent},
    {path: '', component: ArticlesComponent}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
})
export class CoursesRoutingModule {
}
