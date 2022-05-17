
const Router = require('express').Router;

const router = Router();

const matchController = require('../../../controllers/match');
const makeExpressCallback = require('./helpers/express-callback');

router.get('/', makeExpressCallback(matchController.listMatches));
router.get('/:id', makeExpressCallback(matchController.getMatch));
router.post('/', makeExpressCallback(matchController.createMatch));
router.post('/:id', makeExpressCallback(matchController.updateMatch));
router.delete('/:id', makeExpressCallback(matchController.deleteMatch));

module.exports = router;
