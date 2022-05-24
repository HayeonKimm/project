const express = require("express");
const req = require("express/lib/request");
const app = express();
const port = 3000;
const connect = require("./schemas");

connect();

const goodsRouter = require("./routes/goods"); // 가져오는 코드
const cartsRouter = require("./routes/carts");




const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
};



app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded())
app.use(requestMiddleware);

app.use("/api", [goodsRouter,cartsRouter]); // goodsRouter도 미들웨어다.


app.get('/', (req,res)=>{

    res.send("Hello, World.")
});



app.listen(port, () => {
    console.log(port, "서버가 켜졌어요..!")
});