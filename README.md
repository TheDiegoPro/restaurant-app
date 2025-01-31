
# Restaurant App - (Local Env)

Desarrollada con tecnologías Node.js, Express, JWT, React y MongoDB, esta aplicación está diseñada para ofrecer una experiencia rápida gracias a Vite en el frontend y Mongoose en el backend. 

 - Características Principales
 - Autenticación segura con JWT y cifrado de contraseñas con bcryptjs.
 - Búsqueda de restaurantes almacenados en una base de datos MongoDB.
 - Historial de búsqueda personalizado para cada usuario autenticado.
 - Interfaz con React y Ant Design.




## Tecnologías Utilizadas

- **Backend**: 
  - Node.js 
  - Express 
  - JWT
  - Mongoose 
  - CORS
  - bcryptjs
  - Nodemon

- **Frontend**: 
  - React
  - Ant Design
  - Axios
  - React Router
  - Vite
  - ESLint
  

## Requisitos

- Node.js (versión 14 o superior)
- MongoDB instalado y en ejecución en tu máquina local o en la nube
- Un editor de código como Visual Studio Code (opcional, pero recomendado)## 

## Instalación y Configuración (Base de Datos)

Crea una base de datos llamada "authentication" en tu instancia de MongoDB. Puedes hacerlo mediante MongoDB Compass, la línea de comandos o cualquier otra herramienta que utilices.

Dentro de la base de datos authentication, crea las siguientes colecciones:

- restaurants
- searchhistories
- users

Estas colecciones son utilizadas por el sistema para almacenar información relevante sobre los restaurantes, el historial de búsqueda y los usuarios. Dentro del repositorio, estan presentes 3 colecciones utilizadas para las pruebas, sientase libre de importarlas en las respectivas colecciones de la base de datos de MongoDB creada previamente.


## Instalación y Configuración (Frontend)

Clonar el Proyecto 

```bash
  git clone https://github.com/TheDiegoPro/restaurant-app.git
```

Ir al directorio del Proyecto

```bash
  cd frontend\app-test\
```

Instalar Dependencias

```bash
  npm install
```

Iniciar 

```bash
  npm run dev
```


## Instalación y Configuración (Backend)

Ir al directorio de Backend

```bash
  \test-app\backend
```

Instalar Dependencias

```bash
  npm install
```

Iniciar servidor backend

```bash
  nodemon index.js
```




## Referencias API

#### POST 

```http
  POST /api/auth/signup - Registro de un nuevo usuario.
  POST /api/auth/login - Iniciar sesión con un usuario existente.
  POST /api/searchhistory - Guardar un historial de búsqueda (requiere autenticación).
```


#### GET

```http
  GET /api/restaurants - Obtener la lista de restaurantes (requiere autenticación).
```



