package com.crud.crud.services;

import java.util.List;
import java.util.Optional;

import com.crud.crud.entities.Producto;

public interface ProductoService {

    Producto saveProducto(Producto producto);
    Producto updateProducto(Producto producto);
    List<Producto> getProductos();

    Optional<Producto> getProductosById(int id);
    
    void deleteProducto(int id);
}
