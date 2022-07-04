import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Utils } from 'src/app/utils/utils';

declare var FaceMesh: any;

@Component({
  selector: 'selfie-photo',
  templateUrl: './selfie-photo.component.html'
})
export class SelfiePhotoComponent implements OnInit, AfterViewInit {

  videoContainer: HTMLDivElement = null;
  videoEle: HTMLVideoElement = null;
  canvasEle: HTMLCanvasElement = null;
  canvasCtx: CanvasRenderingContext2D = null;
  video = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document
  ) {

  }

  ngOnInit(): void {
    Utils.loadScript("assets/mediapipe/camera_utils.js");
    Utils.loadScript("assets/mediapipe/control_utils.js");
    Utils.loadScript("assets/mediapipe/drawing_utils.js");
    Utils.loadScript("assets/mediapipe/face_mesh.js");
  }

  ngAfterViewInit(): void {
  }

  takePhoto() {
    this.initCamera();
  }

  initCamera() {
    this.videoContainer = <HTMLDivElement>document.querySelector('#videoContainer');
    this.videoEle = <HTMLVideoElement>document.querySelector("#video");
    this.canvasEle = <HTMLCanvasElement>document.querySelector("#canvas");
    this.canvasCtx = <CanvasRenderingContext2D>this.canvasEle.getContext('2d');

    const faceMesh = new FaceMesh({
      locateFile: (file: string) => {
        return `assets/mediapipe/${file}`;
      }
    });
    faceMesh.setOptions({
      enableFaceGeometry: false,
      maxNumFaces: 1,
      refineLandmarks: false,
      minDetectionConfidence: 0.95,
      minTrackingConfidence: 0.95
    });
    faceMesh.onResults((a:any) => this.onResults(a));

    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user"
      },
      audio: false,
    }).then((stream) => {
      this.videoEle.srcObject = stream;

      this.videoContainer.style.display = 'block';
      this.canvasEle.width = this.videoContainer.clientWidth;
      this.canvasEle.height = this.videoContainer.clientHeight;
      this.video = true;

      let that = this;
      function onFrame() {
        faceMesh.send({
          image: that.videoEle
        }).then(() => {
          if (!that.videoEle.paused && !that.videoEle.ended) {
            requestAnimationFrame(onFrame)
          }
        })
      }
      onFrame();
    });
  }

  onResults(results: any) {
    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvasEle.width, this.canvasEle.height);
    this.canvasCtx.drawImage(results.image, 0, 0, this.canvasEle.width, this.canvasEle.height);
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        //drawMesh(landmarks);
        this.drawMask(landmarks);
      }
    }
    this.canvasCtx.restore();
  }

  loadImage(url: string) {
    let img = new Image();
    img.src = url;
    return img;
  }

  imgDogEarRight = this.loadImage("assets/images/masks/dog-ear-right.png");
  imgDogEarLeft = this.loadImage("assets/images/masks/dog-ear-left.png");
  imgDogNose = this.loadImage("assets/images/masks/dog-nose.png");

  filters = [
    {
      name: 'dog-nose',
      imagePath:'assets/images/masks/dog-nose.png',
      annoPath : 'assets/images/masks/dog-nose.csv',
    }
  ]

  drawMask(landmarks: { x: number, y: number, z: number }[]) {
    this.canvasCtx.drawImage(this.imgDogEarRight, this.canvasEle.width * landmarks[103].x - 100, this.canvasEle.height * landmarks[103].y - 90);
    this.canvasCtx.drawImage(this.imgDogEarLeft, this.canvasEle.width * landmarks[332].x - 0, this.canvasEle.height * landmarks[332].y - 90);
    this.canvasCtx.drawImage(this.imgDogNose, this.canvasEle.width * landmarks[1].x - 54, this.canvasEle.height * landmarks[1].y - 32);
  }
}

