import bcrypt from 'bcrypt';
import {User} from '../models';

export function findByUsername(req, res) {
  const {username} = req.body;
  const {password} = req.body;

  User.findOne({username: username.toLowerCase()}).then(user => {
    if (!user) { // No user with provided username
      res.status(404).end();
    } else {
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          res.status(500).json(err);
        }

        if (!isValid) {
          res.status(401).end();
        }

        res.status(200).json(user);
      });
    }
  }).catch(err => {
    res.status(500).json(err);
  });
}

function createHash(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

export function saveUser(req, res) {
  const {username} = req.body;
  User.findOne({username: username.toLowerCase()}).then(user => {
    if (!user) { // No user with provided username
      req.body.password = createHash(req.body.password);
      let newUser = new User(req.body);

      newUser.save(err => {
        if (err) {
          res.status(500).send('Error saving user to database');
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
