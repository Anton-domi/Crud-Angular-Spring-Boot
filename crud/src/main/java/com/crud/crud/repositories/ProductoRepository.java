package com.crud.crud.repositories;

import org.springframework.data.jpa.repository.JpaRepository;  
import org.springframework.stereotype.Repository;  
import com.crud.crud.entities.Producto;  

@Repository  // Marca la interfaz como un repositorio para que Spring pueda gestionarla y crear una implementación de esta interfaz.
public interface ProductoRepository extends JpaRepository<Producto, Integer> {

   
}
