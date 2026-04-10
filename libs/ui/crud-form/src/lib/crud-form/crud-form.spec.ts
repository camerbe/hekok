import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudForm } from './crud-form';

describe('CrudForm', () => {
  let component: CrudForm;
  let fixture: ComponentFixture<CrudForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CrudForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
