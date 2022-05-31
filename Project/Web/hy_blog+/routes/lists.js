const express = require('express');
const router = express.Router();
const Lists = require('../models/list');
const dayjs = require('dayjs');
const authMiddleware = require('../auth-middleware/auth-middleware');


/// 게시물 작성 API

var Uni_num = 0;

router.post('/lists', authMiddleware ,async (req, res) => {
    const { id, sentence } = req.body;

    var now = dayjs();
    var time = now.format();
    Uni_num++;

    time = time.slice(0, 16).split('T').join(' ');

    const createdLists = await Lists.create({
        id,
        sentence,
        time,
        Uni_num,
    });

    res.json({ Lists: createdLists });
});

// 전체 게시물 조회 API

router.get('/lists', async (req, res) => {
    const lists = await Lists.find();

    res.json({
        lists,
    });
});

// 게시글 수정 API

router.put('/lists/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { sentence } = req.body;

    // 없을 때

    const [existsLists] = await Lists.find({ id });

    // console.log(existsLists.length); // 셀수가 없다.

    if (!existsLists) {
        return res
            .status(400)
            .json({ success: false, errorMessage: '해당 게시물이 없습니다.' });
    }

    await Lists.updateOne({ id }, { $set: { sentence } });

    res.json({ success: true });
});

// 게시글 삭제 API
// API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기

router.delete('/lists/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { sentence } = req.body;

    const existsLists = await Lists.find({ id });
    if (existsLists.length) {
        await Lists.deleteOne({ id });
    } else {
        return res
            .status(400)
            .json({ success: false, errorMessage: '권한이 없습니다.' });
    }

    res.json({ success: true });
});

module.exports = router;
