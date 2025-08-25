import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- Das ist wichtig für ngModel!
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user.class'; // Verknüpfung zur user.class.ts !!!

import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule, // <--- Das ist wichtig für ngModel!
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);

  // Variable und neue Instanz für neuen User erstellen:
  user = new User();
  birthDate: Date | null = null; // Initialwert setzen!

  constructor() {}

  saveUser() {
    this.user.birthDate = this.birthDate?.getTime() ?? null;
    console.log('Current user is', this.user);

    //   this.firestore
    //   .collection('users')
    //   .add(this.user)
    //   .then((result: any) => {
    //     console.log('Adding user finished', result);
    //   });
    // }

    const docRef = await addDoc(collection(db, 'cities'), {
      name: 'Tokyo',
      country: 'Japan',
    });
    console.log('Document written with ID: ', docRef.id);
  }
}
