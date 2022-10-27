const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    FROM programming_languages LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(reqBody){
  const result = await db.query(
    `INSERT INTO Cost 
    (title, description, date , userId) 
    VALUES 
    (?, ?, ?, ?)`, 
    [
      reqBody.title, reqBody.description, new Date().toISOString().slice(0, 10), reqBody.userId
    ]
  );

  let message = 'Error in creating Cost';

  if (result.affectedRows) {
    message = 'Cost created successfully';
  }

  return {message};
}

async function update(id, reqBody){
  const result = await db.query(
    `UPDATE programming_languages 
    SET name=?, released_year=?, githut_rank=?, 
    pypl_rank=?, tiobe_rank=? 
    WHERE id=?`, 
    [
      reqBody.name, reqBody.released_year,
      reqBody.githut_rank, reqBody.pypl_rank,
      reqBody.tiobe_rank, id
    ]
  );

  let message = 'Error in updating programming language';

  if (result.affectedRows) {
    message = 'Programming language updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM programming_languages WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting programming language';

  if (result.affectedRows) {
    message = 'Programming language deleted successfully';
  }

  return {message};
}

async function createUser(reqBody){

  const salt = await bcrypt.genSalt(10);
  const pHash = await bcrypt.hash(reqBody.password.toString(), salt)

  const result = await db.query(
    `INSERT INTO User 
    (username, password) 
    VALUES 
    (?, ?)`, 
    [
      reqBody.username, pHash,
    ]
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'user created successfully';
  }

  return {message};
}

async function loginUser(reqBody){
  const result = await db.query(
    `SELECT * FROM User;`
  );

  let message = ''

  const user = result.find((u) => u.username === reqBody.username)

  if (user) {
    const checkPassword = await bcrypt.compare(reqBody.password, result[0].password)
    if (checkPassword) {
      const token = jwt.sign({id: user.id, username: user.username}, 'mysecretkey')
      message = {message: 'login successfully!', username: reqBody.username,token: token}
    } else 
      throw new Error ('wrong password!')
  } else
    throw new Error ('user not found!')


  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  createUser,
  loginUser,
}
