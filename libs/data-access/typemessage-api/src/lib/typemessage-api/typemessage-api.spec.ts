import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypemessageApi } from './typemessage-api';

describe('TypemessageApi', () => {
  let component: TypemessageApi;
  let fixture: ComponentFixture<TypemessageApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypemessageApi],
    }).compileComponents();

    fixture = TestBed.createComponent(TypemessageApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
