import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionPeliculaComponent } from './edicion-pelicula.component';

describe('EdicionPeliculaComponent', () => {
  let component: EdicionPeliculaComponent;
  let fixture: ComponentFixture<EdicionPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionPeliculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicionPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
