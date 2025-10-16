import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeituraList } from './leitura-list';

describe('LeituraList', () => {
  let component: LeituraList;
  let fixture: ComponentFixture<LeituraList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeituraList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeituraList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
