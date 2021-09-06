import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { CourseService } from '../../../shared/course.service';
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
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  providers: [MessageService],
  
})
export class AddCourseComponent implements OnInit {
  simpleSlider = 40;
  min;
  max;
  step;
  value;
  price:any=10;
  userDetails;
  imgURL: any;
  public imagePath;
image = null;
  selected:any;
  selecteddayfrom:any;
  selecteddayto:any;
  
  categories: any[];
  selectedCategory: any;

//Packages_variables
basicprice:any=0;
standardprice:any=0;
premiumprice:any=0;

basicdesc='';
standarddesc='';
premiumdesc='';

basichours:any=0;
standardhours:any=0;
premiumhours:any=0;

days = [
  { me: 'Monday' },
  { name: 'Tuesday' },
  { name: 'Wednesday' },
  { name: 'Friday' },
  { name: 'Saturday' },
  { name: 'Sunday' },
];
  constructor( private messageService: MessageService,private userService: UserService,public courseService: CourseService, private router: Router) { }

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
  
  upload(form: NgForm) {
  var data = new FormData();
 data.append('usermail', this.userDetails.email);  
 data.append('fullname', this.userDetails.name);  
 data.append('title', form.value.title);
 data.append('description', form.value.description);
 data.append('available', this.selecteddayfrom.name+' to '+this.selecteddayto.name);
 data.append('category', this.selectedCategory.cname);
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
		this.courseService.addCourse(data).subscribe( res => { if (res['success'])
    {
      this.messageService.add({severity:'success', summary:'Course add', detail:'Course added successfully!'});
      setTimeout(() => window.location.reload(),1000);
    } else{
      this.messageService.add({severity:'Error', summary:'Course add', detail:'Something went wrong! Try again!'});}
    },
    err => {
      
    });
	}

}
