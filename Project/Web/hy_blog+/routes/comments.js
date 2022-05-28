const express = require('express');
const router = express.Router();




/// 댓글작성 API


router.post('/comments', async (req, res) => {
    const { title, sentence  } = req.body;

    const lists = await Lists.find({ title });

    var now = dayjs();
    var time = now.format();

    time = time.slice(0, 16).split('T').join(' ');

    if (lists.length) {
        return res
            .status(400)
            .json({ success: false, errorMessage: '이미 있는 제목입니다.' });
    }

    const createdLists = await Lists.create({
        title,
        sentence,
        time,
    });

    res.json({ lists: createdLists });
});



//     댓글 목록 조회 API
//     - 로그인 토큰을 전달하지 않아도 댓글 목록 조회가 가능하도록 하기
//     - 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 response에 포함하기
//     - 제일 최근 작성된 댓글을 맨 위에 정렬하기


router.get('/comments', async (req, res) => {
    const lists = await Lists.find();

    res.json({
        lists,
    });
});











module.exports = router;
