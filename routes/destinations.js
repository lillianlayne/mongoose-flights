var express = require("express");
var router = express.Router();

const destinationsCtrl = require("../controller/destinations");

// GET /airports/new
router.get("/airports/new", destinationsCtrl.new);
// POST /airports/new : add to list of airports
router.post("/airports/new", destinationsCtrl.create);
// POST /flights/:id/destionation : add destination to flight
router.post("/flights/:id/destination", destinationsCtrl.addDest);

module.exports = router;
