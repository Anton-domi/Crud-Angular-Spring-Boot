# CRDU-COPPEL

CRUD de productos para Coppel.

# Primeros pasos

# Backend

Tecnologias usadas:

- Java 21
- Spring Boot 3.4.5
- Spring Data JPA
- Spring Web
- PostgreSQL Driver
- Lombok
- Validation
- PostgreSQL

# Frontend

Tecnologias usadas:

- Angular 19
- PrimeNG

---

# Instalacion de Angular 19

# 1. Verifica que tengas Node.js instalado

Ejecuta el siguiente comando para comprobar la version:

```bash
node -v
```

> Angular 19 requiere Node.js 18.13.0 o superior.

Si no lo tienes, descargalo desde [https://nodejs.org](https://nodejs.org)

### 2. Instala Angular CLI versiion 19

```bash
npm install -g @angular/cli@19
```

# 3. Verifica la instalacion de Angular

```bash
ng version
```

# 4. Crea un nuevo proyecto Angular

```bash
ng new nombre-de-tu-proyecto
cd nombre-de-tu-proyecto
ng serve
```

---

# Instalacion de PrimeNG

Ejecuta los siguientes comandos dentro de tu proyecto Angular:

```bash
npm install primeng @angular/animations @angular/cdk
npm install primeicons
```



## Ejecucion del proyecto

# Backend

1. Abre el proyecto Spring Boot en tu IDE (IntelliJ, Eclipse, etc.).
2. Configura la conexion a la base de datos PostgreSQL en el archivo `application.properties`.
3. Ejecuta la aplicacion.

# Frontend

1. Abre una terminal en el directorio del frontend.
2. Ejecuta el proyecto:

```bash
ng serve
```

Accede a la aplicacion en `http://localhost:4200`.

---

# Notas

- Asegurate de que tanto el backend como el frontend usen el mismo puerto/baseURL para comunicarse.

Para iniciar el proyecto se ejecuta el Backend con Java una ejecuta se pone los datos de la base de datos para su conexion.


