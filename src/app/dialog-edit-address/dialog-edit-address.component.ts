import { Component, inject } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Firestore } from '@angular/fire/firestore';
import { doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  firestore: Firestore = inject(Firestore);

  user!: User;
  userId!: string;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {}

  // ALTE Methode
  // saveUser(){
  //   this.firestore
  //   .collection('users')
  //   .doc(this.userId)
  //   .update(this.user.toJSON());
  // }

  async saveUser() {
    const userDocRef = doc(this.firestore, 'users', this.userId);
    await updateDoc(userDocRef, this.user.toJSON());
    this.dialogRef.close();
  }
}
