const jwt = require("jsonwebtoken");

const token = jwt.sign({test:true}, 'my-secret-key');


console.log(token);