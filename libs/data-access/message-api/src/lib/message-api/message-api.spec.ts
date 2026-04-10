import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageApi } from './message-api';

describe('MessageApi', () => {
  let component: MessageApi;
  let fixture: ComponentFixture<MessageApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageApi],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
