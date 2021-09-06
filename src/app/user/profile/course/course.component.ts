import { Component, OnInit,Inject } from '@angular/core';
import {CourseService} from '../../../shared/course.service'
import { Course } from '../../../shared/course.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PrimeNGConfig } from 'primeng/api';
import { UserService } from '../../../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {InputNumberModule} from 'primeng/inputnumber';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SliderModule} from 'primeng/slider';
//import da from '../../../../../node_modules1/@angular/common/locales/extra/da';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [CourseService,MessageService,ConfirmationService],
  styles: [`
      :host ::ng-deep .p-button {
          margin: 0 .5rem 0 0;
          min-width: 10rem;
      }

      p {
          margin: 0;
      }

      .confirmation-content {
          display: flex;
          align-items: center;
          justify-content: center;
      }

      :host ::ng-deep .p-dialog .p-button {
          min-width: 6rem;
      }
  `]
  
})
export class CourseComponent implements OnInit {
    _id;
    available;
  basicdesc;
  basichours;
  basicprice;
  category;
  description;
  image=null;
  premiumdesc;
  premiumhours;
  premiumprice;
  standarddesc;
  standardhours;
  standardprice;
  title;
 
  productDialog: boolean;
  course : Course;
 
  courses ;
  rating=5;
  displayBasic2: boolean;
  simpleSlider = 40;
  min;
  max;
  step;
  value;
  price:any=10;
  userDetails;
  imgURL: any;
  public imagePath;
  selected:any;
  selecteddayfrom:any;
  selecteddayto:any;
  
