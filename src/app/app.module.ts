import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

//primeng
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

import { GalleryModule, GALLERY_CONFIG } from 'ng-gallery';

//services
import { FirebaseService } from './services/firebase.service';

//components
import { AppComponent } from './app.component';
import { DedicatoriaButtonComponent } from './components/dedicatoria-button/dedicatoria-button.component';
import { DedicatoriaFormComponent } from './components/dedicatoria-form/dedicatoria-form.component';
import { SelfiePhotoComponent } from './components/selfie-photo/selfie-photo.component';
import { VrCameraComponent } from './components/vr-camera/vr-camera.component';

//pages
import { VrComponent } from './pages/vr/vr.component';
import { ViewDedicatoriasComponent } from './pages/view/view-dedicatorias.component'
import { GalleryComponent } from './pages/gallery/gallery.component';
import { IndexComponent as Index1Component } from './pages/Template1/index.component';

const routes: Routes = [
  { path: '', redirectTo: '/1', pathMatch: 'full' },
  { path: 'vr', component: VrComponent },
  { path: 'view', component: ViewDedicatoriasComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '1', component: Index1Component },
  { path: 'vrframe', component: VrCameraComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DedicatoriaButtonComponent,
    DedicatoriaFormComponent,
    SelfiePhotoComponent,
    VrCameraComponent,
    //pages
    VrComponent,
    ViewDedicatoriasComponent,
    GalleryComponent,

    Index1Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NoopAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    DividerModule,
    CardModule,
    GalleryModule
  ],
  providers: [
    MessageService,
    FirebaseService,
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: true,
        imageSize: 'cover'
      }
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
