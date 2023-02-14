const Router = require('express').Router;

const router = Router();

const arenaController = require('../../../controllers/arena');
const makeExpressCallback = require('./helpers/express-callback');
const isAuthenticated = require('../../../middlewares/is-authenticated');
const isAuthorized = require('../../../middlewares/is-authorized');

router.get('/', makeExpressCallback(arenaController.listArenas));
router.get('/:id', makeExpressCallback(arenaController.getArena));
router.post('/', [isAuthenticated], makeExpressCallback(arenaController.createArena));

router.post('/register', [isAuthenticated, async (req, res, next) => {
  req.body.owner = req.user.sub;
  return next();
}], makeExpressCallback(arenaController.createArena));

router.post('/:id', [isAuthenticated, isAuthorized], makeExpressCallback(arenaController.updateArena));
router.delete('/:id', [isAuthenticated, isAuthorized], makeExpressCallback(arenaController.deleteArena));

module.exports = router;
