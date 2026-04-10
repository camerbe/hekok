import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Typemessage } from './typemessage';

describe('Typemessage', () => {
  let component: Typemessage;
  let fixture: ComponentFixture<Typemessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Typemessage],
    }).compileComponents();

    fixture = TestBed.createComponent(Typemessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
