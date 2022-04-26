const Router = require('express').Router;

const router = new Router();

const roleController = require('../../../controllers/role');
const makeExpressCallback = require('./helpers/express-callback');

router.get('/', makeExpressCallback(roleController.listRoles));
router.get('/:id', makeExpressCallback(roleController.getRole));
router.post('/', makeExpressCallback(roleController.createRole));
router.post('/:id', makeExpressCallback(roleController.updateRole));
router.delete('/:id', makeExpressCallback(roleController.deleteRole));

module.exports = router;
