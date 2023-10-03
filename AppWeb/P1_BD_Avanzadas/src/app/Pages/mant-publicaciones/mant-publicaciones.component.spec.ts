import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantPublicacionesComponent } from './mant-publicaciones.component';

describe('MantPublicacionesComponent', () => {
  let component: MantPublicacionesComponent;
  let fixture: ComponentFixture<MantPublicacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantPublicacionesComponent]
    });
    fixture = TestBed.createComponent(MantPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
