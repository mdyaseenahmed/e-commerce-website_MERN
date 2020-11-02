const express = require("express");
const router = express.Router();

const { makePayment } = require("../controllers/srtipePayment");

router.post("/stripepayment", makePayment);

module.exports = router;
