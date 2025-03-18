import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaAlumnoComponent } from './busqueda-alumno.component';

describe('BusquedaAlumnoComponent', () => {
  let component: BusquedaAlumnoComponent;
  let fixture: ComponentFixture<BusquedaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
