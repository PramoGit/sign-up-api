const express = require('express');
const port = process.env.PORT || 80 ;
var api = require('./api');
const app = express();
app.use('/api',api);
app.get('/',(req,res)=>{
    let data = {message:"You are welcome to sign up api."};
    res.json(data);
});


app.listen(port,()=>{
    console.log(`Server is started at port ${port}`);
});