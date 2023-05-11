import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaActoresComponent } from './alta-actores.component';

describe('AltaActoresComponent', () => {
  let component: AltaActoresComponent;
  let fixture: ComponentFixture<AltaActoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaActoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaActoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
