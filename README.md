# 🚀 MiniBlog API

## 📌 Tabla De Contenidos

- [Descripcion](#-descripcion)
- [URL Base](#-url-base)
- [Tecnologias](#-tecnologias)
- [Organizacion Del Proyecto](#-organizacion-del-proyecto)
- [Endpoints](#-endpoints)
- [Ejemplos De Uso](#-ejemplos-de-uso)
- [Documentacion Completa](#-documentacion-completa)
- [Ejecutar Localmente](#-ejecutar-localmente)
- [Deployment En Railway Desde Cero](#-deployment-en-railway-desde-cero)
- [Tests](#-tests)
- [Notas](#-notas)

## 📖 Descripcion

API REST para gestionar autores y posts de un blog. Permite operaciones CRUD completas sobre autores y publicaciones, usando una relacion donde un autor puede tener muchos posts.

Proyecto construido con Node.js, Express, PostgreSQL y `pg`. Desplegado en Railway.

## 🌐 URL Base

[https://proyectom2matiasgaitan-production.up.railway.app/authors](https://proyectom2matiasgaitan-production.up.railway.app/authors)

Las rutas principales son `/authors` , `/posts` y `/comments`.

## 🛠️ Tecnologias

- **Backend:** Node.js con Express
- **Base de datos:** PostgreSQL
- **Cliente DB:** pg
- **Documentacion:** OpenAPI con Swagger UI
- **Testing:** Vitest y Supertest
- **Deployment:** Railway

## 📁 Organizacion Del Proyecto

El proyecto esta organizado separando responsabilidades para mantener el codigo simple, legible y facil de probar.

```txt
📦 Proyecto Final
├── 📄 index.js
├── 📄 openapi.yaml
├── 📄 README.md
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 vitest.config.js
├── 📄 .env.example
├── 📄 .gitignore
├── 📁 src
│   ├── 📄 app.js
│   ├── 📁 Controllers
│   │   ├── 📄 controllerAuthors.js
│   │   ├── 📄 controllerPost.js
│   │   └── 📄 controllerComments.js
│   ├── 📁 Routers
│   │   ├── 📄 routersAuthors.js
│   │   ├── 📄 routersPosts.js
│   │   └── 📄 routersComments.js
│   ├── 📁 Services
│   │   ├── 📄 serviceAuthors.js
│   │   ├── 📄 servicePosts.js
│   │   └── 📄 serviceComments.js
│   ├── 📁 Middlewares
│   │   ├── 📄 errorHandlers.js
│   │   └── 📄 validateParams.js
│   ├── 📁 Utils
│   │   ├── 📄 createErrors.js
│   │   └── 📄 validations.js
│   └── 📁 db
│       ├── 📄 config.js
│       ├── 📄 setup.sql
│       └── 📄 seed.sql
├── 📁 tests
│   ├── 📄 authors.test.js
│   ├── 📄 posts.test.js
│   ├── 📄 comments.test.js
│   └── 📄 validations.test.js
└── 📁 screenshots
    └── 🖼️ capturas para el README
```


## 📚 Endpoints

### 👤 Authors

- `GET /authors` - Obtener todos los autores
- `GET /authors/:id` - Obtener un autor especifico
- `POST /authors` - Crear un nuevo autor
- `PUT /authors/:id` - Actualizar un autor existente
- `DELETE /authors/:id` - Eliminar un autor

### 📝 Posts

- `GET /posts` - Obtener todos los posts
- `GET /posts/:id` - Obtener un post especifico
- `GET /posts/author/:author_id` - Obtener posts de un autor con detalle del autor
- `POST /posts` - Crear un nuevo post
- `PUT /posts/:id` - Actualizar un post existente
- `DELETE /posts/:id` - Eliminar un post

### 💬 Comments

- `GET /comments` - Obtener todos los comentarios
- `GET /comments/:id` - Obtener un comentario especifico
- `POST /comments` - Crear un nuevo comentario
- `PUT /comments/:id` - Actualizar un comentario existente
- `DELETE /comments/:id` - Eliminar un comentario

## 🧪 Ejemplos De Uso

### 📋 Obtener todos los autores

```bash
curl https://proyectom2matiasgaitan-production.up.railway.app/authors
```

**Respuesta ejemplo:**

![Respuesta GET authors](./screenshots/get_authors.png)

### 🔎 Obtener un autor por ID

```bash
curl https://proyectom2matiasgaitan-production.up.railway.app/authors/1
```

**Respuesta ejemplo:**

![Respuesta GET authors/id](./screenshots/get_authors_id.png)

### ➕ Crear un autor

```bash
curl -X POST https://proyectom2matiasgaitan-production.up.railway.app/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Nuevo",
    "email": "nuevo@example.com",
    "bio": "Creado para ejemplo"
  }'
```

**Respuesta ejemplo:**

![Respuesta POST authors](./screenshots/post_authors.png)

### ✏️ Actualizar un autor

```bash
curl -X PUT https://proyectom2matiasgaitan-production.up.railway.app/authors/4 \
  -H "Content-Type: application/json" \
  -d '{
    "name" : "Usuario Actualizado"
  }'
```

**Respuesta ejemplo:**

![Respuesta PUT authors](./screenshots/put_authors.png)

### 🗑️ Eliminar un autor

```bash
curl -X DELETE https://proyectom2matiasgaitan-production.up.railway.app/authors/4
```

**Respuesta:** `204 No Content`

### 📋 Obtener todos los posts

```bash
curl https://proyectom2matiasgaitan-production.up.railway.app/posts
```

**Respuesta ejemplo:**

![Respuesta GET posts](./screenshots/get_posts.png)

### ➕ Crear un post

```bash
curl -X POST https://proyectom2matiasgaitan-production.up.railway.app/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Post de ejemplo",
    "content": "Contenido de ejemplo para el post ejemplo",
    "author_id": 1,
    "published": true
  }'
```

**Respuesta ejemplo:**


![Respuesta POST posts](./screenshots/post_posts.png)

### 🔗 Obtener posts de un autor

```bash
curl https://proyectom2matiasgaitan-production.up.railway.app/posts/author/1
```

**Respuesta ejemplo:**

![Respuesta GET posts/author/author_id](./screenshots/get_posts_author.png)

### 💬 Obtener todos los comentarios

```bash
curl https://proyectom2matiasgaitan-production.up.railway.app/comments
```

**Respuesta ejemplo:**

![Respuesta GET comments](./screenshots/get_comments.png)

### ➕ Crear un comentario

```bash
curl -X POST https://proyectom2matiasgaitan-production.up.railway.app/comments \
  -H "Content-Type: application/json" \
  -d '{
    "comment_content": "Comentario de ejemplo para el post",
    "author_id": 1,
    "post_id": 1
  }'
```

**Respuesta ejemplo:**

![Respuesta POST comments](./screenshots/post_comments.png)

### ✏️ Actualizar un comentario

```bash
curl -X PUT https://proyectom2matiasgaitan-production.up.railway.app/comments/6 \
  -H "Content-Type: application/json" \
  -d '{
    "comment_content": "Comentario actualizado"
  }'
```

**Respuesta ejemplo:**

![Respuesta PUT comments](./screenshots/put_comments.png)

### 🗑️ Eliminar un comentario

```bash
curl -X DELETE https://proyectom2matiasgaitan-production.up.railway.app/comments/6
```

**Respuesta:** `204 No Content`


## 📘 Documentacion Completa

La documentacion interactiva de la API esta disponible en:

[https://proyectom2matiasgaitan-production.up.railway.app/api-docs](https://proyectom2matiasgaitan-production.up.railway.app/api-docs)

Desde Swagger UI se puede:

- Ver todos los endpoints disponibles
- Revisar parametros, request body y respuestas
- Probar endpoints desde el navegador
- Consultar los schemas de autores, posts, comments y errores

![Swagger UI 1](./screenshots/swagger_docs.png)
![Swagger UI 2](./screenshots/swagger_docs_schemas.png)

## 💻 Ejecutar Localmente

### ✅ Prerrequisitos

- Node.js 20 o superior
- PostgreSQL instalado o una base PostgreSQL disponible
- npm instalado

### 🧭 Pasos

#### 1. Clonar el repositorio

```bash
git clone https://github.com/MatiasAGaitan/ProyectoM2_MatiasGaitan.git
cd ProyectoM2_MatiasGaitan
```

#### 2. Instalar dependencias

```bash
npm install
```

#### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog
DB_USER=postgres
DB_PASSWORD=tu_password
PORT=3000
```

#### 4. Configurar la base de datos

Entrar a PostgreSQL:

```bash
psql -U postgres
```

Dentro de PostgreSQL:

```sql
CREATE DATABASE miniblog;
\c miniblog
```

Luego ejecutar las tablas:

```bash
psql -U postgres -d miniblog -f src/db/setup.sql
```

Opcionalmente, cargar datos iniciales:

```bash
psql -U postgres -d miniblog -f src/db/seed.sql
```

#### 5. Iniciar el servidor en desarrollo

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:3000
```

La documentación Swagger estará disponible en:

```text
http://localhost:3000/api-docs
```

---

## 🚂 Deployment en Railway

Guia para desplegar la API en Railway usando PostgreSQL.

### 🗄️ 1. Crear la base de datos PostgreSQL en Railway

1. Entrar a Railway.
2. Crear un nuevo proyecto.
3. Agregar un servicio de PostgreSQL.
4. Entrar al servicio PostgreSQL.
5. Copiar la `DATABASE_URL` para usarla en el backend desplegado.
6. Copiar los datos de conexión pública si se quiere conectar desde la computadora local:

   - Host
   - Port
   - Database
   - User
   - Password

### 🔌 2. Conectar la base de datos de Railway con el proyecto local

Para correr la API desde la computadora local usando la base de datos de Railway, usar los datos de conexión pública del servicio PostgreSQL.

Crear un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=HOST_PUBLICO_DE_RAILWAY
DB_PORT=PUERTO_PUBLICO_DE_RAILWAY
DB_NAME=NOMBRE_DE_LA_BASE
DB_USER=USUARIO_DE_POSTGRES
DB_PASSWORD=PASSWORD_DE_POSTGRES
PORT=3000
```

Ejemplo:

```env
DB_HOST=reseau.proxy.rlwy.net
DB_PORT=11764
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=tu_password_de_railway
PORT=3000
```

> ⚠️ Atención: no usar `postgres.railway.internal` para correr la app desde la computadora local. Esa URL solo funciona dentro de Railway.

### 🧱 3. Configurar la base de datos

Crear las tablas ejecutando:

```bash
psql -h HOST_PUBLICO_DE_RAILWAY -p PUERTO_PUBLICO_DE_RAILWAY -U USUARIO_DE_POSTGRES -d NOMBRE_DE_LA_BASE -f src/db/setup.sql
```

Opcionalmente, cargar datos iniciales:

```bash
psql -h HOST_PUBLICO_DE_RAILWAY -p PUERTO_PUBLICO_DE_RAILWAY -U USUARIO_DE_POSTGRES -d NOMBRE_DE_LA_BASE -f src/db/seed.sql
```

### 📤 4. Subir el proyecto a GitHub

1. Crear un repositorio en GitHub.
2. Subir el proyecto completo.
3. Verificar que `.env` no se suba al repositorio.
4. Verificar que `node_modules` no se suba al repositorio.

### 🖥️ 5. Crear el servicio backend en Railway

1. Entrar al proyecto de Railway.
2. Agregar un nuevo servicio desde GitHub.
3. Seleccionar el repositorio del proyecto.
4. Esperar a que Railway detecte la app Node.js.
5. Verificar que el script de inicio sea:

```json
"start": "node index.js"
```

### 🔐 6. Configurar variables de entorno en Railway

En el servicio backend de Railway, agregar las variables necesarias para producción.

Si el proyecto usa `DATABASE_URL`, agregar:

```env
NODE_ENV=production
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Si el proyecto usa variables separadas, agregar:

```env
NODE_ENV=production
DB_HOST=HOST_DE_RAILWAY
DB_PORT=PORT_DE_RAILWAY
DB_NAME=NOMBRE_DE_LA_BASE
DB_USER=USUARIO_DE_POSTGRES
DB_PASSWORD=PASSWORD_DE_POSTGRES
PORT=3000
```

> ⚠️ Atención: usar la URL o los datos de conexión generados por Railway.

### 🌐 7. Internal URL y Public URL

Railway puede mostrar dos tipos de URL relacionadas al proyecto.

#### Internal URL

La internal URL puede verse parecida a:

```text
postgres.railway.internal
```

Esta URL es interna de Railway. Sirve para que el backend desplegado en Railway se conecte con PostgreSQL dentro de Railway.

> ⚠️ Atención: esta URL no funciona desde la computadora local.

#### Public URL

La public URL es la URL que se usa para acceder a la API desde el navegador, Postman, Swagger o curl.

Ejemplo:

```text
https://proyectom2matiasgaitan-production.up.railway.app
```

Ejemplo con curl:

```bash
curl https://proyectom2matiasgaitan-production.up.railway.app/authors
```

### 🚀 8. Ejecutar el deploy

1. Ir al servicio backend en Railway.
2. Ejecutar el deploy.
3. Esperar a que el build termine correctamente.
4. Abrir la public URL generada por Railway.

### ✅ 9. Probar el deploy

Probar los endpoints principales:

```text
https://proyectom2matiasgaitan-production.up.railway.app/authors
https://proyectom2matiasgaitan-production.up.railway.app/posts
https://proyectom2matiasgaitan-production.up.railway.app/comments
https://proyectom2matiasgaitan-production.up.railway.app/api-docs
```

En Swagger, seleccionar la URL correcta según dónde se esté probando:

```text
http://localhost:3000
https://proyectom2matiasgaitan-production.up.railway.app
```

Usar `localhost` para pruebas locales y la URL pública de Railway para probar el deploy.

## 🧪 Tests

Para ejecutar los tests:

```bash
npm test
```

Para ejecutar coverage:

```bash
npm run test:coverage
```

## 📝 Notas

- El archivo `.env.example` sirve como referencia para las variables necesarias.
- Si se elimina un autor, sus posts asociados se eliminan por la relacion con `ON DELETE CASCADE`.
- Los comentarios estan asociados a un autor y a un post mediante `author_id` y `post_id`.
- Si se elimina un autor o un post, sus comentarios asociados se eliminan por la relacion con `ON DELETE CASCADE`.
