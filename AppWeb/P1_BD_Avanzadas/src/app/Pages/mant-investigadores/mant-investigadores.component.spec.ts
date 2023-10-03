import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantInvestigadoresComponent } from './mant-investigadores.component';

describe('MantInvestigadoresComponent', () => {
  let component: MantInvestigadoresComponent;
  let fixture: ComponentFixture<MantInvestigadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantInvestigadoresComponent]
    });
    fixture = TestBed.createComponent(MantInvestigadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
