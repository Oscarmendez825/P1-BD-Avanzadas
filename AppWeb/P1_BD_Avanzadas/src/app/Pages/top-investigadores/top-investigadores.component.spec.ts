import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInvestigadoresComponent } from './top-investigadores.component';

describe('TopInvestigadoresComponent', () => {
  let component: TopInvestigadoresComponent;
  let fixture: ComponentFixture<TopInvestigadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopInvestigadoresComponent]
    });
    fixture = TestBed.createComponent(TopInvestigadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
