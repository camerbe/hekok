import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleApi } from './article-api';

describe('ArticleApi', () => {
  let component: ArticleApi;
  let fixture: ComponentFixture<ArticleApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleApi],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
