
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-principal',
  standalone: true, 
  imports: [ 
    ButtonModule,
    RouterModule,
    CardModule,
    TableModule,
    InputTextModule,
    FormsModule,

  ],
  templateUrl: './principal.component.html', 
  styleUrls: ['./principal.component.css']  

})
export class PrincipalComponent {

  // Lista completa de productos recibida desde el backend
  productos: Producto[] = [];

  // Lista de productos filtrados que se muestra en la tabla
  productosFiltrados: Producto[] = [];

  // Bandera para indicar si se esta eliminando un producto
  isDeleteInProgress: boolean = false;

  // Campo para almacenar el texto ingresado en la busqueda
  busqueda: string = '';

  constructor(
    private productoService: ProductoService,
    private messageService: MessageService
  ) { }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.getAllProductos(); // Cargar todos los productos al iniciar
  }

  // Obtiene todos los productos desde el backend
  getAllProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data; // Lista completa
      this.productosFiltrados = [...data];
    });
  }

  // Elimina un producto por su ID
  deleteProducto(id: number) {
    this.isDeleteInProgress = true;

    this.productoService.deleteProducto(id).subscribe({
      next: () => {
       
        this.productos = this.productos.filter(p => p.id !== id);

        // Volver a aplicar el filtro actual
        this.buscar();

        // Mostrar mensaje de exito
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Producto eliminado Correctamente'
        });

        this.isDeleteInProgress = false;
      },
      error: () => {
        this.isDeleteInProgress = false;

        // Mostrar mensaje de error si no se pudo eliminar
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el producto'
        });
      },
    });
  }

  // Filtra productos por nombre usando el texto ingresado en busqueda
  buscar() {
    const termino = this.busqueda.trim().toLowerCase();

    if (!termino) {
      this.productosFiltrados = [...this.productos];
      return;
    }

    this.productosFiltrados = this.productos.filter(p =>
      (p.nombre ?? '').toLowerCase().includes(termino) ||
      p.id.toString() === termino
    );
  }
  // Limpia el campo de busqueda y muestra todos los productos nuevamente
  limpiarBusqueda() {
    this.busqueda = '';
    this.productosFiltrados = [...this.productos];
  }
}
