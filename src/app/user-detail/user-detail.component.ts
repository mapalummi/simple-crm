import { Component, inject, OnInit } from '@angular/core'; // OnInit neu
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router'; // NEU
import { User } from '../../models/user.class';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  // implements OnInit neu

  firestore: Firestore = inject(Firestore);

  userId = ''; // Variable gesetzt
  user: User | null = null; // NEU

  constructor(private route: ActivatedRoute) {} // NEU

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id') || ''; // So ist userId immer ein String !!! 'id' weil in den Routes so festgelegt.
      console.log('GOT ID', this.userId);
      this.getUser();
    });
  }

  // TODO: Mit Firebase Doku abgleichen !!!
  async getUser() {
    if (!this.userId) return;
    const userDocRef = doc(this.firestore, 'users', this.userId);
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      this.user = new User({ ...data, id: userSnap.id }); // <-- Typisierung und ID
      console.log('Retrieved user', this.user);
    } else {
      this.user = null;
      console.log('Found no user!');
    }
  }

  openAddressDialog(){

  }
}
