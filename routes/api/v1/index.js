const Router = require('express').Router;
const router = Router();
const userApi = require('./users');
const matchApi = require('./matches');
const tourneyApi = require('./tourneys');
const roleApi = require('./roles');
const clipApi = require('./clips');

const isAuthenticated = require('../../../middlewares/is-authenticated');
const isAuthorized = require('../../../middlewares/is-authorized');

router.use('/users', [isAuthenticated, isAuthorized()], userApi);
router.use('/matches',[isAuthenticated, isAuthorized()], matchApi);
router.use('/tourneys', [isAuthenticated, isAuthorized()], tourneyApi);
router.use('/roles', [isAuthenticated], roleApi);
router.use('/clips', [isAuthenticated], clipApi);

module.exports = router;
