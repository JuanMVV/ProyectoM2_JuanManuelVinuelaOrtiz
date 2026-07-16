# 📝 Mini Blog API

> API RESTful para gestionar autores y publicaciones (posts), construida con Node.js, Express y PostgreSQL, siguiendo una arquitectura por capas y lista para desplegar en Railway.

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Railway](https://img.shields.io/badge/Deployed_on-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app)
[![Swagger](https://img.shields.io/badge/Docs-Swagger_UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](#-documentación-interactiva-swagger)

---

## 🌐 Demo / Swagger Online

Documentación interactiva (OpenAPI + Swagger UI) desplegada en Railway:

👉 **Swagger UI**:  
`https://proyectom2juanmanuelvinuelaortiz-production.up.railway.app/api-docs/`

---

## 📦 Requisitos previos

- Node.js y npm instalados.
- PostgreSQL accesible (local o remoto).
- Las dependencias del proyecto están declaradas en `package.json`, por lo que basta con ejecutar `npm install`.

---

## ⚙️ Puesta en marcha en local

1. **Clonar el repositorio**

```bash
git clone <repo-url>
cd <nombre-del-proyecto>
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Crear la base de datos**

Configura una base en PostgreSQL y ejecuta el archivo de semillas:

```bash
# Ajusta usuario, host, puerto y base según tu entorno
psql -U <usuario> -d <base_de_datos> -f seed.sql
```

> 💡 Se recomienda usar PostgreSQL por compatibilidad con el proyecto.

4. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`:

```bash
cp .env.example .env
# Edita los valores según tu entorno (DB, PORT, etc.)
```

5. **Levantar la aplicación en modo desarrollo**

```bash
npm run dev
```

6. **Ejecutar la suite de tests**

```bash
npm test
```

---

## 🚀 Uso básico de la API

Con el servidor corriendo en local, la URL base es:

```text
http://localhost:3000
```

Algunos endpoints principales:

- **Listar autores**

  `GET http://localhost:3000/authors`

- **Listar posts**

  `GET http://localhost:3000/posts`

- **Documentación Swagger (local)**

  Abre en el navegador:

  ```text
  http://localhost:3000/api-docs
  ```

> Puedes probar los endpoints con Thunder Client, Insomnia, Postman o directamente desde el Swagger UI del proyecto.

---

## 🧩 Arquitectura y estructura del proyecto

El proyecto está dividido en capas para facilitar mantenimiento y escalabilidad:

- `index.js`  
  Punto de entrada que inicia el servidor y carga la configuración principal.

- `src/server.js`  
  Configura Express, middlewares globales y registra el enrutador principal.

- `src/routes/index.js`  
  Define las rutas públicas del API (por ejemplo, `/authors`, `/posts`, etc.) y las asocia con sus controladores.

- `src/controllers/*`  
  Controladores que reciben la petición HTTP, validan algunos datos y delegan la lógica a los servicios.

- `src/services/*`  
  Contienen la lógica de negocio y coordinan el acceso a datos.

- `src/config/dbConnect.js` y `src/config/initDb.js`  
  Configuración de la conexión a la base de datos.

- `seed.sql`  
  Script SQL con el esquema (tablas, Store procedur y funciones) y los datos iniciales de la base.

- `src/middleware/*`  
  Middlewares específicos para validaciones, manejo de errores y lógica auxiliar para las distintas operaciones.

- `test/`  
  Pruebas automatizadas (Vitest) para controladores, middlewares y comportamiento de la API.

---

## 📘 Documentación interactiva (Swagger)

La API está documentada mediante OpenAPI 3.0 y expuesta con Swagger UI.

- En local:

  ```text
  http://localhost:3000/api-docs
  ```

- En producción (Railway):

  ```text
  https://proyectom2juanmanuelvinuelaortiz-production.up.railway.app/api-docs
  ```

Desde esa interfaz podés:

- Explorar todos los endpoints.
- Ver los schemas de entrada y salida.
- Probar llamadas en vivo sin salir del navegador.

---

## ☁️ Guía rápida de deploy en Railway

### 1. Estructura mínima recomendada

```text
mi-api/
├── src/
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

> El `.env` real **no** debe subirse al repositorio.

### 2. Publicar el proyecto en GitHub

```bash
git init
git add .
git commit -m "Primer commit - API lista para deploy"
git branch -M main
git remote add origin https://github.com/tu-usuario/mi-api.git
git push -u origin main
```

### 3. Crear cuenta y proyecto en Railway

1. Entra en [https://railway.app](https://railway.app).
2. Regístrate (idealmente con GitHub).
3. En el dashboard, clic en **“New Project”** → **“Deploy from GitHub repo”**.
4. Autoriza el acceso a tus repos (primera vez), recomendado solo autorizar para el repositorio a publicar.
5. Selecciona el repositorio de tu API.

Railway detectará el proyecto Node.js y disparará el proceso de build automáticamente.

### 4. Variables de entorno en Railway

En la sección de variables de tu servicio:

- Agrega valores como:

  ```text
  DATABASE_URL=postgresql://usuario:pass@host:puerto/base
  NODE_ENV=production
  ```

### 5. Base de datos en Railway

Si necesitás que Railway gestione la base:

1. Dentro del proyecto, clic en **“New”** → **“Database”**.
2. Elige PostgreSQL (u otro motor compatible).
3. Usa la variable `DATABASE_URL` generada por Railway en tu configuración del servidor.

### 6. Revisar build y logs

En la pestaña **“Deployments”** verificá:

- Instalación de dependencias (`npm install`).
- Comando de inicio configurado (por ejemplo, `npm start` o script de producción).

Usa los logs en tiempo real para depurar errores de arranque.

### 7. Dominio público

En **“Settings” → “Networking”**:

- Genera un dominio público como:

  ```text
  https://mi-api-production.up.railway.app
  ```

Probá tu API visitando esa URL o usando clientes HTTP.

### 8. Deploy continuos

Por defecto, cada `git push` a la rama `main` dispara un nuevo despliegue.  
Podés modificar este comportamiento en **Settings → Deploy Triggers** para usar despliegues manuales o ramas alternativas.


## 🧪 Testing

- Las pruebas están implementadas con **Vitest**.
- Se cubren principalmente:
  - Comportamiento de controladores.
  - Validaciones de middlewares.
  - Respuestas de la API ante entradas válidas e inválidas.

Ejecutar:

```bash
npm test
```

---

## 📄 Licencia

Este proyecto se distribuye con fines educativos y de práctica.  
Podés adaptarlo libremente para tus propios proyectos o ejercicios (según la licencia que definas en el repositorio).
