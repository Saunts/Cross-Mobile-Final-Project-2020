import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsertQuizPage } from './insert-quiz.page';

describe('InsertQuizPage', () => {
  let component: InsertQuizPage;
  let fixture: ComponentFixture<InsertQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsertQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
