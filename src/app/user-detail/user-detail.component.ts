import { Component, inject, OnInit } from '@angular/core'; // OnInit neu
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router'; // NEU
import { User } from '../../models/user.class';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  // implements OnInit neu

  firestore: Firestore = inject(Firestore);

  readonly dialog = inject(MatDialog);

  userId = ''; // Variable gesetzt
  user: User | null = null; // NEU

  constructor(private route: ActivatedRoute) {} // NEU

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id') || ''; // So ist userId immer ein String !!! 'id' weil in den Routes so festgelegt.
      // console.log('GOT ID', this.userId);
      this.getUser();
    });
  }

  async getUser() {
    if (!this.userId) return;
    const userDocRef = doc(this.firestore, 'users', this.userId);
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      this.user = new User({ ...data, id: userSnap.id }); // <-- Typisierung und ID
      // console.log('Retrieved user', this.user);
    } else {
      this.user = null;
      console.log('Found no user!');
    }
  }

  editMenu() {
    if (this.user) {
      const dialog = this.dialog.open(DialogEditAddressComponent);
      // dialog.componentInstance.user = this.user;
      dialog.componentInstance.user = new User(this.user.toJSON()); // Kopie vom Object erstellen
      dialog.componentInstance.userId = this.userId; // ID mit übergeben
      

      dialog.afterClosed().subscribe(() => {
        this.getUser(); // Methode, die die User-Daten neu lädt
      });
    }
  }

  editUserDetail() {
    if (this.user) {
      const dialog = this.dialog.open(DialogEditUserComponent);
      // dialog.componentInstance.user = this.user;
      dialog.componentInstance.user = new User(this.user.toJSON()); // Kopie vom Object
      dialog.componentInstance.userId = this.userId; // ID mit übergeben

      dialog.afterClosed().subscribe(() => {
        this.getUser(); // Methode, die die User-Daten neu lädt
      });
    }
  }
}
