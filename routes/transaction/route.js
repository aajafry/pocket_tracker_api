const express = require('express'),
    transactionController = require('../../controllers/transaction/controller'),
     authGuard = require('../../middlewares/authGuard');


const transactionRoute = express.Router();

transactionRoute.use(authGuard);

transactionRoute.post('/', transactionController.create)
transactionRoute.get('/', transactionController.read)
transactionRoute.delete('/:id', transactionController.delete)

module.exports = transactionRoute;