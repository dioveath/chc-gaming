const Router = require('express').Router;

const router = Router();

const userController = require('../../../controllers/user');
const makeExpressCallback = require('./helpers/express-callback');

router.get('/', makeExpressCallback(userController.listUsers));
router.get('/:id', makeExpressCallback(userController.getUser));
router.post('/', makeExpressCallback(userController.createUser));
router.post('/:id', makeExpressCallback(userController.updateUser));
router.delete('/:id', makeExpressCallback(userController.deleteUser));

module.exports = router;
