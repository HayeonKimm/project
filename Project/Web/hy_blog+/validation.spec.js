


// 아이디 유효성 검사 코드 

const { CV } = require('./validation');

test('test case 1 : 일반적 경우', () => {
    expect(CV('hello')).toEqual(true);
});

test('test case 2: 숫자', () => {
    expect(CV('hello2')).toEqual(true);
});


test('test case 3 : 한글 사례', () => {
    expect(CV('ㅋㅋㅋㅋ')).toEqual(false);
});