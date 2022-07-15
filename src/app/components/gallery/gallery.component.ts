import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ImageItem } from 'ng-gallery';

@Component({
  selector: 'gallery-view',
  templateUrl: './gallery.component.html',
  styles: [`
    ::ng-deep .g-image-item {
      background-size: contain !important;
    }
  `]
})
export class GalleryComponent implements OnInit {

  images = <any>[];

  constructor(
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit(): void {
    this.firebaseService.getImages().then((list:any[]) => {
      this.images = <any>list.map(res => new ImageItem({ src: res.image, thumb: res.image }));
    })
  }
}
