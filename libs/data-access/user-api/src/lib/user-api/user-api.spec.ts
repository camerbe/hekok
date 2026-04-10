import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserApi } from './user-api';

describe('UserApi', () => {
  let component: UserApi;
  let fixture: ComponentFixture<UserApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserApi],
    }).compileComponents();

    fixture = TestBed.createComponent(UserApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
