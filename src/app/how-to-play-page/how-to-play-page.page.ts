import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-to-play-page',
  templateUrl: './how-to-play-page.page.html',
  styleUrls: ['./how-to-play-page.page.scss'],
})
export class HowToPlayPagePage implements OnInit {
  private page;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.page = 0;
  }

  handleKembali() {
    if(this.page == 0) {
      this.router.navigate(['/how-to-play']);
    }
    else {
      this.page -= 1;
      this.router.navigate(['/how-to-play']);
    }
  }
  
  handleLanjut() {
    if(this.page == 4) {
      this.router.navigate(['/main/menu']);
    }
    else {
      this.page += 1;
      this.router.navigate(['/how-to-play']);
    }
  }

}
