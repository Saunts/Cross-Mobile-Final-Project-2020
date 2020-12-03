import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  PROVINCE: string;
  province: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      if(!paramMap.has('province')) {
        return;
      }
      this.PROVINCE = paramMap.get('province');
      this.province = this.PROVINCE.replace('_', ' ');
      this.province = this.capitalizeTheFirstLetterOfEachWord(this.province);
    });
  }

  capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
  }

}
