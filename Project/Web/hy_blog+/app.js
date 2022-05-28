const express = require('express');
const req = require('express/lib/request');
const User = require('./models/user');
const mongoose = require('mongoose');
const port = 8080;
const app = express();
const router = express.Router();
const listsRouter = require('./routes/lists');
const usersRouter = require('./routes/users');
const authsRouter = require('./routes/auths');
const authMiddleware = require('./auth-middleware/auth-middleware');





mongoose.connect('mongodb://localhost/sparta', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// get

router.get('/users/me', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
        user,
    });
});

router.get('/', (req, res) => {
    res.send('김하연이므니다.');
});

app.use('api',express.json)
app.use('/api', express.urlencoded({ extended: false }), [
    router,
    listsRouter,
    authsRouter,
    usersRouter,
]);
app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.send('Hi!');
});

app.listen(port, () => {
    console.log('서버가 켜졌어요!');
});
