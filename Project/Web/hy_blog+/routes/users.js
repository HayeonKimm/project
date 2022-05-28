

const express = require('express');
const router = express.Router();
const Lists = require('../schemas/list');
const dayjs = require('dayjs');


// 닉네임 유효성 검사 함수
function CV_checkIdPattern(str) {
    var pattern1 = /[0-9]/; // 숫자
    var pattern2 = /[a-zA-Z]/; // 문자
    var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자

    var numtextyn = pattern1.test(str) || pattern2.test(str);
    if (!numtextyn || pattern3.test(str) || str.length > 14) {
        alert('아이디는 14자리 이하 문자 또는 숫자로 구성하여야 합니다.');
        return false;
    } else {
        return true;
    }
}



// 회원가입 API

//   1. 회원 가입 API
//     - 닉네임, 비밀번호, 비밀번호 확인을 request에서 전달받기
//     - 닉네임은 `최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성하기
//     - 비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 만들기
//     - 비밀번호 확인은 비밀번호와 정확하게 일치하기
//     - 데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 "중복된 닉네임입니다." 라는 에러메세지를 response에 포함하기




router.post('/users', async (req, res) => {
    const { email, nickname, password, confirmPassword } = req.body;

    if (nickname.length < 3) {
        res.status(400).send({ 
          errorMessage: '닉네임은 3글자 이상입니다.',
        });
        return;
    };


    if (!CV_checkIdPattern(nickname)){
      res.status(400).send({ 
        errorMessage: '닉네임은 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성해주세요.',
      });
      return;
    };

    // 비밀번호는 4자 이상이며
    if (password.length < 4) {
      res.status(400).send({ 
        errorMessage: '비밀번호는 3글자 이상입니다.',
      });
      return;
    };

    // 닉네임과 같은 값이 포함된 경우 회원가입 실패로 만들기.
    if (password.includes(nickname)){
      
      res.status(400).send({ 
        errorMessage: '비밀번호는 닉네임 포함 금지입니다.',
      });
      return;
    };

    
    // 비밀번호 확인은 비밀번호와 정확하게 일치하기.

    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 다릅니다.',
        });
        return;
    };

    // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
    const existsUsers = await User.findOne({
        $or: [{ email }, { nickname }],
    });
    if (existsUsers) {
        // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
        res.status(400).send({
            errorMessage: '중복된 닉네임입니다.',
        });
        return;
    }

    const user = new User({ email, nickname, password });
    await user.save();

    res.status(201).send({});
});







module.exports = router;
