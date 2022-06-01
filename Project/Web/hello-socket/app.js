const socketIo = require("socket.io");
const express = require("express");
const Http = require("http");
const app = express();
const http = Http.createServer(app);
const io = socketIo(http, {

    cors: {

        origin: "*",
        method: ["GET","POST"],
    },

});



app.get("/test", (req, res) => {


    res.send("서버 잘 켜져있습니다..!")
});


http.listen(3000, () => {
    console.log("서버가 켜졌습니다.")
});


io.on("connection", (socket) => {


    console.log("연결이 되었습니다.");

    socket.send("너 연결 잘 됐어 !!");
    socket.emit("customEventName", "새로운 이벤트인가!!");
});