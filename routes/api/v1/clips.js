const Router = require('express').Router;

const router = Router();

const clipController = require('../../../controllers/clip');
const makeExpressCallback = require('./helpers/express-callback');

router.get('/', makeExpressCallback(clipController.listClips));
router.get('/:id', makeExpressCallback(clipController.getClip));
router.post('/', makeExpressCallback(clipController.createClip));
router.post('/:id', makeExpressCallback(clipController.updateClip));
router.delete('/:id', makeExpressCallback(clipController.deleteClip));

module.exports = router;
