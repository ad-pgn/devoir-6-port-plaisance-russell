/**
 * @fileoverview Configuration de Swagger pour la documentation de l'API
 * @module config/swagger
 */

const swaggerJsdoc = require('swagger-jsdoc');

/**
 * Options de configuration Swagger
 */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Port de Plaisance Russell',
      version: '1.0.0',
      description: 'API REST pour la gestion des réservations de catways du Port de Plaisance Russell'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;