const service = require('../services/index');

async function get(req, res, next) {
  try {
      res.json(await service.getMultiple(req.query.page));
  } catch (err) {
      console.error(`Error while getting programming languages`, err.message);
      next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await service.create(req.body));
  } catch (err) {
    console.error(`Error while creating cost`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await service.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await service.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    res.json(await service.createUser(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    res.json(await service.loginUser(req.body));
  } catch (err) {
    console.error(`Error while logedin user`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  createUser,
  loginUser
};
