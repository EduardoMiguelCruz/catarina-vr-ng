import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vr-camera',
  templateUrl: './vr-camera.component.html'
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

