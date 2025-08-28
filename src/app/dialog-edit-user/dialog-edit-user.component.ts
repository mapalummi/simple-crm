import { Component, inject } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Firestore } from '@angular/fire/firestore';
import { doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatProgressBarModule,
    NgIf,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  firestore: Firestore = inject(Firestore);

  user!: User;
  birthDate: Date | null = null; // Initialwert setzen!
  userId!: string;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {}

  // ALTE Methode
  // saveUser(){
  //   this.firestore
  //   .collection('users')
  //   .doc(this.userId)
  //   .update(this.user.toJSON());
  // }

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
