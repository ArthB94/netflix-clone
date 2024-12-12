import express from 'express';

const app = express();
const port = 5001;

app.get('/', (req, res) => {
  res.send('Hello, Film service!');
});

app.listen(port, () => {
  console.log(`Film service listening at http://localhost:${port}`);
});