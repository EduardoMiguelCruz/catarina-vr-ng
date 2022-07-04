import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//primeng
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import {DividerModule} from 'primeng/divider';

//components
import { AppComponent } from './app.component';
import { DedicatoriaButtonComponent } from './components/dedicatoria-button/dedicatoria-button.component';
import { SelfiePhotoComponent } from './components/selfie-photo/selfie-photo.component';
import { VrCameraComponent } from './components/vr-camera/vr-camera.component';
import { VrComponent } from './pages/vr.component';

const routes: Routes = [
  { path: '', redirectTo: '/vr', pathMatch: 'full' },
  { path: 'vr', component: VrComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DedicatoriaButtonComponent,
    SelfiePhotoComponent,
    VrCameraComponent,
    VrComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NoopAnimationsModule,
    ReactiveFormsModule,

    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    DividerModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
