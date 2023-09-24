import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaInvestigadorComponent } from './busqueda-investigador.component';

describe('BusquedaInvestigadorComponent', () => {
  let component: BusquedaInvestigadorComponent;
  let fixture: ComponentFixture<BusquedaInvestigadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaInvestigadorComponent]
    });
    fixture = TestBed.createComponent(BusquedaInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
