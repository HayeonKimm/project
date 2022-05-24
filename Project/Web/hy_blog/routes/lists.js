const express = require("express");
const router = express.Router();
const Lists = require("../schemas/list");
const dayjs = require("dayjs");



// lists 데이터

const lists = [
    {
      title: "모두 들어라",
      name: "김하연1",
      data: "랄라라라라랄",
      number: 1111
    },
    {

        title: "여러분.",
        name: "김하연2",
        data: "헤이거기미스터",
        number:1234

    },
    {
        title: "헬로",
        name: "김하연3",
        data: "나를 좀 봐바 미스터",
        number:2222
    },
    {

      title: "헬로스3",
      name: "김하연4",
      data: "헤이 거기 미스터어어",
      number:3333
    },
];



// 전체 게시글 목록 조회 API

router.get("/lists", async (req, res) => {

    const lists = await Lists.find();

    res.json({

        lists,
    });

});


// 타이틀로 목록 조회

router.get("/lists/:title", (req, res)=>{

    const {title} = req.params;


    res.json({


        detail: lists.filter((item)=>{

            return item.title === title;

        })[0],

    });

});


// 작성자명으로 조회 

router.get("/lists/:name", (req, res)=>{

    const {name} = req.params;


    res.json({


        detail: lists.filter((item)=>{

            return item.name === name;

        })[0],

    });

});

// 작성 날짜로 조회

router.get("/lists/:data", (req, res)=>{

    const {data} = req.params;


    res.json({


        detail: lists.filter((item)=>{

            return item.data === data;

        })[0],

    });

});





// 중복 게시물 검사 및 게시물 작성 (Validation)

router.post("/lists", async (req, res) => {
	const { title, name, data, password } = req.body;

  const lists = await Lists.find({ title });


  var now = dayjs();
  var time = now.format();

  time = time.slice(0,16).split('T').join(' ')
  

  if (lists.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdLists = await Lists.create({ title, name, data, password, time });

  res.json({ lists: createdLists });
  


});

// 게시글 수정 API
// - API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기

router.put("/lists/:title", async (req, res) => {
    const {title} = req.params;
    const {data} = req.body;
    const {password} = req.body;


    // 없을 때

    const [existsLists] = await Lists.find({title});
    
    // console.log(existsLists.length); // 셀수가 없다.
    if (!existsLists){
        return res.status(400).json({ success: false, errorMessage: "해당 게시물이 없습니다."});
    }
    
    // 있을 때

    if (Number(password) !== Number(existsLists.password)){

        return res.status(400).json({ success: false, errorMessage: "비밀번호가 틀립니다."});

        
        
    }
    
    await Lists.updateOne({title}, {$set: {data}});


    res.json({ success: true});
});




// 게시글 삭제 API
// API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기



router.delete("/lists/:title", async (req, res) => {

    const { title } = req.params;
    const {data} = req.body;
    const { password } = req.body;

    const existsLists = await Lists.find({title});
    if (existsLists.length){

        if (Number(password) === Number(existsLists.password)){
            

            await Lists.deleteOne({ title });
        }else{

            return res.status(400).json({ success: false, errorMessage: "비밀번호가 틀립니다."});
        }
    }


    res.json({ success: true});
});




module.exports = router;