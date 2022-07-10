const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 3000);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
