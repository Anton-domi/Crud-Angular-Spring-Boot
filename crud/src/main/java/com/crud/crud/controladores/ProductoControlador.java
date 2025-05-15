package com.crud.crud.controladores;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import com.crud.crud.entities.Producto;
import com.crud.crud.services.ProductoServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/producto")  // Establece el endpoint base para este controlador
@CrossOrigin("http://localhost:4200/")  // Permite que las solicitudes desde el frontend en el puerto 4200 accedan a este backend
public class ProductoControlador {
    
    @Autowired
    ProductoServiceImpl productoServiceImpl;  // Inyecta el servicio para la gestion de productos, para acceder a las operaciones
    //endpoint
    // Metodo para guardar un nuevo producto
    @PostMapping  
    public ResponseEntity<Producto> saveProducto(@RequestBody Producto producto) {
        try {
            // Llama al servicio para guardar el producto y lo almacena en la base de datos
            Producto saveProducto = productoServiceImpl.saveProducto(producto);
            // Si la operación es exitosa, se devuelve una respuesta con el producto guardado y un estado HTTP 200 OK
            return new ResponseEntity<>(saveProducto, HttpStatus.OK);
        } catch (Exception e) {
            // Si ocurre un error, se devuelve una respuesta con un estado HTTP 400 Bad Request
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Metodo para actualizar un producto existente
    @PutMapping  
    public ResponseEntity<Producto> updateProducto(@RequestBody Producto producto) {
        try {
            // Llama al servicio para actualizar el producto y lo guarda en la base de datos
            Producto saveProducto = productoServiceImpl.updateProducto(producto);
            // Si la operación es exitosa, se devuelve una respuesta con el producto actualizado y un estado HTTP 200 OK
            return new ResponseEntity<>(saveProducto, HttpStatus.OK);
        } catch (Exception e) {
            // Si ocurre un error, se devuelve una respuesta con un estado HTTP 400 Bad Request
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Metodo para obtener todos los productos
    @GetMapping()  // 
    public ResponseEntity<List<Producto>> getAllProducto() {
        // Llama al servicio para obtener la lista de productos y devuelve una respuesta con el estado HTTP 200 OK
        return new ResponseEntity<>(productoServiceImpl.getProductos(), HttpStatus.OK);
    }

    // Metodo para obtener un producto por su ID
    @GetMapping("/{id}")  
    public ResponseEntity<Producto> getProductoByID(@PathVariable int id) {
        // Llama al servicio para obtener el producto por su ID
        Optional<Producto> producto = productoServiceImpl.getProductosById(id);
        // Si el producto no se encuentra, devuelve una respuesta con un estado HTTP 404 Not Found
        if (producto.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        // Si el producto se encuentra, devuelve una respuesta con el producto y un estado HTTP 200 OK
        return new ResponseEntity<>(producto.get(), HttpStatus.OK);
    }

    // Metodo para eliminar un producto por su ID
    @DeleteMapping("/{id}")  
    public ResponseEntity<Void> deleteProducto(@PathVariable int id) {
        // Llama al servicio para obtener el producto por su ID
        Optional<Producto> producto = productoServiceImpl.getProductosById(id);
        // Si el producto existe, lo elimina y devuelve una respuesta con estado HTTP 200 OK
        if (producto.isPresent()) {
            productoServiceImpl.deleteProducto(producto.get().getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            // Si el producto no se encuentra, devuelve una respuesta con estado HTTP 404 Not Found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
