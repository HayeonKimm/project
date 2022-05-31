const express = require('express');
const router = express.Router();
const Lists = require('../models/list');
const dayjs = require('dayjs');
const authMiddleware = require('../auth-middleware/auth-middleware');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

/// 로그인 API
router.post('/auth', async (req, res) => {
    const { nickname, password } = req.body;
    console.log(nickname);
    console.log(password);

    const user = await User.findOne({ nickname });

    // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
    if (!user || password !== user.password) {
        res.status(400).send({
            user,
            errorMessage: '닉네임 또는 패스워드가 틀렸습니다.',
        });
        return;
    }

    const token = jwt.sign(
        { nickname: user.nickname },
        'customized-secret-key'
    );
    console.log(token);
    res.send({ token });
});

module.exports = router;
