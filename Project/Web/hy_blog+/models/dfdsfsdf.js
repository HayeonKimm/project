const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,}$')),

    confirmPassword: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'confirmPassword');


schema.validate({ username: 'abc' });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = await schema.validateAsync({ username: 'abc'});
}
catch (err) { }