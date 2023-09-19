import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantProyectosComponent } from './mant-proyectos.component';

describe('MantProyectosComponent', () => {
  let component: MantProyectosComponent;
  let fixture: ComponentFixture<MantProyectosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantProyectosComponent]
    });
    fixture = TestBed.createComponent(MantProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
