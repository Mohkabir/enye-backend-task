const express = require("express");
const app = express();
const fetch = require("node-fetch");


app.get("/", (req, res)=>{
  res.send("<div><h1>Welcome to currency rates</h1><p>You can check currency rate with this query format:<br/> '/api/rates?base=USD&#38currency=EUR,BRL,CAD'</p></div>")
})


app.get('/api/rates', (req, res) => {
  let postArray = [];

    let inputedBase = req.query.base ;  
    
    fetch("https://api.exchangeratesapi.io/latest?base="+inputedBase)
    .then( (response) => response.json())
    .then( result =>{ 
      postArray.push(result);
      
      //breaking down the currency string
      let inputedCurrency = req.query.currency ;
      let splited =  inputedCurrency.split(",");
      let split1 = splited[0];
      let split2 = splited[1];
      let split3 = splited[2];
      
      //cheking if the currency passed in is in the api database
      if (!postArray[0].rates.split1 && postArray[0].rates.split2 && postArray[0].rates.split3){
        res.status(400).json({message:"the currency that you enter is not in the database"})
      }else{
        res.json(postArray)
      }
  
    })
    .catch(error=> {
      res.status(400).json({message:"please input a valid base and currency"})
    });
})
    
  



PORT = process.env.port || 4000 ;
app.listen(PORT, ()=>{
  console.log(`running in port ${PORT}`);
});