import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  templateUrl: './view-dedicatorias.component.html'
})
export class ViewDedicatoriasComponent implements OnInit {

  list: { name: string, message: string }[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) {

  }

  ngOnInit(): void {
    this.firebaseService.getDedicatorias().then(querySnapshot => {
      this.list = [];
      querySnapshot.forEach(n => {
        this.list.push(<any>n.data());
      });
    })
  }
}
