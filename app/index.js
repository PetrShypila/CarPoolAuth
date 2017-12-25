import express from 'express';
import bodyParser from 'body-parser';

import {UserActions} from "./actions";
import auth from './auth';
import swagger from './swagger';


const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

swagger.init(app);
auth.init(app);

/**
 * @swagger
 * resourcePath: /
 * description: All about API
 */

/**
 * @swagger
 * path: /login
 * operations:
 *   -  httpMethod: POST
 *      summary: Login with username and password
 *      notes: Returns a user based on username
 *      nickname: login
 *      consumes:
 *        - application/x-www-form-urlencoded
 *      parameters:
 *        - name: username
 *          paramType: request body
 *          required: true
 *          dataType: string
 *        - name: password
 *          paramType: request body
 *          required: true
 *          dataType: string
 */
app.post('/login', UserActions.findByUsername);


/**
 * @swagger
 * path: /signup
 * operations:
 *   -  httpMethod: POST
 *      summary: New user registration endpoint
 *      nickname: signup
 *      consumes:
 *        - application/x-www-form-urlencoded
 *      parameters:
 *        - name: username
 *          paramType: request body
 *          required: true
 *          dataType: string
 *        - name: password
 *          paramType: request body
 *          required: true
 *          dataType: string
 *        - name: firstname
 *          paramType: request body
 *          required: true
 *          dataType: string
 *        - name: lastname
 *          paramType: request body
 *          required: true
 *          dataType: string
 *        - name: email
 *          paramType: request body
 *          required: true
 *          dataType: string
 *        - name: phone
 *          paramType: request body
 *          required: true
 *          dataType: number
 */
app.post('/signup', UserActions.saveUser);

export default app;
