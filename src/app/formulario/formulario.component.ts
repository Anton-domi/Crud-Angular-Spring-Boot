import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';


// Funcion de validador personalizada para evitar caracteres especiales
function noSpecialCharacters(control: any) {
  const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]*$/; // Solo letras, números y espacios
  if (control.value && !regex.test(control.value)) {
    return { invalidCharacter: true }; // Si hay caracteres no permitidos, devuelve error
  }
  return null; // Si pasa la validación, no hay error
}

@Component({
  selector: 'app-formulario', // Nombre del componente
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CardModule
  ],
  templateUrl: './formulario.component.html', // HTML asociado
  styleUrls: ['./formulario.component.css'] // Estilos asociados
})
export class FormularioComponent {
  formProducto!: FormGroup; // Formulario reactivo
  isSaveInProgress: boolean = false; // Estado de guardado
  edit: boolean = false; // Modo edición

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService, // Servicio para llamadas al backend
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    // Inicializacion del formulario con validaciones
    this.formProducto = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, noSpecialCharacters]],
      descripcion: ['', [Validators.required, noSpecialCharacters]],
      precio: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Obtener parametro de la URL
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.edit = true;
      this.getProductoById(+id!); // Cargar datos si estamos editando
    }
  }

  // Obtener un producto por ID desde el backend
  getProductoById(id: number) {
    this.productoService.getProductoById(id).subscribe({
      next: (foundProducto) => {
        // Cargar datos en el formulario
        this.formProducto.patchValue(foundProducto);
      },
      error: () => {
        this.router.navigateByUrl('/');
      },
    });
  }

  // Crear nuevo producto
  createProducto() {

    if (this.formProducto.invalid) {
      // Validacion fallida
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente'
      });
      return;
    }

    this.isSaveInProgress = true;
    this.productoService.createProducto(this.formProducto.value).subscribe({
      next: () => {
        // Exito al guardar
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Producto Guardado Correctamente'
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        // Error al guardar
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente'
        });
      },
    });
  }

  // Actualiza producto existente
  updateProducto() {
    if (this.formProducto.invalid) {
      // Validacion fallida
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente'
      });
      return;
    }

    this.isSaveInProgress = true; //Marca que se esta procesando el guardado
    this.productoService.updateProducto(this.formProducto.value).subscribe({//envia el producto actualizado al backend por HTTP.
      next: () => {

        // Exito al actualizar
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Producto actualizado Correctamente'
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        // Error al actualizar
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente'
        });
      },
    });
  }
  cancelar() {
    this.router.navigate(['/']); // Redirige a la pagina principal
  }
}
