-- Crear tabla authors
CREATE TABLE IF NOT EXISTS authors (
id SERIAL PRIMARY KEY,
name VARCHAR(200) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
bio TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Crear tabla posts
CREATE TABLE IF NOT EXISTS posts (
id SERIAL PRIMARY KEY,
author_id INT NOT NULL REFERENCES authors(id) ON DELETE CASCADE ON UPDATE CASCADE,
title VARCHAR(300) NOT NULL,
content TEXT NOT NULL,
published BOOLEAN DEFAULT FALSE NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- crear tabla comentarios
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
  author_id INT NOT NULL REFERENCES authors(id) ON DELETE CASCADE ON UPDATE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);


INSERT INTO authors (name, email, bio) VALUES
('María García', 'maria.garcia@example.com', 'Autora especializada en tecnología y educación.'),
('Carlos Pérez', 'carlos.perez@example.com', 'Desarrollador full stack con interés en bases de datos.'),
('Lucía Fernández', 'lucia.fernandez@example.com', 'Escritora técnica y traductora.'),
('Diego Ramírez', 'diego.ramirez@example.com', 'Periodista y aficionado a la fotografía.'),
('Ana Torres', 'ana.torres@example.com', 'Investigadora en UX y accesibilidad.') ON CONFLICT (email) DO NOTHING;


INSERT INTO posts (title, content, author_id, published)
SELECT 'Arquitectura de aplicaciones con .NET', 'En este artículo se explica cómo diseñar aplicaciones escalables con .NET, aplicando buenas prácticas de organización, separación de responsabilidades y mantenimiento a largo plazo.', 4, true
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE id = 1)
  AND EXISTS (SELECT 1 FROM authors WHERE id = 4);


INSERT INTO posts (title, content, author_id, published)
SELECT 'Comparativa entre PostgreSQL y SQLite', 'PostgreSQL y SQLite son dos motores muy usados, pero están orientados a escenarios distintos. Uno ofrece mayor robustez y concurrencia, mientras que el otro destaca por su simplicidad y portabilidad.', 5, true
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE id = 2)
  AND EXISTS (SELECT 1 FROM authors WHERE id = 5);


INSERT INTO posts (title, content, author_id, published)
SELECT 'Diseño de APIs modernas', 'Las APIs modernas deben ser claras, consistentes y fáciles de consumir. En este texto se repasan principios básicos para construir interfaces REST sólidas y mantenibles.', 4, true
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE id = 3)
  AND EXISTS (SELECT 1 FROM authors WHERE id = 4);


INSERT INTO posts (title, content, author_id, published)
SELECT 'Gestión de excepciones en aplicaciones web', 'Un buen manejo de errores mejora la estabilidad y la experiencia del usuario. Aquí se abordan estrategias para capturar, registrar y responder adecuadamente ante fallos inesperados.', 6, false
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE id = 4)
  AND EXISTS (SELECT 1 FROM authors WHERE id = 6);


INSERT INTO posts (title, content, author_id, published)
SELECT 'Patrones asincrónicos en JavaScript', 'El código asincrónico puede simplificarse mucho con herramientas modernas como async y await. Este enfoque permite escribir flujos más legibles sin perder el control sobre las operaciones no bloqueantes.', 4, false
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE id = 5)
  AND EXISTS (SELECT 1 FROM authors WHERE id = 4);


INSERT INTO comments (post_id, author_id, content)
SELECT 2, 3, 'Muy buen contenido, explicado de manera clara y con ejemplos útiles para entender mejor el tema.'
WHERE NOT EXISTS (SELECT 1 FROM comments WHERE id = 1);


------------------------- SP para nuevo autor --------------------------------
CREATE OR REPLACE PROCEDURE sp_new_author(
  IN p_name VARCHAR(200),
  IN p_email VARCHAR(255),
  IN p_bio TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO authors (name, email, bio)
  VALUES (p_name, p_email, p_bio);
END;
$$;
----------------------------------------------------------------------------------------------------------------


 ---------------------------------- Funcion para Update AUTHOR ------------------ ------------------
CREATE OR REPLACE FUNCTION fn_update_author(
  p_id INT,
  p_name VARCHAR(200),
  p_email VARCHAR(255),
  p_bio TEXT
)
RETURNS TABLE (
  id INT,
  name VARCHAR(200),
  email VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  UPDATE authors
  SET
    name = p_name,
    email = p_email,
    bio = p_bio
  WHERE authors.id = p_id
  RETURNING authors.id, authors.name, authors.email, authors.bio, authors.created_at;
END;
$$;
-- ---------------- ---------------------------------



--  ------------------ ------------------ Funcion para crar un POST ------------------ ------------------
CREATE OR REPLACE FUNCTION fn_create_post(
  p_author_id INT,
  p_title VARCHAR(300),
  p_content TEXT,
  p_published BOOLEAN DEFAULT FALSE
)
RETURNS TABLE (
  post_id INT,
  author_id INT,
  title VARCHAR(300),
  content TEXT,
  published BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM authors a
    WHERE a.id = p_author_id
  ) THEN
    RAISE EXCEPTION 'Author with id % does not exist', p_author_id;
  END IF;

  RETURN QUERY
  INSERT INTO posts (author_id, title, content, published)
  VALUES (p_author_id, p_title, p_content, p_published)
  RETURNING
    posts.id,
    posts.author_id,
    posts.title,
    posts.content,
    posts.published,
    posts.created_at;
END;
$$;

--  ------------------ ------------------ ------------------ ------------------



-------------------- ------------------ Funcion UPDATE POST ------------------ ------------------ ------------------
CREATE OR REPLACE FUNCTION fn_update_post(
  p_id INTEGER,
  p_title TEXT,
  p_content TEXT,
  p_published BOOLEAN
)
RETURNS SETOF posts
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  UPDATE posts
  SET
    title = p_title,
    content = p_content,
    published = p_published
  WHERE id = p_id
  RETURNING *;
END;
$$;

-- ------------------ ------------------ Funcion Get Authos-post  ------------------ ------------------ ------------------
CREATE OR REPLACE FUNCTION fn_get_author_posts(p_author_id INT)
RETURNS TABLE (
    author_id        INT,
    author_name      VARCHAR(200),
    author_email     VARCHAR(255),
    author_bio       TEXT,
    author_created_at TIMESTAMP WITH TIME ZONE,
    post_id          INT,
    post_title       VARCHAR(300),
    post_content     TEXT,
    post_published   BOOLEAN,
    post_created_at  TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
AS $$
    SELECT
        a.id,
        a.name,
        a.email,
        a.bio,
        a.created_at,
        p.id,
        p.title,
        p.content,
        p.published,
        p.created_at
    FROM authors a
    INNER JOIN posts p
        ON p.author_id = a.id
    WHERE a.id = p_author_id
    ORDER BY p.created_at DESC;
$$;


