const express = require('express');
const req = require('express/lib/request');
const User = require('./models/user');
const mongoose = require('mongoose');
const port = 8080;
const app = express();
const router = express.Router();
const listsRouter = require('./routes/lists');
const usersRouter = require('./routes/users');
const authsRouter = require('./routes/auths');
const authMiddleware = require('./auth-middleware/auth-middleware');

mongoose.connect('mongodb://localhost/shopping-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



// get

router.get('/users/me', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
        user,
    });
});


app.use('/api', express.urlencoded({ extended: false }), [router, listsRouter ,authsRouter, usersRouter]);
app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.send('Hi!');
});

app.listen(port, () => {
    console.log('서버가 켜졌어요!');
});





// 댓글 작성 API
//     - 로그인 토큰을 전달했을 때에만 댓글 작성이 가능하도록 하기
//     - 로그인 토큰을 전달하지 않은 채로 댓글 작성란을 누르면 "로그인이 필요한 기능입니다." 라는 에러 메세지를 response에 포함하기
//     - 댓글 내용란을 비워둔 채 API를 호출하면 "댓글 내용을 입력해주세요" 라는 에러 메세지를 response에 포함하기