const express = require('express');
const router = express.Router();
const Lists = require('../models/list');
const dayjs = require('dayjs');
const authMiddleware = require('../auth-middleware/auth-middleware');
/// 로그인 API

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }, { nickname });

    // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다

    if (!user || password !== user.password) {
        res.status(400).send({
            errorMessage: '이메일 또는 패스워드를 확인해주세요.',
        });
        return;
    }

    res.send({
        token: jwt.sign({ userId: user.userId }, 'customized-secret-key'),
    });
});

module.exports = router;
