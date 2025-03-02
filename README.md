# Tribu

## Nombre de la Materia
Electiva II

## Nombre Equipo
Tribu

## Integrantes Del Equipo
Brayan Hincapie Monsalve

## Descripción
Este proyecto es una API REST clon de Tinder que incluyendo autenticación con JWT, validación de datos y protección de rutas. Está desarrollado con Node.js y Express.

## Tecnologías utilizadas
- Node.js
- Express
- bcryptjs (para encriptación de contraseñas)
- jsonwebtoken (para autenticación con JWT)
- express-validator (para validación de datos)

## Instalación y ejecución
1. Clonar el repositorio:
   ```sh
   git clone
    https://github.com/hincapieb17/ElectivaII_ClonTinder_Tribu.git
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Iniciar el servidor:
   ```sh
   npm run dev
   ```

## Endpoints principales
### Autenticación
- `POST /v1/login` - Iniciar sesión y obtener un token JWT.

### Usuarios (protegidos con autenticación)
- `GET /v1/users` - Obtener todos los usuarios.
- `GET /v1/user/:id` - Obtener un usuario por ID.
- `POST /v1/createUser` - Crear un nuevo usuario.
- `PUT /v1/updateUser/:id` - Actualizar usuario existente.
- `DELETE /v1/deleteUser/:id` - Eliminar un usuario.

## Uso en Postman
Para probar los endpoints en Postman:
1. Enviar una petición `POST /v1/login` con `email` y `password` en el cuerpo.
2. Copiar el token recibido y añadirlo en `Headers` como:
   ```sh
   Authorization: token 123
   ```

