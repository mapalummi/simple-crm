import { Component, inject } from '@angular/core'; // `inject` hier importieren
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

import { User } from '../../models/user.class'; // Verknüpfung zur user.class.ts !!!

@Component({
  selector: 'app-user',
  standalone: true, // <--- Das ist wichtig!
  imports: [MatIconModule, MatTooltipModule, MatButtonModule, MatDialogModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  // Mit `inject` bekommst du eine Instanz des `MatDialog` Services direkt in einer Eigenschaft. Kein Konstruktor mehr nötig, wenn dieser keine andere Aufgabe hat.
  readonly dialog = inject(MatDialog);

  // Variable und neue Instanz für neuen User erstellen:
  user = new User();

  constructor() {}

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
