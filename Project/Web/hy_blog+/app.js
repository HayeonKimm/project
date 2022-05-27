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
const Joi = require('joi');

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




  // 회원가입 API

//   1. 회원 가입 API
//     - 닉네임, 비밀번호, 비밀번호 확인을 request에서 전달받기
//     - 닉네임은 `최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성하기
//     - 비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 만들기
//     - 비밀번호 확인은 비밀번호와 정확하게 일치하기
//     - 데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 "중복된 닉네임입니다." 라는 에러메세지를 response에 포함하기



app.post('/users',(req,res,next)=>{
    if(!req.body.id){
        return res.sendStatus(404);
    }else {
        //아이디 공백 제거
        const userId = req.body.id.trim();
        //아이디 3글자 이하
        if(userId.length <= 3){
            return res.status(400).json({message : "아이디는 3글자 이상"});
        } 
        //아이디 20글자 초과
        else if (userId.length > 20){
            return res.status(400).json({message : "아이디는 20글자 미만"});
        } 
        //정상
        else {
            return res.sendStatus(200);
        }
    }
});







router.post('/users', async (req, res) => {

    const { nickname ,password, confirmPassword } = req.body;


    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다~~',
        }); //실패를 의미
        return;
    }

    if(nickname.length < 3){
        return res.status(400).send({errorMessage : "아이디는 3글자 이상입니다."});

    }
    const existUsers = await User.findOne({
        $or: [{ nickname }],
    });

    

    if (existUsers) {
        res.status(400).send({
            errorMessage: '중복된 닉네임입니다.',
        });
        return;
    }

    const user = new User({ nickname, password });
    await user.save();

    res.status(201).send({});


});



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



app.use('/api', express.urlencoded({ extended: false }), [router, listsRouter]);
app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.send('Hi!');
});

app.listen(port, () => {
    console.log('서버가 켜졌어요!');
});
