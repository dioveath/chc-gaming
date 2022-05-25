const Router = require('express').Router;

const router = new Router();

const roleController = require('../../../controllers/role');
const makeExpressCallback = require('./helpers/express-callback');
const isAuthenticated = require('../../../middlewares/is-authenticated');

router.get('/', makeExpressCallback(roleController.listRoles));
router.get('/:id', makeExpressCallback(roleController.getRole));
router.post('/', [isAuthenticated], makeExpressCallback(roleController.createRole));
router.post('/:id', [isAuthenticated], makeExpressCallback(roleController.updateRole));
router.delete('/:id', [isAuthenticated], makeExpressCallback(roleController.deleteRole));

module.exports = router;
