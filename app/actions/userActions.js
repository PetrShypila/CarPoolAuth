import bcrypt from 'bcrypt';
import {User} from '../models';
import logger from '../logging';

export function findByUsername(req, res) {
  const {username, password} = req.body;

  logger.info(`Received request to login user ${username}`);

  User.findOne({username: username.toLowerCase()}).then(user => {
    if (user) { // No user with provided username
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          logger.error(`Error during password validation of user ${user.username}`);
          res.status(500).json({error: err.message});
        } else if (!isValid) {
          logger.info(`User ${username} provided incorrect password`);
          res.status(401).end();
        } else {
          logger.info(`User ${username} successfully logged in`);
          res.status(200).json(user);
        }
      });
    } else {
      res.status(404).end();
      logger.info(`User ${username} does not exist`);
    }
  }).catch(err => {
    logger.info(`Error appeared while processing user ${username}`);
    res.status(500).json({error: err.message});
  });
}

function createHash(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

export function saveUser(req, res) {
  const {username, password} = req.body;

  User.findOne({username: username.toLowerCase()}).then(user => {
    if (!user) { // No user with provided username
      req.body.password = createHash(password);
      let newUser = new User(req.body);

      newUser.save(err => {
        if (err) {
          res.status(500).json({message: 'Error saving user to database'});
        } else {
          res.status(201).json(user);
        }
      });

    } else {
      res.status(409).json({message: 'User with given name already exist'});
    }
  }).catch(err => {
    res.status(500).json(err);
  });
}
