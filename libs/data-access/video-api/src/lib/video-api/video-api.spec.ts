import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoApi } from './video-api';

describe('VideoApi', () => {
  let component: VideoApi;
  let fixture: ComponentFixture<VideoApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoApi],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
