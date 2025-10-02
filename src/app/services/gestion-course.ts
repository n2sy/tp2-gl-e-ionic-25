import type { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class GestionCourse {
  private allCourses: Course[] = [
    {
      id: 1,
      title: 'Angular',
      author: 'Nidhal Jelassi',
      logo: 'https://banner2.cleanpng.com/20180627/jke/kisspng-angularjs-vue-js-5b3425d1eb9d99.7244187615301442099651.jpg',
      keywords: ['component', 'binding', 'directives'],
    },
    {
      id: 2,
      title: 'Ionic',
      author: 'Mootez Aouinti',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/LogoIonic.png',
      keywords: ['mobile', 'hybrid', 'js'],
    },
    {
      id: 3,
      title: 'Android',
      author: 'Jasser Mdimegh',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Android_logo_2019_%28stacked%29.svg/2346px-Android_logo_2019_%28stacked%29.svg.png',
      keywords: ['mobile', 'activity', 'Layouts'],
    },
  ];

  addCourse(newCourse) {
    newCourse.id = crypto.randomUUID();
    this.allCourses.push(newCourse);
  }

  getAllCourses() {
    return this.allCourses;
  }

  getCourseById(selectedId) {
    return this.allCourses.find((element) => element.id == selectedId);
  }

  deleteCourseById(selectedId) {
    let i = this.allCourses.findIndex((element) => element.id == selectedId);
    this.allCourses.splice(i, 1);
  }
}
