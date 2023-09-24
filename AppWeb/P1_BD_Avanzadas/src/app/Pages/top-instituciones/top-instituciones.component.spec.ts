import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInstitucionesComponent } from './top-instituciones.component';

describe('TopInstitucionesComponent', () => {
  let component: TopInstitucionesComponent;
  let fixture: ComponentFixture<TopInstitucionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopInstitucionesComponent]
    });
    fixture = TestBed.createComponent(TopInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
