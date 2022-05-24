const express = require("express");
const app = express();
const port = 3000;

const cors = require('cors');

app.use(cors())
// app.options()

app.get("/cors-test", (req,res) => {

    res.send("hi");

});



app.listen(port, ()=>{

    console.log("서버가 켜졌어요~!")

});