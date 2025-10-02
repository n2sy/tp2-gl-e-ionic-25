import { Component, inject, OnInit } from '@angular/core';
import { GestionCourse } from '../services/gestion-course';
import { ActivatedRoute, Router } from '@angular/router';
import type { Course } from '../models/course.model';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.page.html',
  styleUrls: ['./details-course.page.scss'],
  standalone: false,
})
export class DetailsCoursePage {
  selectedCourse: Course;
  private activatedRoute = inject(ActivatedRoute);
  private CourseSer = inject(GestionCourse);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
  private router = inject(Router);

  ngOnInit() {
    this.selectedCourse = this.CourseSer.getCourseById(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ce cours ?',
      buttons: [
        'Non',
        {
          text: 'Oui',
          handler: () => {
            this.CourseSer.deleteCourseById(this.selectedCourse.id);
            this.presentToast();
            this.router.navigateByUrl('/');
          },
        },
      ],
    });

    await alert.present();
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Cours supprimé avec succès',
      duration: 1500,
      position: 'bottom',
      color: 'danger',
    });

    await toast.present();
  }
}
