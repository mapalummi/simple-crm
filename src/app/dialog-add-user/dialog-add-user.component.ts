import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- wichtig für ngModel!
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user.class'; // Verknüpfung zur user.class.ts !!!
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { NgIf } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule, // <--- wichtig für ngModel!
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatProgressBarModule,
    NgIf,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);

  // Variable und neue Instanz für neuen User erstellen:
  user = new User();
  birthDate: Date | null = null; // Initialwert setzen!
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  async saveUser() {
    this.user.birthDate = this.birthDate?.getTime() ?? null;
    this.loading = true;
    // console.log('Current user is', this.user);

    try {
      const usersCollection = collection(this.firestore, 'users');
      const docRef = await addDoc(usersCollection, this.user.toJSON());
      // console.log('Adding user finished', docRef.id);
      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding user:', error);
      this.loading = false;
    }
  }
}
