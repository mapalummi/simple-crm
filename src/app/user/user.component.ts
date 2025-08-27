import { Component, inject, OnDestroy, OnInit } from '@angular/core'; // `inject` hier importieren
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class'; // Verknüpfung zur user.class.ts !!!
import { MatCardModule } from '@angular/material/card';

import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-user',
  standalone: true, // <--- wichtig!
  imports: [
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    NgForOf
],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  // documents: any[] = []; //Neu
  documents: User[] = [];

  private unsubscribeFromFirestore?: () => void; //Neu

  firestore: Firestore = inject(Firestore);

  // Mit `inject` bekommst du eine Instanz des `MatDialog` Services direkt in einer Eigenschaft. Kein Konstruktor mehr nötig, wenn dieser keine andere Aufgabe hat.
  readonly dialog = inject(MatDialog);

  // Variable und neue Instanz für neuen User erstellen:
  user = new User();
  allUsers: User[] = []; // Leeres Array für die Änderungen aus Firestore

  constructor() {}

  
  ngOnInit(): void {
    // Initialisierung des Firestore-Listeners
    const collectionRef = collection(this.firestore, 'users');

    // Die onSnapshot-Funktion gibt eine Unsubscribe-Funktion zurück
    this.unsubscribeFromFirestore = onSnapshot(
      collectionRef,
      (querySnapshot) => {
        const users = querySnapshot.docs.map(
          (doc) =>
            new User({
              id: doc.id,
              ...doc.data(),
            })
        );
        this.documents = users;
        this.allUsers = users;
        console.log('Daten wurden aktualisiert:', this.documents);
      }
    );
  }


  ngOnDestroy(): void {
    // Abbestellen des Listeners, wenn die Komponente zerstört wird
    if (this.unsubscribeFromFirestore) {
      this.unsubscribeFromFirestore();
      console.log('Firestore-Listener wurde erfolgreich abbestellt.');
    }
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
