const Comments = require('../models/comment');
const authMiddleware = require('../auth-middleware/auth-middleware');
const { route } = require('./lists');
const router = require('./lists');
const user = require('../models/user');
const List = require('../models/list');


//댓글 작성 API

router.post('/comments/:Uni_num', authMiddleware, async (req, res) => {
    const { sentence_co, title_co } = req.body;
    const { Uni_num } = req.params;
    const { user } = res.locals;
    const user_id = user.user_id;

    const [existsPosts] = await Lists.find({ Uni_num });

    if (!existsPosts) {
        return res
            .status(400)
            .json({ success: false, errorMessage: '해당 게시물이 없습니다.' });
    }

    const createdLists = await Lists.create({
        sentence_co,
        title_co,
        user_id,
        Uni_num,
    });

    res.json({ Lists: createdLists });
});

// 댓글 목록 조회 API

// 댓글 작성 API

// 댓글 수정 API






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
