const express = require("express");
const req = require("express/lib/request");
const connect = require("./schemas");

const port = 3000;
const app = express();
const router = express.Router();

const listsRouter = require("./routes/lists");
connect();



app.use("/api", express.json(), [router,listsRouter]);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi!");
  });




app.listen(port, () => {
  console.log("서버가 켜졌어요!");
});