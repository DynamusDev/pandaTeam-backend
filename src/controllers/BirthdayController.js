const Birthdays = require('../models/Birthdays');
const User = require('../models/User');
let { Expo } = require("expo-server-sdk");
let expo = new Expo()
const authConfig = require('../config/auth.json')
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const nodemailer = require('nodemailer')

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

  async create(request, response) {
    const { user, birthday }= request.body

    // try {
    //   const checkBirth = await Birthdays.findOne({ where: { user: user } });
    //   if (checkBirth) {
    //     return response.status(200).json({
    //       status: 400,
    //       error: 'Esta data de aniversário já está cadastrada na nossa base de dados, verifique o nome do aniversariante e tente novamente.'
    //     })
    //   }
    // } catch (err) {
    //   return response.status(500).json({
    //     status: 500,
    //     error: 'Connection error, user check DB'
    //   })
    // }
    const birth = await Birthdays.create({user, birthday})

    return response.status(200).json({
      status: 200,
      message: 'O aniversário de ' + user + ' foi adicionado a nossa base de dados!!!'
    });

  },

  async index(request, response) {
    const birthdays = await Birthdays.findAll();

    return response.status(200).json({
      status: 200,
      message: 'successfuly',
      birthdays
    });
  },

  async remember(request, response) {
    const users = await User.findAll();
    const emails = users.map(item => item.email)
    const tokens = users.map(item => item.notification_token)

  let messages = [{
    to: tokens,
    sound: 'default',
    title: 'Panda Cash&Fun informa',
    body: 'Não esqueça de fazer a sua contribuição para a nossa caixinha $$$ \n Acesse o nosso app para mais informações!!!',
    data: { withSome: 'data' },
  }];
  let somePushTokens = [];

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }
  })();

  let receiptIds = [];
  for (let ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    // Like sending notifications, there are different strategies you could use
    // to retrieve batches of receipts from the Expo service.
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log(receipts);
  
        // The receipts specify whether Apple or Google successfully received the
        // notification and information about an error, if one occurred.
        for (let receiptId in receipts) {
          let { status, message, details } = receipts[receiptId];
          if (status === 'ok') {
            continue;
          } else if (status === 'error') {
            console.error(
              `There was an error sending a notification: ${message}`
            );
            if (details && details.error) {
              // The error codes are listed in the Expo documentation:
              // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
              // You must handle the errors appropriately.
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();

  const emailASerEnviado = {
        from: 'naorespondapandateam@gmail.com',
        to: emails,
        subject: 'Panda Cash&Fun informa',
        text: 'Não esqueça de fazer a sua contribuição para a nossa caixinha $$$ \n Acesse o nosso app para mais informações!!!',
      };

      transport.sendMail(emailASerEnviado,
        function (err) {
          if (err) {
            console.log(err)
          } else {
            return response.status(200).json({
              status: 200,
              message: 'successfuly'
            });
          }
        }
      );
  },

  async edit(request, response) {
    const { id } = request.params
    const { user, birthday }= request.body

    const birth = await Birthdays.findOne({ where: { id: id } });

    if (!birth) {
      return response.status(400).json({
        status: 400,
        error: 'ID not found.'
      })
    } else {

      const edit = await birth.update({
        user, 
        birthday
      });

      return response.status(200).json({
        status: 200,
        message: 'Os dados atualizados'
      })
    }
  },

  async delete(request, response) {
    const {id} = request.params;

    try {
      const birth = await Birthdays.findOne({ where: { id: id } });
      if (birth) {
        await birth.destroy()

        return response.status(200).json({
          status: 200,
          message: 'deletado com sucesso!!!'
        })
      }
    } catch (err) {
      console.log(err)
      return response.status(500).json({
        status: 500,
        error: 'Connection error, user check DB'
      })
    }
  },
}