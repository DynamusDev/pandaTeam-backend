const nodemailer = require('nodemailer')
const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const crypto = require('crypto');
const authConfig = require('../config/auth.json')

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "naorespondapandateam@gmail.com",
    pass: "Amasi@198"
  }
});

module.exports = {
  async create(request, response, next) {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return response.status(200).json({
        status: 400,
        error: 'Nenhum usuário encontrado com esse email'
      })
    }

    if (!await bcrypt.compare(password, user.password)) {
      return response.status(200).json({
        status: 401,
        error: 'Senha incorreta, verifique a senha e tente novamente'
      })
    }

    user.password = undefined

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400,
    })

    return response.status(200).json({
      status: 200,
      message: 'successfuly',
      user,
      token
    });
  },

  async forgotPassword(request, response) {
    const { email } = request.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return response.status(400).json({
        status: 400,
        error: 'No user found with this email'
      })
    } else {
      const newPassword = crypto.randomBytes(6).toString('hex');

      let hashedPassword;

      try {
        hashedPassword = await bcrypt.hash(newPassword, 12);
      } catch (err) { }

      const updatePassword = await user.update({
        password: hashedPassword
      });

      const emailASerEnviado = {
        from: 'naorespondateclat@gmail.com',
        to: email,
        subject: 'Esqueci Minha Senha - PandaTeam',
        text: `Você solicitou a alteração de senha no app PandaTeam Uma nova senha foi gerada automaticamente.\n
Login: ${email}
Senha: ${newPassword} \n
(fique atento com as letras minúsculas e maiúsculas)\n
Você ja pode logar na sua conta com sua senha nova.\n
Obrigado,
Panda Team`,
      };

      transport.sendMail(emailASerEnviado,
        function (err) {
          if (err) {
            console.log(err)
          } else {
            return response.status(200).json({
              status: 200,
              message: 'Email enviado com sucesso!!!'
            })
          }
        }
      );
    }
  }
}