  categories: any[];
  selectedCategory: any;




days = [
  { name: 'Monday' },
  { name: 'Tuesday' },
  { name: 'Wednesday' },
  { name: 'Friday' },
  { name: 'Saturday' },
  { name: 'Sunday' },
];
  constructor( private userService: UserService, private primengConfig: PrimeNGConfig,public dialog: MatDialog,private courseService: CourseService,private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];
          console.log(res);
        },
        err => { 
          console.log(err);
          
        }
      );
    this.primengConfig.ripple = true;
    setTimeout(() => this.refreshCourseList(),1500);
    
    this.categories = [
      
      {name: 'Graphics & Design',
       subs: [
              {  name: 'Logo & Brand Identity',
               cats: [
                   {cname: 'Logo & Brand Identity'},
                   {cname: 'Brand Style Guides'},
                   {cname: 'Business Cards & Stationery'}]},

              { name: 'Visual Design',
               cats: [
                   {cname: 'Visual Design'},
                   {cname: 'Presentation Design'}]},]},
               
      { name: 'Programming & Tech', 
       subs: [          
              {name: 'Mobile apps',
               cats: [
                   {cname: 'Flutter coding'},
                   {cname: 'ios/android coding'}]},

              {name: 'Web apps',
               cats: [
                   {cname: 'UI/UX Design'},
                   {cname: 'MEAN Stack'}]},]},
       
                   { name: 'Programming & Tech', 
                   subs: [          
                          {name: 'Mobile apps',
                           cats: [
                               {cname: 'Flutter coding'},
                               {cname: 'ios/android coding'}]},
         
                          {name: 'Web apps',
                           cats: [
                               {cname: 'UI/UX Design'},
                               {cname: 'MEAN Stack'}]},]},
                               
                               { name: 'Programming & Tech', 
                               subs: [          
                                      {name: 'Mobile apps',
                                       cats: [
                                           {cname: 'Flutter coding'},
                                           {cname: 'ios/android coding'}]},
                     
                                      {name: 'Web apps',
                                       cats: [
                                           {cname: 'UI/UX Design'},
                                           {cname: 'MEAN Stack'}]},]},

                                           { name: 'Programming & Tech', 
                                           subs: [          
                                                  {name: 'Mobile apps',
                                                   cats: [
                                                       {cname: 'Flutter coding'},
                                                       {cname: 'ios/android coding'}]},
                                 
                                                  {name: 'Web apps',
                                                   cats: [
                                                       {cname: 'UI/UX Design'},
                                                       {cname: 'MEAN Stack'}]},]},

                                                       { name: 'Programming & Tech', 
                                                       subs: [          
                                                              {name: 'Mobile apps',
                                                               cats: [
                                                                   {cname: 'Flutter coding'},
                                                                   {cname: 'ios/android coding'}]},
                                             
                                                              {name: 'Web apps',
                                                               cats: [
                                                                   {cname: 'UI/UX Design'},
                                                                   {cname: 'MEAN Stack'}]},]},

      {name: 'Digital Marketing',
       subs: [
              {name: 'Audiovisual',
               cats: [
                   {cname: 'Video Marketing'},
                   {cname: 'Email Marketing'},
                   {cname: 'Content Marketing'}]},
           
              {  name: 'Finance',
               cats: [
                   {cname: 'E-Commerce Marketing'},
                   {cname: 'Affiliate Marketing'},
                   {cname: 'Surveys'},
                   {cname: 'Affiliate Marketing'}]},   
              { name: 'Data',
               cats: [
                   {cname: 'Databases',},
                   {cname: 'Data Processing'},
                   {cname: 'Analytics'}]}]}];
  }

  onImgSelected(event: Event) {
    
    console.log('event trigged');
		console.log(event);
    this.image = (event.target as HTMLInputElement).files[0];
    var reader = new FileReader();
    this.imagePath = (event.target as HTMLInputElement).files;
    reader.readAsDataURL((event.target as HTMLInputElement).files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      console.log(this.imgURL);
    }
  }

  refreshCourseList() {
    this.courseService.mycourses(this.userDetails.email).subscribe((res) => {
     
      this.courses = res['data'];
      console.log(this.courses)
    });
  }

  modifycourse(C)
  {
    console.log(C);

this.basicprice=C.basicprice;
this.standardprice=C.standardprice;
this.premiumprice=C.premiumprice;

this.basicdesc=C.basicdesc;
this.standarddesc=C.standarddesc;
this.premiumdesc=C.premiumdesc;

this.basichours=C.basichours;
this.standardhours=C.standardhours;
this.premiumhours=C.premiumhours;

this.title=C.title;
this.category=C.category;
this.description=C.description;
this.image=C.image;
  }

  showBasicDialog2(C) {
    
    console.log(C);
this._id=C._id;
    this.basicprice=C.basicprice;
    this.standardprice=C.standardprice;
    this.premiumprice=C.premiumprice;  
    this.basicdesc=C.basicdesc;
    this.standarddesc=C.standarddesc;
    this.premiumdesc=C.premiumdesc;   
    this.basichours=C.basichours;
    this.standardhours=C.standardhours;
    this.premiumhours=C.premiumhours;
    this.selectedCategory=C.category;
    this.title=C.title;
    this.description=C.description;
    var str   = C.available;
    var stringArray = str.split(/(\s+)/);
    this.selecteddayfrom=stringArray[0];
    this.selecteddayto=stringArray[4]
    this.displayBasic2 = true;
    
}


upload() {
var data = new FormData();
data.append('_id',this._id);
data.append('title', this.title);
data.append('description', this.description);
data.append('available', this.selecteddayfrom+' to '+this.selecteddayto);
data.append('category', this.selectedCategory);
data.append('basicdesc',this.basicdesc);
data.append('basichours', this.basichours);
data.append('basicprice', this.basicprice);
data.append('standarddesc',this.standarddesc);
data.append('standardhours', this.standardhours);
data.append('standardprice', this.standardprice);
data.append('premiumdesc',this.premiumdesc);
data.append('premiumhours', this.premiumhours);
data.append('premiumprice', this.premiumprice);
data.append('image', this.image, this.image.name);
console.log(data);
this.courseService.modifyCourse(data).subscribe( res => { console.log(res); if (res['success'])
{
  this.messageService.add({severity:'success', summary:'Course modification', detail:'Course updated successfully!'});
  this.displayBasic2=false;
  window.location.reload();
} else{
  this.messageService.add({severity:'Error', summary:'Course modification', detail:'Something went wrong! Try again!'});this.displayBasic2=false;}
},
err => {
    this.displayBasic2=false;
  
});


}

delete(C) {
    
            this.courseService.DeletCourse(C._id).subscribe((res) => {
              console.log(res);
             });  
        
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Course Deleted', life: 3000});
        }
    
  

}