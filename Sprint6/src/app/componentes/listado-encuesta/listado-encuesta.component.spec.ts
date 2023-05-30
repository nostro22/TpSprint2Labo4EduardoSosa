import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEncuestaComponent } from './listado-encuesta.component';

describe('ListadoEncuestaComponent', () => {
  let component: ListadoEncuestaComponent;
  let fixture: ComponentFixture<ListadoEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoEncuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
