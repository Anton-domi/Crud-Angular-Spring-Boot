import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root' // Hace unica instancia en toda la app)
})
export class ProductoService {

  // URL base del backend
  private apiUrl = 'http://localhost:8080/producto';

  //Cliente HTTP para realizar peticiones al backend
  constructor(private http: HttpClient) { }

  //Obtiene la lista completa de productos.
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  //Obtiene un producto especifico por su ID.
  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  //Crea un nuevo producto en el backend.
  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  //Actualiza un producto existente en el backend.
  updateProducto(producto: Producto) {
    return this.http.put(this.apiUrl, producto);
  }

  //Elimina un producto por su ID.
  deleteProducto(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
