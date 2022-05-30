const Comments = require('../models/comment');
const authMiddleware = require('../auth-middleware/auth-middleware');
const { route } = require('./lists');
const router = require('./lists');
const user = require('../models/user');
const List = require('../models/list');
const dayjs = require('dayjs');

//댓글 작성 API

router.post('/comments/:Uni_num', authMiddleware, async (req, res) => {
    const { sentence_co, title_co } = req.body;
    const { Uni_num } = req.params;
    const { user } = res.locals;
    const user_id = user.user_id;

    const [existsPosts] = await Lists.find({ Uni_num });

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

    time = time.slice(0, 16).split('T').join(' ');

    const createdLists = await Lists.create({
        sentence_co,
        user_id,
        Uni_num,
        time,
    });

    res.json({ Lists: createdLists });
});

// 댓글 목록 조회 API

router.get('/comments/:Uni_num', async (req, res) => {
    const [existsPosts] = await Todo.find().sort('-time').exec();

    existsPosts.sort(-time);

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
