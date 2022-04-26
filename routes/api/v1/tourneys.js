const Router = require('express').Router;

const router = Router();

const tourneyController = require('../../../controllers/tourney');
const makeExpressCallback = require('./helpers/express-callback');

router.get('/', makeExpressCallback(tourneyController.listTourneys));
router.get('/:id', makeExpressCallback(tourneyController.getTourney));
router.post('/', makeExpressCallback(tourneyController.createTourney));
router.post('/:id', makeExpressCallback(tourneyController.updateTourney));
router.delete('/:id', makeExpressCallback(tourneyController.deleteTourney));

module.exports = router;
