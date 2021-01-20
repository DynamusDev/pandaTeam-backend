const Cash = require('../models/Cash');
const Entry = require('../models/Entry');

module.exports = {
  async post(req, res) {
    const {amount, userId} = req.body;
    const date = (new Date().getDate() < 10 ? '0' : '') + new Date().getDate().toString() + '/' + (new Date().getMonth() + 1 < 10 ? '0' : '') + (new Date().getMonth() + 1).toString() + '/' + new Date().getFullYear().toString();
    
    const prevAmount = await Cash.findOne({where: {id:1}})
    const calculate = parseFloat(prevAmount.amount.replace(',','.'), 2) + parseFloat(amount.replace(',','.'), 2)

    const add = prevAmount.update({
      amount: calculate.toString().replace('.',',')
    });

    const data = {
      amount,
      user_id: userId,
      date
    }

    const entry =  await Entry.create(data)

    req.io.emit('cash', calculate.toString().replace('.',','));

    req.io.emit('entry', entry.dataValues);

    return res.status(200).json({
      status: 200,
      message: 'Entrada Atualizada com sucesso',
      newValue: calculate.toString().replace('.',','),
      entry
    });
  },

  async index(request, response) {
    const cash = await Cash.findOne({where: {id: 1}});

    return response.status(200).json({
      status: 200,
      message: 'successfuly',
      cash
    });
  },

  async getEntries(req, res) {
    const entries = await Entry.findAll()

    return res.status(200).json({
      status: 200,
      message: 'successfuly',
      entries
    });
  }
}