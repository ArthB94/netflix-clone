import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Hello, Film service!');
});

app.listen(port, () => {
  console.log(`Film service listening at http://localhost:${port}`);
});