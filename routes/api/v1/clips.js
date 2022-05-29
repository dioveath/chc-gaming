const Router = require('express').Router;

const router = Router();

const clipController = require('../../../controllers/clip');
const makeExpressCallback = require('./helpers/express-callback');

const fileUpload = require('express-fileupload');
const encodeUploadClip = require('../../../middlewares/encode-upload-clip');


router.use(fileUpload({
  limit: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true,
  tempFileDir: '/tmp/',
  debug: true,
}));


router.get('/', makeExpressCallback(clipController.listClips));
router.get('/:id', makeExpressCallback(clipController.getClip));
router.post('/', makeExpressCallback(clipController.createClip));

router.post('/encode', [encodeUploadClip], makeExpressCallback(clipController.createClip));

router.post('/:id', makeExpressCallback(clipController.updateClip));
router.delete('/:id', makeExpressCallback(clipController.deleteClip));



module.exports = router;
