import { db } from '../db_connection.js';

const createUser = async (username, email, password) => {
  const [user] = await db('users').insert({ email, username, password }).returning('id');
  return user;
};

const getUserById = async (id) => {
  const user = await db('users').where({ id }).first();
  return user;
}

const getUserByEmail = async (email) => {
  const user = await db('users').where({ email }).first();
  return user;
}

export {
  createUser,
  getUserById,
  getUserByEmail
};


