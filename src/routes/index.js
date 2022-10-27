const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');
const auth = require('../middlewares/logging.middleware')

/* GET */
router.get('/',auth, controller.get);
  
/* POST  */
router.post('/',auth, controller.create);

/* PUT  */
router.put('/:id',auth, controller.update);

/* DELETE  */
router.delete('/:id',auth, controller.remove);

/* CREATE USER */
router.post('/signup', controller.createUser);

/* LOGIN USER */
router.post('/login', controller.loginUser);

module.exports = router;
