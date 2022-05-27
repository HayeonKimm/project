const express = require('express');
const req = require('express/lib/request');
const User = require('./models/user');
const mongoose = require('mongoose');
const port = 8080;
const app = express();
const router = express.Router();
const listsRouter = require('./routes/lists');
const jwt = require('jsonwebtoken');
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

// post

router.post("/auth", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
    if (!user || password !== user.password) {
      res.status(400).send({
        errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
      });
      return;
    }
  
    res.send({
      token: jwt.sign({ userId: user.userId }, "customized-secret-key"),
    });
  });

router.post('/users', async (req, res) => {
    const { nickname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다~~',
        }); //실패를 의미
        return;
    }

    const existUsers = await User.findOne({
        $or: [{ email }, { nickname }],
    });

    if (existUsers) {
        res.status(400).send({
            errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.',
        });
        return;
    }

    const user = new User({ email, nickname, password });
    await user.save();

    res.status(201).send({});
});

app.use('/api', express.urlencoded({ extended: false }), [router, listsRouter]);
app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.send('Hi!');
});

app.listen(port, () => {
    console.log('서버가 켜졌어요!');
});
