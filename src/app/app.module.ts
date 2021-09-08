import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { HttpClientModule,HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatService } from './shared/chat.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NavbarTeacherComponent } from './shared/navbarteacher/navbar.component';
import { NavbarLearnerComponent } from './shared/navbarlearner/navbar.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { VerifyComponent } from './user/verify/verify.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { MyProfileComponent } from './user/myprofile/profile.component';
import { UserService } from './shared/user.service';
import { CourseComponent } from './user/profile/course/course.component';
import { Checkout1Component} from './user/checkout1/checkout1.component';
import { Checkout2Component} from './user/checkout2/checkout2.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AddCourseComponent } from './user/profile/add-course/add-course.component';
import { NouisliderModule } from 'ng2-nouislider';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';

import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {InputNumberModule} from 'primeng/inputnumber';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import { AngularTawkComponent } from 'angular-tawk';
import { LivechatWidgetModule } from '@livechat/angular-widget'
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SliderModule} from 'primeng/slider';
import { ModifyCourseComponent } from './user/profile/modify-course/modify-course.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModifyProfileComponent } from './user/profile/modify-profile/modify-profile.component';
import { LoginAdminComponent } from './admin/login/login.component';
import { HeaderComponent } from './admin/header/header.component';
import { HomeComponent } from './admin/home/home.component';
import { AboutComponent } from './admin/about/about.component';
import { ToolbarModule} from 'primeng/toolbar';
import { TableModule} from 'primeng/table';
import { DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { RatingModule} from 'primeng/rating';
//import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CardModule} from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { MatStepperModule} from '@angular/material/stepper';
import { NgWizardModule } from '@cmdap/ng-wizard';
import { MatInputModule } from '@angular/material/input';
import { ListboxModule} from 'primeng/listbox';
import { PortalModule } from '@angular/cdk/portal';
import { TeacherOrdersComponent } from './user/teacher-orders/teacher-orders.component';
import { OrderComponent } from './user/order/order.component';
import { MyordersComponent } from './user/myorders/myorders.component';
import { InboxComponent } from './inbox/inbox.component';
import { EarningsComponent } from './user/earnings/earnings.component';
import { CodeInputModule } from 'angular-code-input';
import { ArticlesComponent } from './user/articles/articles.component';
import { CoursesModule } from './modules/courses/courses.module';
import { DashComponent } from './dash/dash/dash.component';
import { QuizzModule } from './quizz/quizz.module';
import { AffichequizzComponent } from './affichequizz/affichequizz.component';
import { AddQuizzComponent } from './add-quizz/add-quizz.component';
import { QuizzSService } from './affichequizz/quizz-s.service';
import { PlayquizzComponent } from './playquizz/playquizz.component';
import { SearchFilterPipe } from './shared/search-filter.pipe';
import { CategoryFilterPipe } from './shared/category-filter.pipe';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        NavbarTeacherComponent,
        NavbarLearnerComponent,
        UserComponent,
        LoginComponent,
        RegisterComponent,
        VerifyComponent,
        ProfileComponent,
        MyProfileComponent,
        CourseComponent,
        AddCourseComponent,
        AngularTawkComponent,
        ModifyCourseComponent,
        ModifyProfileComponent,
        LoginAdminComponent,
        HeaderComponent,
        HomeComponent,
        AboutComponent,
        //AdmindashboardComponent,
        Checkout1Component,
        TeacherOrdersComponent,
        OrderComponent,
        MyordersComponent,
        InboxComponent,
        EarningsComponent,
        ArticlesComponent,
        DashComponent,
        Checkout2Component,
        AffichequizzComponent,
        AddQuizzComponent,
        PlayquizzComponent,
        SearchFilterPipe,
        CategoryFilterPipe,
        
        
      
        
        
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NouisliderModule,
        MatSelectModule,
        MatSliderModule,
        ToastModule,
        InputNumberModule,
        CascadeSelectModule,
        LivechatWidgetModule,
        DropdownModule,
        InputTextareaModule,
        SliderModule,
        MatDialogModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        RatingModule,
        CardModule,
        StepsModule,
        MatStepperModule,
        NgWizardModule,
        MatInputModule,
        ListboxModule,
        PortalModule,
        CalendarModule,
        CodeInputModule,
        CoursesModule,
        
        CodeInputModule.forRoot({
            codeLength: 4,
            isCharsCode: true,
          
          }),
    ],
    providers:  [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },AuthGuard,UserService,MessageService,ConfirmationService,ChatService,QuizzSService],
    bootstrap: [AppComponent]
})
export class AppModule { }
