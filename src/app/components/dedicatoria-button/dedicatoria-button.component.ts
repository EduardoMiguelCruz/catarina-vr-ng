import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Firestore } from 'firebase/firestore/lite';

@Component({
  selector: 'dedicatoria-button',
  templateUrl: './dedicatoria-button.component.html'
})
export class DedicatoriaButtonComponent implements OnInit {

  displayDialog = false;
  form: FormGroup;

  db: Firestore = <any>null;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    initializeApp({
      projectId: 'batizado-casamento',
      databaseURL: "https://batizado-casamento.firebaseio.com"
    });
    this.db = getFirestore();
  }

  showDialog() {
    this.displayDialog = true;
  }

  submitForm() {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.loading = true;
      const messagesCol = collection(this.db, "messages")
      addDoc(messagesCol, {
        name: this.form.value.name,
        message: this.form.value.message,
      })
        .then((docRef: any) => {
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
