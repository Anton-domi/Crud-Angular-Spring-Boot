package com.crud.crud.services;


import java.util.List;
import java.util.Optional;
import com.crud.crud.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.crud.crud.entities.Producto;


@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    ProductoRepository productoRepository;
    
    @Override
    public Producto saveProducto(Producto producto){
        return productoRepository.save(producto);
    }

    @Override
    public Producto updateProducto(Producto producto){
        return productoRepository.save(producto);
    }

    @Override
    public List<Producto> getProductos(){
        return productoRepository.findAll(Sort.by("id"));
    }

    @Override
    public Optional<Producto> getProductosById(int id){
        return productoRepository.findById(id);
    }

    @Override
    public void deleteProducto(int id){
        productoRepository.deleteById(id);
    }
}
