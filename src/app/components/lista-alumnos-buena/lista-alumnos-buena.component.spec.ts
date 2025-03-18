import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlumnosBuenaComponent } from './lista-alumnos-buena.component';

describe('ListaAlumnosBuenaComponent', () => {
  let component: ListaAlumnosBuenaComponent;
  let fixture: ComponentFixture<ListaAlumnosBuenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAlumnosBuenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAlumnosBuenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
