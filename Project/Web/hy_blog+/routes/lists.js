const express = require('express');
const router = express.Router();
const Lists = require('../models/list');
const dayjs = require('dayjs');
const authMiddleware = require('../auth-middleware/auth-middleware');

/// 게시물 작성 API
/// 수정,삭제,작성은
//authMiddleware 추가하기

router.post('/lists', async (req, res) => {
    
    const { title, userId, sentence  } = req.body;


    var now = dayjs();
    var time = now.format();

    time = time.slice(0, 16).split('T').join(' ');

    const createdLists = await Lists.create({
        title,
        userId,
        sentence,
        time,
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


router.put('/lists/:title',  authMiddleware, async (req, res) => {
    const { title } = req.params;
    const { sentence } = req.body;

    // 없을 때

    const [existsLists] = await Lists.find({ title });

    // console.log(existsLists.length); // 셀수가 없다.

    if (!existsLists) {
        return res
            .status(400)
            .json({ success: false, errorMessage: '해당 게시물이 없습니다.' });
    }

    await Lists.updateOne({ title }, { $set: { sentence } });

    res.json({ success: true });
});

// 게시글 삭제 API
// API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기

router.delete('/lists/:title',authMiddleware, async (req, res) => {
    const { title } = req.params;
    const { sentence } = req.body;

    const existsLists = await Lists.find({ title });
    if (existsLists.length) {
        
        await Lists.deleteOne({ title });
    }else {
            return res
                .status(400)
                .json({ success: false, errorMessage: '권한이 없습니다.' });
    }

    res.json({ success: true });
});

module.exports = router;
