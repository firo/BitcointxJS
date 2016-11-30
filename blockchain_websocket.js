var WebSocket = require('ws');
var blockchain = new WebSocket('wss://ws.blockchain.info/inv');

blockchain.onerror = function (error){ console.log('connection.onerror',error); };

blockchain.onopen = function () {
  blockchain.send( JSON.stringify( {"op":"unconfirmed_sub"} ) );  //  subscribe to uncofirmed activity
};

blockchain.onmessage = function (message)
    {
        var response = JSON.parse(message.data);

        var date = new Date(0);
        date.setUTCSeconds( response.x.time );

        if( response.op == "utx")
        {
            var amount = 0;

            for(var i=0;i<response.x.out.length;i++)
                amount += response.x.out[i].value;
            response.outs = response.x.out.length;
            //  1 BTC = 100,000,000 Satoshi (https://en.bitcoin.it/wiki/activity)
            response.amount = amount / 100000000;
        }

        console.log( response.op, response );

    };
