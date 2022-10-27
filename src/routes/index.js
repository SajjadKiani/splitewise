const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');
const auth = require('../middlewares/logging.middleware')

/* GET */
router.get('/',auth, controller.get);
  
/* POST  */
router.post('/', controller.create);

/* PUT  */
router.put('/:id', controller.update);

/* DELETE  */
router.delete('/:id', controller.remove);

/* CREATE USER */
router.post('/signup', controller.createUser);

/* LOGIN USER */
router.post('/login', controller.loginUser);

module.exports = router;
