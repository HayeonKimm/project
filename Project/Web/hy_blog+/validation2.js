module.exports = {
    password_test: (value) => {
        if (value.length < 4) {
            return false;
        } else {
            return true;
        }
    },
};
