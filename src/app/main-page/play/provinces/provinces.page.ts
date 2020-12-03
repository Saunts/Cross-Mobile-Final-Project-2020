import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.page.html',
  styleUrls: ['./provinces.page.scss'],
})
export class ProvincesPage implements OnInit {
  user: any;
  jawa: Array<{}> = [
    'BANTEN',
    'JAKARTA',
    'JAWA_BARAT',
    'JAWA_TENGAH',
    'YOGYAKARTA',
    'JAWA_TIMUR'
  ]
  ISLAND: any;
  province_unlocked:  Array<{}> = [];
  province_locked: Array<{}> = [];
  locked: any;
  constructor(
    private route: ActivatedRoute,
    private profileSvc: ProfileService
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      if(!paramMap.has('island')) {
        return;
      }
      this.ISLAND = paramMap.get('island');
    });
    console.log(this.ISLAND);
    await this.profileSvc.fetchProfile()
    .then((data) => {
      console.log('data clear: '+data.clear.length);
      for(var y = 0; y <= data.clear.length; y++) {
        this.province_unlocked.push(this.jawa[y]);
      }
    });
    console.log('province unlock: '+this.province_unlocked);
    if(this.ISLAND == 'JAWA') {
      this.locked =  this.province_unlocked.length;
      console.log('locked: '+this.locked);
      for(var x = this.locked; x < this.jawa.length; x++) {
        this.province_locked.push(this.jawa[x]);
      }
    }
  }

}
