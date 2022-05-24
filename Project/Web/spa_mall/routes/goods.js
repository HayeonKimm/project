const express = require("express");
const Goods = require("../schemas/goods");
const router = express.Router();




router.get("/", (req, res) => {
  res.send("this is root page");
});

router.get("/goods", async (req, res) => {
  const {category} = req.query;

  console.log("category?", category);

  const goods = await Goods.find({category});

  res.json({
    goods,
  });
});

router.get("/goods/cart",async (req,res)=>{

  const carts = await Cart.find();
  const goodsId = cart.map((cart)=> cart.goodsId);
  
  const goods = await Goods.find({ goodsId: goodsId});

  res.json({

    carts: carts.map((cart)=> ({

      quantity:cart.quantity,
      goods: goods.find((item)=> item.goodsId === carts.goodsId),

    })),

  });

});



router.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;
  const [goods] = await Goods.find({ goodsId: Number(goodsId) });

  res.json({
    goods, // goods:detail 해도 상관없다.
  });
});





// router.post("/goods/:goodsId/cart", async (req, res) => {
//   const { goodsId } = req.params;
//   const { quantity } = req.body;

//   const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
//   if (existsCarts.length) {
//     return res.json({ success: false, errorMessage: "이미 장바구니에 존재하는 상품입니다." });
//   }


//   res.json({ result: "success" });
// });





router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;
  const goods = await Goods.find({ goodsId });

  if (goods.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });

  res.json({ goods: createGoods });
});



router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length > 0) {
    await Cart.deleteOne({ goodsId });
  }

  res.json({ result: "success" });
});



router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });


  if (!existsCarts.length){

    await Cart.create({ goodsId : Number(goodsId),quantity});

  } else {
      await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
    } 
  
    res.json({ success: true });

  });


  
  


module.exports = router; // 내보내는 코드
