import express from 'express';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello, Auth service!');
});

app.listen(port, () => {
  console.log(`Auth service listening at http://localhost:${port}`);
});