import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaProyectoComponent } from './busqueda-proyecto.component';

describe('BusquedaProyectoComponent', () => {
  let component: BusquedaProyectoComponent;
  let fixture: ComponentFixture<BusquedaProyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaProyectoComponent]
    });
    fixture = TestBed.createComponent(BusquedaProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
