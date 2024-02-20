const { Telegraf } = require("telegraf");
const axios = require("axios");
const app = require("express")();
const { Web3 } = require('web3');

app.get("/usdt",async (req,res) => {
  
  let details = await getName();
  if (!details){
    res.status(500).send("An Error Occured, Please Try Again");
  return }
  axios.get("https://apilist.tronscan.org/api/token_trc20/transfers?limit=1")
    .then((result) => {
    result.data.stark = details;
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(500).send({
          error: "An error occured in getting a transaction, Send error to @stark_nilx on telegram",
          log: error.message
      });
    });
});

app.get("/trx", (req,res) => {
  axios.get("https://apilist.tronscan.org/api/transfer?limit=1")
  .then((result) => {
        res.status(200).send(result.data);
  })
  .catch((error) => {
    res.status(500).send({
        error: "An error occured in getting a transaction, Send error to @stark_nilx on telegram",
        log: error.message
    });

  })
});

app.get("/btc", (req,res) => {
  axios.get("https://api.blockchair.com/bitcoin/transactions?limit=1")
  .then((result) => {
        res.status(200).send(result.data);
  })
  .catch((error) => {
    res.status(500).send({
        error: "An error occured in getting a transaction, Send error to @stark_nilx on telegram",
        log: error.message
    });

  })
});

app.get("/eth",async (req,res) => {
    const web3 = new Web3(`https://mainnet.infura.io/v3/a344e30144bf4321bf79328d575c50b4`);
    try {
      
      const latestBlockNumber = await web3.eth.getBlockNumber();
      
      const latestBlock = await web3.eth.getBlock(latestBlockNumber, true);
      
      const lastTransaction = latestBlock.transactions[latestBlock.transactions.length - 1];

      const formattedLastTransaction = {
        hash: lastTransaction.hash,
        from: lastTransaction.from,
        to: lastTransaction.to,
        value: web3.utils.fromWei(lastTransaction.value, 'ether')
      };
    res.status(200).send(formattedLastTransaction);
    } catch (error) {
      res.status(500).send({Error: error.message});
    }
});

app.get("/bnb",async (req,res) => {
    const web3 = new Web3(`https://bsc-dataseed.binance.org/`);
    try {

      const latestBlockNumber = await web3.eth.getBlockNumber();

      const latestBlock = await web3.eth.getBlock(latestBlockNumber, true);

      const lastTransaction = latestBlock.transactions[latestBlock.transactions.length - 1];

      const formattedLastTransaction = {
        hash: lastTransaction.hash,
        from: lastTransaction.from,
        to: lastTransaction.to,
        value: web3.utils.fromWei(lastTransaction.value, 'ether')
      };
    res.status(200).send(formattedLastTransaction);
    } catch (error) {
      res.status(500).send({Error: error.message});
    }
});
const port = 3000;
app.listen(port, () => {
  console.log("Running on port: "+ port);
});
