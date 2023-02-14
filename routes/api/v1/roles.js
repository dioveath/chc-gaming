const Router = require('express').Router;

const router = new Router();

const roleController = require('../../../controllers/role');
const makeExpressCallback = require('./helpers/express-callback');
const isAuthorized = require('../../../middlewares/is-authorized');

router.get('/', [isAuthorized], makeExpressCallback(roleController.listRoles));
router.get('/:id', makeExpressCallback(roleController.getRole));
router.post('/', [isAuthorized], makeExpressCallback(roleController.createRole));
router.post('/:id', [isAuthorized], makeExpressCallback(roleController.updateRole));
router.delete('/:id', [isAuthorized], makeExpressCallback(roleController.deleteRole));

module.exports = router;
