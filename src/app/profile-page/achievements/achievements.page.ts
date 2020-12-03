import { Component, OnInit } from '@angular/core';
import { strict } from 'assert';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.page.html',
  styleUrls: ['./achievements.page.scss'],
})
export class AchievementsPage implements OnInit {
  user: any;
  achievement_unlocked: any;
  achievement_locked: Array<{}> = [];
  locked: any;

  constructor(
    private profileSvc: ProfileService
  ) { }

  async ngOnInit() {
    await this.profileSvc.fetchProfile()
    .then((data) => {
      this.achievement_unlocked = data.achievement;
    });
    this.locked = 32 - this.achievement_unlocked.length;
    for(var x = 0; x < this.locked; x++) {
      this.achievement_locked.push({x});
    }
  }

}
