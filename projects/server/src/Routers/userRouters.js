const { readToken } = require('../Config/encription');
const { userControllers } = require('../Controllers');
const router = require('express').Router();

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/forgot', userControllers.forgot);
router.patch('/edit', readToken, userControllers.edit);
router.get('/keepLogin', readToken, userControllers.keepLogin);
router.patch('/verified', readToken, userControllers.verified);
router.get('/reverified', readToken, userControllers.reverified);
router.post('/getTokens', readToken, userControllers.getTokens);
router.patch('/reset', readToken, userControllers.reset);
router.patch('/change', readToken, userControllers.change);
router.patch('/profilePicture', readToken, userControllers.profilePicture);

module.exports = router;