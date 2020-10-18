const bcrypt = require('bcryptjs');
const Event = require('../models/Event');
const Cash = require('../models/Cash');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

module.exports = {

  async create(req, res) {
    const { 
      title, 
      date, 
      amount_spent,
      user_id, 
      tax_coupon_one, 
      tax_coupon_two, 
      tax_coupon_three, 
      tax_coupon_four, 
      tax_coupon_five 
    } = req.body;

    const prevAmount = await Cash.findOne({where: {id:1}})
    const calculate = parseFloat(prevAmount.amount.replace(',','.'), 2) - parseFloat(amount_spent.replace(',','.'), 2)

    const add = prevAmount.update({
      amount: calculate.toString().replace('.',',')
    });

    const data = {
      title, 
      date, 
      amount_spent,
      user_id,
      tax_coupon_one, 
      tax_coupon_two, 
      tax_coupon_three, 
      tax_coupon_four, 
      tax_coupon_five
    }

    const event = await Event.create(data)

    req.io.emit('event', event.dataValues);
    req.io.emit('cash', calculate.toString().replace('.',','));

    return res.status(200).json({
      status: 200,
      message: 'O evento ' + title + ' foi adicionado!!!'
    });

  },

  async index(request, response) {
    const events = await Event.findAll();

    return response.status(200).json({
      status: 200,
      message: 'successfuly',
      events
    });
  },

  async especific(request, response) {
    const { id } = request.params;
    const event = await Event.findOne({ where: { id: id } });

    return response.status(200).json({
      status: 200,
      message: 'successfuly',
      event
    });
  },

  async edit(request, response) {
    const { id } = request.params
    const { title, date, amount_spent, tax_coupon_one, tax_coupon_two, tax_coupon_three, tax_coupon_four, tax_coupon_five } = request.body;

    const checkEvent = await Event.findOne({ where: { id: id } });

    if (!checkEvent) {
      return response.status(400).json({
        status: 400,
        error: 'ID not found.'
      })
    } else {

      const edit = await checkEvent.update({
        title, 
        date, 
        amount_spent,
        tax_coupon_one, 
        tax_coupon_two, 
        tax_coupon_three, 
        tax_coupon_four, 
        tax_coupon_five
        });

      return response.status(200).json({
        status: 200,
        message: 'Dados atualizados'
      })
    }
  }
}