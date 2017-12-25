import config from '../config';

export default {
  init: app => {
    app.use((req, res, next) => {
      if (req.get(config.auth.key) !== config.auth.val) {
        res.status(401).send('Authentication header is missing');
      } else {
        next();
      }
    });
  }
};
