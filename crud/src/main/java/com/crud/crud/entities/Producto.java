package com.crud.crud.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data //Contiene getters and settrers
@NoArgsConstructor
@Entity
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @NotBlank
    private String nombre;

    @NotNull
    @NotBlank
    private String descripcion;

    @Positive
    private double precio;
    
}
