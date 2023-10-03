import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarArticuloComponent } from './asociar-articulo.component';

describe('AsociarArticuloComponent', () => {
  let component: AsociarArticuloComponent;
  let fixture: ComponentFixture<AsociarArticuloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsociarArticuloComponent]
    });
    fixture = TestBed.createComponent(AsociarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
