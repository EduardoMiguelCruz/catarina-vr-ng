import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'dedicatoria-button',
  templateUrl: './dedicatoria-button.component.html'
})
export class DedicatoriaButtonComponent {

  displayDialog = false;
  form: FormGroup;

  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private firebaseService: FirebaseService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required],
      image: [null]
    })
  }

  showDialog() {
    this.displayDialog = true;
  }

  submitForm() {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.loading = true;
      this.firebaseService.setDedicatoria({
        name: this.form.value.name,
        message: this.form.value.message,
        image: this.form.value.image
      }).then((docRef: any) => {
        this.messageService.add({
          key: 'successToast',
          severity: 'success',
          summary: 'Obrigado pela tua dedicatória'
        });

        this.displayDialog = false;
      })
        .catch((error: any) => {
          this.messageService.add({
            key: 'errorToast',
            severity: 'error',
            summary: 'Erro ao enviar dedicatória'
          });

          console.error("Error adding document: ", error);
        }).finally(() => {
          this.loading = false;
        });
    }
  }

  close() {
    this.displayDialog = false;
  }

  imageSrc: string = '';
  myUploader(event: any) {

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.form.get('image').setValue(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
}
