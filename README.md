# HelpDesk Lite

Sistema de gestion de tickets de soporte tecnico, desarrollado como practica academica de Aplicaciones de Internet.

## Descripcion

HelpDesk Lite permite registrar, dar seguimiento y resolver tickets de soporte tecnico dentro de una organizacion. Cada ticket cuenta con un folio unico generado automaticamente, y pasa por un flujo de estados controlado desde su creacion hasta su cierre.

## Funcionalidades

- Creacion de tickets con folio automatico (formato HD-0001, HD-0002, etc.)
- Categorizacion por tipo (Hardware, Software, Red, Accesos, Correo, Otro) y prioridad (Baja, Media, Alta, Critica)
- Dashboard con conteo dinamico de tickets por estado
- Busqueda en tiempo real por folio, titulo o descripcion
- Filtros combinados por estado y prioridad
- Flujo de estados controlado: Nuevo -> En proceso -> Resuelto -> Cerrado, con Cancelado como salida en cualquier punto antes de Cerrado
- Persistencia de datos en el navegador mediante localStorage
- Diseno responsive para escritorio y movil

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)

## Como ejecutarlo

No requiere instalacion ni dependencias. Basta con abrir el archivo `index.html` directamente en cualquier navegador moderno.

## Flujo de trabajo

El proyecto se desarrollo siguiendo GitFlow, con ramas `feature/*` para cada bloque funcional, integradas a `develop`, y una rama `release/1.0.0` fusionada finalmente a `main` con el tag `v1.0.0`.

## Autor

Proyecto academico - Aplicaciones de Internet