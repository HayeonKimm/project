const Comments = require('../models/comment');
const authMiddleware = require('../auth-middleware/auth-middleware');
const { route } = require('./lists');
const router = require('./lists');
const User = require('../models/user');
const Lists = require('../models/list');
const dayjs = require('dayjs');

//댓글 작성 API

router.post('/comments/:Uni_num', authMiddleware, async (req, res) => {
    const { sentence_co } = req.body;
    const { Uni_num } = req.params;

    const { user } = res.locals;



    console.log(user);
    const nickname = user.nickname;




    const [existsPosts] = await Lists.find({ Uni_num });

    console.log(existsPosts);
    // 배열 깨는거

    if (!existsPosts) {
        return res
            .status(400)
            .json({ success: false, errorMessage: '해당 게시물이 없습니다.' });
    }

    if (!sentence_co) {
        return res.status(400).json({
            success: false,
            errorMessage: '댓글 내용을 입력해주세요.',
        });
    }

    var now = dayjs();
    var time = now.format();
    time = time.slice(0, 16).split('T').join(' ');

    const createdComments = await Comments.create({
        sentence_co,
        nickname,
        Uni_num,
        time,
    });

    res.json({ Comments: createdComments });
});

// 댓글 목록 조회 API

router.get('/comments/:Uni_num', async (req, res) => {
    const [existsPosts] = await Todo.find().sort('-time').exec();


    res.send({ existsPosts });
});

// 댓글 수정 API

router.put('/comments/:Uni_num', authMiddleware, async (req, res) => {
    // 없을 때

    const [existsLists] = await Lists.find({ Uni_num });

    // console.log(existsLists.length); // 셀수가 없다.

    if (!existsLists) {
        return res
            .status(400)
            .json({ success: false, errorMessage: '해당 게시물이 없습니다.' });
    }

    await Lists.updateOne({ Uni_num }, { $set: { sentence_co } });

    res.json({ success: true });
});

// 댓글 삭제 API

router.delete('/comments/:Uni_num', authMiddleware, async (req, res) => {
    const existsLists = await Lists.find({ Uni_num });
    if (existsLists.length) {
        await Lists.deleteOne({ Uni_num });
    } else {
        return res
            .status(400)
            .json({ success: false, errorMessage: '권한이 없습니다.' });
    }

    res.json({ success: true });
});

module.exports = router;
