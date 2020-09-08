const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "naorespondapandateam@gmail.com",
    pass: "Amasi@198"
  }
});

module.exports = {

  async create(request, response) {
    const { name, email, admin } = request.body;

    try {
      const checkUser = await User.findOne({ where: { email: email } });
      if (checkUser) {
        return response.status(200).json({
          status: 400,
          error: 'Este email de usuário já existe na nossa base de dados, verifique o email e tente novamente.'
        })
      }
    } catch (err) {
      return response.status(500).json({
        status: 500,
        error: 'Connection error, user check DB'
      })
    }

    const password = crypto.randomBytes(6).toString('hex');

    const avatar = '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'


    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      console.error(err);
      const error = 'Could not create user, try again later.(hash error)';
      return next(error);
    }

    const data = {
      name,
      email,
      avatar,
      password: hashedPassword,
      admin
    }

    const user = await User.create(data)

    const emailASerEnviado = {
      from: 'naorespondapandateam@gmail.com',
      to: email,
      subject: 'Acesso - PandaTeam',
      text: `Olá!!! Bem vindo ao nosso App!!! Você foi cadastrado no nosso sistema e as credenciais de acesso se encontram logo abaixo.\n
Login: ${email}
Senha: ${password} \n
(fique atento com as letras minúsculas e maiúsculas)\n
Você ja pode logar na sua conta com sua senha e atualizar para uma senha mais conveniente através do painei "Meu Perfil".\n
Obrigado,
Panda Team`,
    };

    transport.sendMail(emailASerEnviado);

    return response.status(200).json({
      status: 200,
      message: 'O usuário ' + name + ' foi adicionado!!!'
    });

  },

  async index(request, response) {
    const { page = 1 } = request.query;

    const users = await User.findAll();

    return response.status(200).json({
      status: 200,
      message: 'successfuly',
      users
    });
  },

  async especific(request, response) {
    const { id } = request.params;
    const user = await User.findOne({ where: { id: id } });

    user.password = undefined

    return response.status(200).json({
      status: 200,
      message: 'successfuly',
      user
    });
  },

  async edit(request, response) {
    const { id } = request.params
    const { name, email, avatar, password } = request.body;

    const checkUser = await User.findOne({ where: { id: id } });

    if (!checkUser) {
      return response.status(400).json({
        status: 400,
        error: 'ID not found.'
      })
    } else {

      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 12);
      } catch (err) {
        console.error(err);
        const error = 'Could not create user, try again later.(hash error)';
        return next(error);
      }

      const edit = await checkUser.update({
        name,
        email,
        avatar,
        password: hashedPassword
      });

      return response.status(200).json({
        status: 200,
        message: 'Dados atualizados'
      })
    }
  },

  async editImage(request, response) {
    const { id } = request.params
    const { avatar } = request.body;

    const checkUser = await User.findOne({ where: { id: id } });

    if (!checkUser) {
      console.log('ID not found.')
      return response.status(400).json({
        status: 400,
        error: 'ID not found.'
      })
    } else {

      const edit = await checkUser.update({
        avatar
      });

      return response.status(200).json({
        status: 200,
        message: 'Foto de perfil atualizada'
      })
    }
  }
}