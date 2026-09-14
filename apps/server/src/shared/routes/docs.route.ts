import { Router } from 'express';
import { apiReference } from '@scalar/express-api-reference';

import swaggerSpec from '../config/swagger.config.js';

const docsRouter = Router();

docsRouter.use(
  '/',
  apiReference({
    spec: {
      content: swaggerSpec,
    },

    theme: 'kepler',
    layout: 'modern',
    hideModels: true,
    showDeveloperTools: 'never',
  }),
);

export default docsRouter;