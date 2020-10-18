const nodemailer = require('nodemailer')
const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const crypto = require('crypto');
const authConfig = require('../config/auth.json')
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
	'138133307207-5qu992jt4ekebl98the2dagibgeavusj.apps.googleusercontent.com',
	'rcuCqPbahvuSdXw6tnoBZFGi',
	'https://developers.google.com/oauthplayground',
);

oauth2Client.setCredentials({
	refresh_token:
		'1//04LjGSDwTSBGzCgYIARAAGAQSNwF-L9Ira-wvCDfZTbvJfNKlMQSggap0x7CX_kik7DAX_CIIMXh-9Bu87ngTULAXlcYpuLp8ZFE',
});
const accessToken = oauth2Client.getAccessToken();

const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		type: 'OAuth2',
		user: 'naorespondapandateam@gmail.com',
		clientId:
			'138133307207-5qu992jt4ekebl98the2dagibgeavusj.apps.googleusercontent.com',
		clientSecret: 'rcuCqPbahvuSdXw6tnoBZFGi',
		refreshToken:
			'1//04LjGSDwTSBGzCgYIARAAGAQSNwF-L9Ira-wvCDfZTbvJfNKlMQSggap0x7CX_kik7DAX_CIIMXh-9Bu87ngTULAXlcYpuLp8ZFE',
		accessToken: accessToken,
		tls: {
			rejectUnauthorized: false,
		},
	},
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