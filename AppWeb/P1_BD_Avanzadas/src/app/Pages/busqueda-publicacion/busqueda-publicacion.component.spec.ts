import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPublicacionComponent } from './busqueda-publicacion.component';

describe('BusquedaPublicacionComponent', () => {
  let component: BusquedaPublicacionComponent;
  let fixture: ComponentFixture<BusquedaPublicacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaPublicacionComponent]
    });
    fixture = TestBed.createComponent(BusquedaPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
