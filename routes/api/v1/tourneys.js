const Router = require('express').Router;

const router = Router();

const tourneyController = require('../../../controllers/tourney');
const makeExpressCallback = require('./helpers/express-callback');
const isAuthorized = require('../../../middlewares/is-authorized');
const khaltiRegistrationFeeVerify = require('../../../middlewares/khalti-registration-fee-verify');

router.get('/', makeExpressCallback(tourneyController.listTourneys));
router.get('/:id', makeExpressCallback(tourneyController.getTourney));

router.post('/', makeExpressCallback(tourneyController.createTourney));
router.post('/:id', makeExpressCallback(tourneyController.updateTourney));
router.delete('/:id', makeExpressCallback(tourneyController.deleteTourney));

// for players
router.post('/:id/register', makeExpressCallback(tourneyController.registerTourney));
router.post('/:id/register-verify', [khaltiRegistrationFeeVerify], makeExpressCallback(tourneyController.updateTourney));

// for organizers
router.post('/:id/register/:playerId', [isAuthorized()], makeExpressCallback(tourneyController.registerPlayerToTourney));
router.delete('/:id/register/:playerId', [isAuthorized()], makeExpressCallback(tourneyController.deletePlayerFromTourney));

module.exports = router;
