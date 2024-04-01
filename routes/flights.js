var express = require('express');
var router = express.Router();

const flightsCtrl = require('../controller/flights');


// GET /flights : renders out homepage
router.get('/', flightsCtrl.index)
// GET /flights/new : go to create new flight page
router.get('/new', flightsCtrl.new)
// POST /flights : add flight to database
router.post('/', flightsCtrl.create)
// GET /flights/:id : view individual flight details
router.get('/:id', flightsCtrl.show)
// POST /flights/:id/tickets : add a ticket 
router.post('/:id/tickets', flightsCtrl.addTix)


module.exports = router;
