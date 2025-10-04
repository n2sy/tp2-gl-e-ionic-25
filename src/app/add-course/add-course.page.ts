import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Photos } from '../services/photos';
import { GestionCourse } from '../services/gestion-course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
  standalone: false,
})
export class AddCoursePage implements OnInit {
  private toastCtrl = inject(ToastController);
  private photoSer = inject(Photos);
  private router = inject(Router);
  private courseSer = inject(GestionCourse);
  private actionSheetCtrl = inject(ActionSheetController);
  addForm = new FormGroup({
    title: new FormControl('title par défaut', Validators.required),
    author: new FormControl('', Validators.required),
    logo: new FormControl(''),
    keywords: new FormControl([]),
  });
  inputKeywords: string = '';
  temporaryImages: any[] = [];

  constructor() {}

  get Logo() {
    return this.addForm.get('logo').value;
  }
  get Keywords() {
    return this.addForm.get('keywords').value;
  }

  addKeyword() {
    if (this.inputKeywords.length == 1) {
      this.presentToast('Mot-clé vide', 'dark');
    } else {
      if (this.Keywords.indexOf(this.inputKeywords) == -1) {
        this.Keywords.push(this.inputKeywords);
      } else {
        this.presentToast('Mot-clé existant', 'warning');
      }
    }
    this.inputKeywords = '';
  }

  deleteKeyword(keywordToDelete) {
    let i = this.Keywords.indexOf(keywordToDelete);
    this.Keywords.splice(i, 1);
    this.presentToast('Mot-clé supprimé', 'primary');
  }

  deletePhoto(photoToDelete) {
    let i = this.temporaryImages.indexOf(photoToDelete);
    this.temporaryImages.splice(i, 1);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Ajouter une photo',
      buttons: [
        {
          text: 'Prendre une photo',
          icon: 'camera',
          handler: async () => {
            try {
              let selectedImage = await this.photoSer.takePicture();
              this.temporaryImages.push(selectedImage);
            } catch (err) {
              this.presentToast("Vous n'avez pas pris de photo", 'danger');
            }
          },
        },
        {
          text: 'Choisir depuis la galerie',
          icon: 'image',
          handler: async () => {
            let tabImages = await this.photoSer.selectionnerPhotos();
            let t = tabImages['photos'].map((element) => element.webPath);
            this.temporaryImages = [...t];
            console.log(this.temporaryImages);
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async presentToast(msg, color) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'top',
      color: color,
    });

    await toast.present();
  }

  submitHandler() {
    this.courseSer.addCourse({
      ...this.addForm.value,
      images: [...this.temporaryImages], // new Array(this.temporaryImages)
    });
    this.presentToast('Cours ajouté avec succès', 'success');
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {}
}
