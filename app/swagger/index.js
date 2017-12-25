import path from 'path';
import swagger from 'swagger-express';

export default {
  init: app => {
    app.use(swagger.init(app, {
      apiVersion: '1.0',
      swaggerVersion: '1.0',
      swaggerURL: '/swagger',
      swaggerJSON: '/api-docs.json',
      swaggerUI: path.join( __dirname, '../public/swagger/'),
      basePath: 'http://localhost:4000',
      apis: [path.join( __dirname, '../index.js')],
      middleware: function(req, res){}
    }));
  }
};
