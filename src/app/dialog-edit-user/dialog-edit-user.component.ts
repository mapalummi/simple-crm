import { Component } from '@angular/core';

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

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatIconModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
user!: User;
birthDate: Date | null = null; // Initialwert setzen!

constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {}

  saveUser(){}
}
