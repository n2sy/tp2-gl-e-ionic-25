import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class Photos {
  async takePicture() {
    let capturedPhoto = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      resultType: CameraResultType.DataUrl,
    });

    console.log(capturedPhoto.dataUrl);
    return capturedPhoto.dataUrl;
  }

  async selectionnerPhotos() {
    let selectedPhotos = await Camera.pickImages({
      quality: 90,
      limit: 5,
    });
    console.log(selectedPhotos);

    return selectedPhotos;
  }
  //1ere version
  //   async selectionnerPhoto() {
  //     let selectedPhoto = await Camera.getPhoto(
  //         {
  //             source : CameraSource.Photos,
  //             quality : 90,
  //             resultType : CameraResultType.DataUrl
  //         }
  //     )

  //     return selectedPhoto.dataUrl;
  //   }
}
