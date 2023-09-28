import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAreasComponent } from './top-areas.component';

describe('TopAreasComponent', () => {
  let component: TopAreasComponent;
  let fixture: ComponentFixture<TopAreasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopAreasComponent]
    });
    fixture = TestBed.createComponent(TopAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
