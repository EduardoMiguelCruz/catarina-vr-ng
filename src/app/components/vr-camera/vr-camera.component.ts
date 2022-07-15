import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vr-camera',
  templateUrl: './vr-camera.component.html',
  styles: [
    `
      ::ng-deep video {
        margin: 0px !important;
        min-height: 100% !important;
        max-height: 100% !important;
        min-width: 100% !important;
        max-width: 100% !important;
      }
    `
  ]
})
export class VrCameraComponent implements OnInit {

  markers = <any>[];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    fetch('assets/data.json')
      .then(response => response.json())
      .then(markers => {
        this.markers = markers;
        this.markers.forEach((marker: any) => {
          marker.srcs = `srcs:${marker.images.rigth},${marker.images.left},${marker.images.back},${marker.images.front},${marker.images.top},${marker.images.top}`;
        });
      });
  }

  track(index: any, item: any) {
    return item.value;
  }
}

