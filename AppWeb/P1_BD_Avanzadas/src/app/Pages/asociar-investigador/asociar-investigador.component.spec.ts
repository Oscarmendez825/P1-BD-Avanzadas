import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarInvestigadorComponent } from './asociar-investigador.component';

describe('AsociarInvestigadorComponent', () => {
  let component: AsociarInvestigadorComponent;
  let fixture: ComponentFixture<AsociarInvestigadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsociarInvestigadorComponent]
    });
    fixture = TestBed.createComponent(AsociarInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
