const express = require('express');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const EventController = require('./controllers/EventController');
const CashController = require('./controllers/CashController');

const routes = express.Router();


routes.post('/login', SessionController.create); //Criar Sessão(LOGIN)
routes.post('/forgot_password', SessionController.forgotPassword) // Esqueci minha Senha

routes.post('/sign_up', UserController.create); // Criar usuário
routes.post('/contact_us', UserController.send); // Contact Us
routes.put('/users/:id', UserController.edit) // editar
routes.put('/updateImage/:id', UserController.editImage) // editar
routes.get('/users', UserController.index);  // Listar Usuários
routes.put('/usersEdit/:id', UserController.editAdmin) // editar
routes.get('/users/:id', UserController.especific); // Fazer requisição de usuário específico
routes.delete('/users/:id', UserController.delete); // Deletar Usuário

routes.post('/event', EventController.create); // Criar evento
routes.put('/event/:id', EventController.edit) // editar evento
routes.get('/event', EventController.index);  // Listar eventos
routes.get('/event/:id', EventController.especific); // Fazer requisição de evento específico

routes.get('/cash', CashController.index); // Buscar Valores em caixa
routes.post('/cash', CashController.post); // Adicionar valores no caixa
routes.get('/entry', CashController.getEntries); // Buscar lançamentos no caixa

module.exports = routes;