import { Component, inject, OnInit } from '@angular/core';
import { GestionCourse } from '../services/gestion-course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.page.html',
  styleUrls: ['./details-course.page.scss'],
  standalone: false,
})
export class DetailsCoursePage {
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap);
  }
}
