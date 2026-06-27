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
- [Tests](#-tests)
- [Notas](#-notas)

## 📖 Descripcion

API REST para gestionar autores y posts de un blog. Permite operaciones CRUD completas sobre autores y publicaciones, usando una relacion donde un autor puede tener muchos posts.

Proyecto construido con Node.js, Express, PostgreSQL y `pg`. Desplegado en Railway.

## 🌐 URL Base

[https://proyectom2matiasgaitan-production.up.railway.app](https://proyectom2matiasgaitan-production.up.railway.app)

Las rutas principales son `/authors` y `/posts`.

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
│   │   └── 📄 controllerPost.js
│   ├── 📁 Routers
│   │   ├── 📄 routersAuthors.js
│   │   └── 📄 routersPosts.js
│   ├── 📁 Services
│   │   ├── 📄 serviceAuthors.js
│   │   └── 📄 servicePosts.js
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

## 📘 Documentacion Completa

La documentacion interactiva de la API esta disponible en:

[https://proyectom2matiasgaitan-production.up.railway.app/api-docs](https://proyectom2matiasgaitan-production.up.railway.app/api-docs)

Desde Swagger UI se puede:

- Ver todos los endpoints disponibles
- Revisar parametros, request body y respuestas
- Probar endpoints desde el navegador
- Consultar los schemas de autores, posts y errores

![Swagger UI](./screenshots/swagger_docs.png)

## 💻 Ejecutar Localmente

### ✅ Prerrequisitos

- Node.js 20 o superior
- PostgreSQL instalado o una base PostgreSQL disponible

### 🧭 Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/MatiasAGaitan/ProyectoM2_MatiasGaitan.git
cd "Proyecto Final"
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

Crear un archivo `.env` en la raiz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog
DB_USER=postgres
DB_PASSWORD=tu_password
PORT=3000
```

4. Configurar la base de datos:

```bash
psql -U postgres
```

Dentro de PostgreSQL:

```sql
CREATE DATABASE miniblog;
\c miniblog
```

Luego ejecutar las tablas de `src/db/setup.sql` y, si se quieren datos iniciales, los inserts de `src/db/seed.sql`.

5. Iniciar el servidor en desarrollo:

```bash
npm run dev
```

La API estara disponible en:

```txt
http://localhost:3000
```

La documentacion local estara disponible en:

```txt
http://localhost:3000/api-docs
```

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
