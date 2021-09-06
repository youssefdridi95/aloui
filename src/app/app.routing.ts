import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './user/login/login.component';
import { VerifyComponent } from './user/verify/verify.component';
import { ProfileComponent } from './user/profile/profile.component';
import { MyProfileComponent } from './user/myprofile/profile.component';
import { TeacherOrdersComponent } from './user/teacher-orders/teacher-orders.component';
import { MyordersComponent } from './user/myorders/myorders.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { ModifyCourseComponent } from './user/profile/modify-course/modify-course.component';
import { LoginAdminComponent } from './admin/login/login.component';
import { HeaderComponent } from './admin/header/header.component';
import { HomeComponent } from './admin/home/home.component';
import { AboutComponent } from './admin/about/about.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { Checkout1Component} from './user/checkout1/checkout1.component';
import { InboxComponent } from './inbox/inbox.component';
import { EarningsComponent } from './user/earnings/earnings.component';
import { ArticlesComponent } from './user/articles/articles.component';
import { CourseDetailsComponent } from './user/profile/course-details/course-details.component';
import { DashComponent } from './dash/dash/dash.component';
import { Checkout2Component} from './user/checkout2/checkout2.component';
import { AffichequizzComponent } from './affichequizz/affichequizz.component';
import { AddQuizzComponent } from './add-quizz/add-quizz.component';
import { PlayquizzComponent } from './playquizz/playquizz.component';
const routes: Routes =[
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'index',       component: ArticlesComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'inbox',     component: InboxComponent },
    { path: 'login',       component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'verify',       component: VerifyComponent },
    { path: 'profile',     component: ProfileComponent,canActivate:[AuthGuard]},
    { path: 'myprofile',     component: MyProfileComponent,canActivate:[AuthGuard]},
    { path: 'user',     component: UserComponent },
    { path: 'earnings',  component: EarningsComponent},
    { path: 'orders',     component: TeacherOrdersComponent },
    { path: 'myorders',     component: MyordersComponent },
    { path: 'checkout/:id',     component: Checkout1Component},
    { path: 'modifycourse/:id',     component: ModifyCourseComponent,canActivate:[AuthGuard] },
    { path: 'dash',     component: DashComponent},
    { path: 'checkout/:id/:c',     component: Checkout2Component},
    {path: 'quizz',component:AffichequizzComponent},
    {path: 'addQuizz',component:AddQuizzComponent},
    { path: 'quizz/:quizzId', component: PlayquizzComponent },

  
   // {path:  'courses/:id', component: CourseDetailsComponent},
   
    {
      path: 'courses',
      loadChildren: () => import('./modules/courses/courses.module').then(m => m.CoursesModule)
    }
  /*  {
        path: 'courses',
        component: AdminLayoutComponent,
        children: [{
           {path: ':id', component: CourseDetailsComponent},
    {path: ':id/checkout', component: CheckoutCourseComponent},
    {path: '', component: ArticlesComponent}
        }]
      },
    {
        path: 'dashboard', component: HeaderComponent, 
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'about', component: AboutComponent },
        ]
      },
      { path: 'admin', component: LoginAdminComponent }
*/
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
