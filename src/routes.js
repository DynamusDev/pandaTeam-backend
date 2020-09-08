const express = require('express');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const EventController = require('./controllers/EventController');

const routes = express.Router();


routes.post('/login', SessionController.create); //Criar Sessão(LOGIN)
routes.post('/forgot_password', SessionController.forgotPassword) // Esqueci minha Senha

routes.post('/sign_up', UserController.create); // Criar usuário
routes.put('/users/:id', UserController.edit) // editar
routes.put('/updateImage/:id', UserController.editImage) // editar
routes.get('/users', UserController.index);  // Listar Usuários
routes.get('/users/:id', UserController.especific); // Fazer requisição de usuário específico

routes.post('/event', EventController.create); // Criar evento
routes.put('/event/:id', EventController.edit) // editar evento
routes.get('/event', EventController.index);  // Listar eventos
routes.get('/event/:id', EventController.especific); // Fazer requisição de evento específico

module.exports = routes;