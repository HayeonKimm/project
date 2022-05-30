



// 회원가입 테스트 코드 작성

// 아이디 유효성 검사 코드 

const { ID_test } = require('./validation');
const { password_test2} = require('./vali3');

test('ID test case 1 : 일반적 경우', () => {
    expect(ID_test('hello')).toEqual(true);
});

test('ID test case 2 : 숫자', () => {
    expect(ID_test('hello2')).toEqual(true);
});


test('ID test case 3 : 한글', () => {
    expect(ID_test('ㅋㅋㅋㅋ')).toEqual(false);
});


test('ID test case 4 : 특수문자 ', () => {
    expect(ID_test('abc-')).toEqual(false);
});


// 비밀번호 유효성 검사 코드

const { password_test } = require('./validation2');


test('password test case 1 : 3자 ', () => {
    expect(password_test('ab')).toEqual(false);
});


test('password test case 2 : 4자 ', () => {
    expect(password_test('abcd')).toEqual(true);
});


test('password test case 3 : 닉네임 포함 ', () => {
    expect(password_test2('하연123')).toEqual(false);
});


