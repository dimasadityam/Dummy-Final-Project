const { readToken } = require('../Config/encription');
const { productControllers } = require('../Controllers');
const router = require('express').Router();

router.post('/getProduct', readToken, productControllers.getProduct);
router.post('/konversiStock', readToken, productControllers.konversiStock);
router.get('/getAllProduct', productControllers.getAllProduct);


module.exports = router;