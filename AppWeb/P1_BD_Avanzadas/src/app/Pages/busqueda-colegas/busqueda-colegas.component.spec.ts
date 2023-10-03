import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaColegasComponent } from './busqueda-colegas.component';

describe('BusquedaColegasComponent', () => {
  let component: BusquedaColegasComponent;
  let fixture: ComponentFixture<BusquedaColegasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaColegasComponent]
    });
    fixture = TestBed.createComponent(BusquedaColegasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
