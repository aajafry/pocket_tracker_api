const userModel = require('../../models/user/index'),
    transactionModel = require('../../models/transaction/index');

const transactionController = {
    create: async (req, res) => {
        try {
            const { id } = req.user;
            const { name, amount, type } = req.body;

            const transaction = transactionModel({
                user: id,
                name,
                amount,
                type
            })
            const populatedTransaction = await transaction.save();

            await userModel.findByIdAndUpdate(id, {
                $push: {transactions: populatedTransaction }
            })
            res.status(201).json({
                message: "transaction created successfully",
                transaction: populatedTransaction
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "there was an error saving the transaction",
                error: error
            });
        }
    },
    read: async (req, res) => {
      try {
         const { id } = req.user;

         const user = await userModel.findById(id).populate('transactions').exec();
         const { transactions } = user;

         res.status(200).json({
            message: "transaction retrieved successfully",
            transactions: transactions
         })
      } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "there was an error retrieving the transaction",
            error: error
        });
      }
    },
    delete: async (req, res) => {
        try {
            const transaction = await transactionModel.findById(req.params.id);

            if (!transaction) {
                return res.status(404).json({
                    message: "transaction not found"
                })
            }

            await userModel.findByIdAndUpdate(req.user.id, {
                $pull: { transactions: transaction._id }
            })

            await transactionModel.findByIdAndDelete(transaction._id);

            res.status(200).json({
                message: "transaction deleted successfully",
                transaction: transaction
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "there was an server side error",
                error: error
            });
        }
    }
}

module.exports = transactionController