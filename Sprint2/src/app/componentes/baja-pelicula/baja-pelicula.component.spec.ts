import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaPeliculaComponent } from './baja-pelicula.component';

describe('BajaPeliculaComponent', () => {
  let component: BajaPeliculaComponent;
  let fixture: ComponentFixture<BajaPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajaPeliculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
