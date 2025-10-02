import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Photos } from '../services/photos';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
  standalone: false,
})
export class AddCoursePage implements OnInit {
  private toastCtrl = inject(ToastController);
  private photoSer = inject(Photos);
  private actionSheetCtrl = inject(ActionSheetController);
  addForm = new FormGroup({
    title: new FormControl('title par défaut', Validators.required),
    author: new FormControl('', Validators.required),
    logo: new FormControl(''),
    keywords: new FormControl([]),
  });
  inputKeywords: string = '';
  constructor() {}

  get Logo() {
    return this.addForm.get('logo').value;
  }
  get Keywords() {
    return this.addForm.get('keywords').value;
  }

  addKeyword() {
    if (this.Keywords.indexOf(this.inputKeywords) == -1) {
      this.Keywords.push(this.inputKeywords);
    } else {
      this.presentToast('Mot-clé existant');
    }
    this.inputKeywords = '';
  }

  deleteKeyword(keywordToDelete) {
    let i = this.Keywords.indexOf(keywordToDelete);
    this.Keywords.splice(i);
    this.presentToast('Mot-clé supprimé');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Ajouter une photo',
      buttons: [
        {
          text: 'Prendre une photo',
          icon: 'camera',
          handler : () => {
            this.photoSer.takePicture();
          }
        },
        {
          text: 'Choisir depuis la galerie',
          icon: 'image',
        },
      ],
    });

    await actionSheet.present();
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'top',
      color: 'primary',
    });

    await toast.present();
  }

  submitHandler() {
    console.log(this.addForm.value);
  }

  ngOnInit() {}
}
