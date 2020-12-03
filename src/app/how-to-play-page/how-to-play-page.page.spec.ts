import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HowToPlayPagePage } from './how-to-play-page.page';

describe('HowToPlayPagePage', () => {
  let component: HowToPlayPagePage;
  let fixture: ComponentFixture<HowToPlayPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToPlayPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HowToPlayPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
