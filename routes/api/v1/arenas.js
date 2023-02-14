const Router = require('express').Router;

const router = Router();

const arenaController = require('../../../controllers/arena');
const makeExpressCallback = require('./helpers/express-callback');

router.get('/', makeExpressCallback(arenaController.listArenas));
router.get('/:id', makeExpressCallback(arenaController.getArena));
router.post('/', makeExpressCallback(arenaController.createArena));
router.post('/:id', makeExpressCallback(arenaController.updateArena));
router.delete('/:id', makeExpressCallback(arenaController.deleteArena));

module.exports = router;
