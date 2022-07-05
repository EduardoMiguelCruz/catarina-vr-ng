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
      message: ['', Validators.required]
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
      }).then((docRef: any) => {
        this.messageService.add({
          key: 'successToast',
          severity: 'success',
          summary: 'Obrigado pela tua dedicatória'
        });

        this.displayDialog = false;
      })
        .catch((error: any) => {
          console.error("Error adding document: ", error);
        }).finally(() => {
          this.loading = false;
        });
    }
  }

  close() {
    this.displayDialog = false;
  }
}
