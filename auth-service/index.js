import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './database/db_connection.js';
import auth from './routes/auth.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors(
  { origin: '*' }
));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hellooo, Auth service!');
});

app.use('/auth', auth);

app.use('/check', (req, res) => {
  db.raw('SELECT 1')
    .then(() => res.send({ response: 'Account service', ok: true }).status(200))
    .catch((err) => res.send({ response: 'Account service', ok: false, err: { text: `${err}`, error: err } }).status(500));
  
});

app.listen(port, () => {
  console.log(`Auth service listening at http://localhost:${port}`);
});