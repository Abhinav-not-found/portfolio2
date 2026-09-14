import swaggerJsdoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.1.0',

    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'API for the portfolio and content management platform.',
    },

    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },

  apis: ['./src/**/*.ts'],
});

export default swaggerSpec;