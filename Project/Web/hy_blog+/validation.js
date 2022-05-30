// module.exports = {
//     isEmail: (value) => {
//         const email = (value || '');

//         if (email.split('@').length !== 2) {
//             return false;
//         } else if (email.includes(' ')) {
//             return false;
//         } else if (email[0] === '-') {
//             return false;
//         }

//         return true;
//     },
// };

module.exports = {
    ID_test: (value) => {
        var pattern1 = /[0-9]/; // 숫자
        var pattern2 = /[a-zA-Z]/; // 문자
        var pattern3 = /[-~!@#$%^&*()_+|<>?:{}]/; // 특수문자
        var pattern4 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        var numtextyn = pattern1.test(value) || pattern2.test(value);

        if (
            !numtextyn ||
            pattern3.test(value) ||
            pattern3.test(value) ||
            value.length > 14
        ) {
            console.log(
                '아이디는 14자리 이하 문자 또는 숫자로 구성하여야 합니다.'
            );
            return false;
        } else {
            return true;
        }
    },
};
