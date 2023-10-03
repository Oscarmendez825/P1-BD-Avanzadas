import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaAreasComponent } from './busqueda-areas.component';

describe('BusquedaAreasComponent', () => {
  let component: BusquedaAreasComponent;
  let fixture: ComponentFixture<BusquedaAreasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaAreasComponent]
    });
    fixture = TestBed.createComponent(BusquedaAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
