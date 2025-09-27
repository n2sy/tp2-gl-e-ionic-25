import { Component, inject } from '@angular/core';
import { GestionCourse } from '../services/gestion-course';
import { Course } from '../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tabCourses: Course[] = [];
  private courseService = inject(GestionCourse);

  ngOnInit() {
    this.tabCourses = this.courseService.getAllCourses();
  }
}
