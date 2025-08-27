import { Component, OnInit } from '@angular/core'; // OnInit neu
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router'; // NEU

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  // implements OnInit neu

  userId = ''; // Variable gesetzt

  constructor(private route: ActivatedRoute) {} // NEU

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id') || ''; // So ist userId immer ein String !!! 'id' weil in den Routes so festgelegt.
      console.log('GOT ID', this.userId);
    });
  }
}
