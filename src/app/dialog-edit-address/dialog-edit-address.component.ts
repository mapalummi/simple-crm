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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-address',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    NgIf,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  firestore: Firestore = inject(Firestore);

  user!: User;
  userId!: string;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {}

  async saveUser() {
    this.loading = true;
    try {
      const userDocRef = doc(this.firestore, 'users', this.userId);
      await updateDoc(userDocRef, this.user.toJSON());
      this.dialogRef.close();
    } catch (error) {
      console.log('Error at saving:', error);
      this.loading = false;
    }
  }
}
