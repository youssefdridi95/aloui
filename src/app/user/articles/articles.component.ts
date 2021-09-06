import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { CourseService } from '../../shared/course.service';
import * as Rellax from 'rellax';
import {Router} from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy{
  articles: Array<object>;
  categories: Array<any>;
  chosenCategory: String;
  COURSE_IMAGE_PATH: String = `${environment.apiBaseUrl}/course/`;
  CATEGORY_IMAGE_PATH: String = `${environment.apiBaseUrl}/course/category/`
  currentCategory: String = '';
  fetchedCategories: Array<any>;
  constructor(private service: CourseService, private router: Router) {

    this.service.fetchCourses().subscribe((payload) => {
      this.articles = payload;
      const unique = [new Set(payload.map((item: any) => item.category.label))];
      this.categories = Array.from(unique.values());
      this.chosenCategory = this.categories[0];
      this.currentCategory = this.chosenCategory[0];
      this.service.fetchCategories().subscribe((categories) => {
        this.fetchedCategories = categories;
        console.log(this.fetchedCategories);
      })
    })
  }

  ngOnInit(): void {
    const rellaxHeader = new Rellax('.rellax-header');
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnChange() {

  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
  onCategoryFilterChanges() {
    this.service.fetchCoursesByCategory(this.currentCategory).subscribe((payload) => {
      this.articles = payload;
    })
  }

}
