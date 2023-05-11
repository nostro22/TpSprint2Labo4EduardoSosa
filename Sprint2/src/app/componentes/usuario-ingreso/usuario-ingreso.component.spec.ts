import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioIngresoComponent } from './usuario-ingreso.component';

describe('UsuarioIngresoComponent', () => {
  let component: UsuarioIngresoComponent;
  let fixture: ComponentFixture<UsuarioIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioIngresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
