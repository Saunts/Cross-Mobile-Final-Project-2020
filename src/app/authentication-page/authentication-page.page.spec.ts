import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthenticationPagePage } from './authentication-page.page';

describe('AuthenticationPagePage', () => {
  let component: AuthenticationPagePage;
  let fixture: ComponentFixture<AuthenticationPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
