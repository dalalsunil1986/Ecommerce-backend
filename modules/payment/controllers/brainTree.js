const userModel = require('../../auth/model/users');
const brainTree = require('braintree');
require('dotenv').config();

let gateway = brainTree.connect({environment: brainTree.Environment.Sandbox, publicKey: process.env.BRAINTREE_PUBLIC_KEY, privateKey: process.env.BRAINTREE_PRIVATE_KEY, merchantId: process.env.BRAINTREE_MERCHANT_ID});

const brainTreeController = {
    generateToken: (req, res, next) => {
        gateway
            .clientToken
            .generate({}, function (err, response) {
                if (err) {
                    return res
                        .status(500)
                        .json(err);
                } else {
                    return res.json(response);
                }
            });
    },
    processPayment: (req, res, next) => {
        let nonceFromTheClient = req.body.paymentMethodNonce;
        let amountFromClient = req.body.amount;

        let newTransaction = gateway
            .transaction
            .sale({
                amount: amountFromClient,
                paymentMethodNonce: nonceFromTheClient,
                options: {
                    submitForSettlement: true
                }
            }, (err, result) => {
                if (err) {
                    return res
                        .status(500)
                        .json(err);
                } else {
                    return res.json(result);
                }
            })
    }
};

module.exports = brainTreeController;