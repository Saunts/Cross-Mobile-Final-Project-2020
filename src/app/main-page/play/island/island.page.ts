import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-island',
  templateUrl: './island.page.html',
  styleUrls: ['./island.page.scss'],
})
export class IslandPage implements OnInit {
  user: any;
  island: Array<{}> = [
    'JAWA',
    'SUMATERA',
    'KALIMANTAN',
    'NUSA_TENGGARA_DAN_BALI',
    'SULAWESI',
    'MALUKU_DAN_PAPUA'
  ]

  constructor(
    private profileSvc: ProfileService
  ) { }

  ngOnInit() {

  }

}
