const swaggerUi = require('swagger-ui-express')

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'API de Autores y Posts',
    version: '1.0.0',
    description: 'Documentación simple de la API para gestionar autores y posts.',
  },
  servers: [
    {
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://proyectom2juanmanuelvinuelaortiz-production.up.railway.app'
          : 'http://localhost:3000',
    },
  ],
  tags: [
    { name: 'Bienvenida', description: 'Mensaje de bienvenida' },
    { name: 'Autores', description: 'Operaciones CRUD para autores' },
    { name: 'Posts', description: 'Operaciones CRUD para posts' },
  ],
  paths: {
    '/': {
      get: {
        tags: ['Bienvenida'],
        summary: 'Verificar servidor activo',
        responses: {
          '200': {
            description: 'Servidor funcionando',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'number' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/authors': {
      get: {
        tags: ['Autores'],
        summary: 'Obtener todos los autores',
        responses: {
          '200': {
            description: 'Lista de autores',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Author' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Autores'],
        summary: 'Crear un nuevo autor',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthorInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Autor creado satisfactoriamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'number' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
        },
      },
    },
    '/authors/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'ID del autor',
        },
      ],
      get: {
        tags: ['Autores'],
        summary: 'Obtener un autor por ID',
        responses: {
          '200': {
            description: 'Autor encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Author' },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Autores'],
        summary: 'Actualizar un autor existente',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthorInput' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Autor actualizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Author' },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
        },
      },
      delete: {
        tags: ['Autores'],
        summary: 'Eliminar un autor',
        responses: {
          '200': {
            description: 'Autor eliminado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'number' },
                    message: { type: 'string' },
                    data: { type: 'null' },
                  },
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/posts': {
      get: {
        tags: ['Posts'],
        summary: 'Obtener todos los posts',
        responses: {
          '200': {
            description: 'Lista de posts',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Post' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Posts'],
        summary: 'Crear un post nuevo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              // Crear post: requiere author_id, title, content
              schema: { $ref: '#/components/schemas/PostInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Post creado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Post' },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
        },
      },
    },
    '/posts/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'ID del post',
        },
      ],
      get: {
        tags: ['Posts'],
        summary: 'Obtener un post por ID',
        responses: {
          '200': {
            description: 'Post encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Post' },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Posts'],
        summary: 'Actualizar un post existente',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              // Actualizar post: sólo title, content, published
              schema: { $ref: '#/components/schemas/PostUpdateInput' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Post actualizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Post' },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      delete: {
        tags: ['Posts'],
        summary: 'Eliminar un post',
        responses: {
          '200': {
            description: 'Post eliminado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'number' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/posts/author/{authorId}': {
      parameters: [
        {
          name: 'authorId',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'ID del autor',
        },
      ],
      get: {
        tags: ['Posts'],
        summary: 'Obtener posts por autor',
        responses: {
          '200': {
            description: 'Posts del autor',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'number' },
                    message: { type: 'string' },
                    data: {
                      type: 'object',
                      properties: {
                        author: { $ref: '#/components/schemas/Author' },
                        posts: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Post' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
  },
  components: {
    schemas: {
      Author: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          email: { type: 'string' },
          bio: { type: 'string' },
        },
      },
      AuthorInput: {
        type: 'object',
        required: ['name', 'email', 'bio'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          bio: { type: 'string' },
        },
      },
      Post: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          author_id: { type: 'integer' },
          title: { type: 'string' },
          content: { type: 'string' },
          published: { type: 'boolean' },
        },
      },
      // Para CREAR un post
      PostInput: {
        type: 'object',
        required: ['author_id', 'title', 'content'],
        properties: {
          author_id: { type: 'integer' },
          title: { type: 'string' },
          content: { type: 'string' },
          published: { type: 'boolean' },
        },
      },
      // Para ACTUALIZAR un post
      PostUpdateInput: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
          published: { type: 'boolean' },
        },
      },
    },
    responses: {
      BadRequest: {
        description: 'Solicitud incorrecta',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'number' },
                message: { type: 'string' },
              },
            },
          },
        },
      },
      NotFound: {
        description: 'Recurso no encontrado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'number' },
                error: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
}


module.exports = {
  swaggerUi,
  swaggerSpec,
}