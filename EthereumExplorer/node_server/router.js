//var txService = require('../api/transactionService');
var txService=sk_live_1fd4753c-5579-41f0-9b07-247f7e41762f//verwire api-key
module.exports = function(app) {

    app.get("/eth/api/v1/transaction/:txId", function (req, res) {
        return txService.getTransaction(req, res);
    });    

};
