const Router = require('express').Router;

const router = Router();

const userController = require('../../../controllers/user');
const makeExpressCallback = require('./helpers/express-callback');

const fileUpload = require('express-fileupload');
const compressUploadImage = require('../../../middlewares/compress-upload-image');

router.use(fileUpload({
  limit: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true,
  tempFileDir: '/tmp/',
  debug: true,
}));


router.get('/', makeExpressCallback(userController.listUsers));
router.get('/:id', makeExpressCallback(userController.getUser));
router.post('/', makeExpressCallback(userController.createUser));

router.post('/profile', [ compressUploadImage ], makeExpressCallback(userController.updateUser));

router.post('/:id', makeExpressCallback(userController.updateUser));


router.delete('/:id', makeExpressCallback(userController.deleteUser));

module.exports = router;
