import { createUser, getUserById, getUserByEmail } from "../database/queries/auth.js";
import bcryptjs from 'bcryptjs';

const { hash, compare } = bcryptjs;

const register = async (req, res) => {
  console.log('register');
  const { username, password, email } = req.body;
  if (!username) {
    return res.status(400).json({ ok:false, errorMessage: '"username" is required' });
  }
  if (!password) {
    return res.status(400).json({ ok:false, errorMessage: '"password" is required' });
  }
  if (!email) {
    return res.status(400).json({ ok:false, errorMessage: '"email" is required' });
  }
  try {
    const hashedPassword = await hash(password, 10);
    const userId = await createUser(username, email, hashedPassword);
    res.status(201).json({ok:true, userId});
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok:false, errorMessage: 'Internal server error', error });
  }
}

const login = async (req, res) => {
  console.log('login');
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ ok:false, errorMessage: '"email" is required' });
  }
  if (!password) {
    return res.status(400).json({ ok:false, errorMessage: '"password" is required' });
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ ok:false, errorMessage: 'User not found', email });
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ ok:false, errorMessage: 'Invalid password' });
    }
    res.status(200).json({ ok:true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok:false, errorMessage: 'Internal server error', error });
  }
}

export {
  register,
  login
};

