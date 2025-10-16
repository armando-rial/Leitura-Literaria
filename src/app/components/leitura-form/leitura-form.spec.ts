import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeituraForm } from './leitura-form';

describe('LeituraForm', () => {
  let component: LeituraForm;
  let fixture: ComponentFixture<LeituraForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeituraForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeituraForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
