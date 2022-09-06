const userRouters = require('./userRouters');
const addresRouters = require('./addressRouters')
const rajaOngkirRouters = require('./rajaOngkirRouters')
const productRouters = require('./productRouters')
const router = require('express').Router();

router.use("/users", userRouters);
router.use("/address", addresRouters);
router.use("/rajaOngkir", rajaOngkirRouters);
router.use("/product", productRouters);

module.exports = router