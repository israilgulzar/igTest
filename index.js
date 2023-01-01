const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/test', (req, res) => {
  res.send({
    status: 200,
    msg: 'good israil'
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});