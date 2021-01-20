const Birthdays = require('../models/Birthdays');

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
    const birthdates = await Birthdays.findAll();

    return response.status(200).json({
      status: 200,
      message: 'successfuly',
      birthdates
    });
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