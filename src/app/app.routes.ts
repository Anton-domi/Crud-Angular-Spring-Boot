import { Routes } from '@angular/router'; 
import { PrincipalComponent } from './principal/principal.component'; 
import { FormularioComponent } from './formulario/formulario.component'; 

// rutas de la aplicación
export const routes: Routes = [
    {
        path: '', // Pagina de inicio
        component: PrincipalComponent, 
        title: 'Pagina de Inicio'
    },
    {
        path: 'formulario/:id', // Formulario de un producto especifico
        component: FormularioComponent, 
        title: 'Formulario de Productos' 
    },
    {
        path: '**', // Captura todas las rutas no definidas
        redirectTo: '', // Redirige a la pagina de inicio
        pathMatch: 'full' // Asegura que la redireccion solo ocurra cuando no coincida con ninguna ruta
    }
];
