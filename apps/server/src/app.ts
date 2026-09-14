import express from 'express';
import docsRouter from './shared/routes/docs.route.js';

function createApp() {
  const app = express();

  app.use(express.json());

  app.use('/api-docs', docsRouter);

  /**
   * @openapi
   * /health:
   *   get:
   *     tags:
   *       - Health
   *     summary: Health check
   *     description: Checks whether the API server is running.
   *     responses:
   *       200:
   *         description: Server is healthy
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               required:
   *                 - message
   *               properties:
   *                 message:
   *                   type: string
   *                   example: healthy route
   */
  app.get('/api/health', (req, res) => {
    res.json({
      message: 'healthy route',
    });
  });
  app.get('/', (req, res) => {
    res.json({
      message: 'backend is running',
    });
  });

  return app;
}

export default createApp;
