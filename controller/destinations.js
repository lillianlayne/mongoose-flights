const Destination = require('../models/destination');
const Flight = require('../models/flight');


const newAirport = async (req, res) => {
    const airport = await Destination.find({});
    res.render('airports/new', {airport})
}


const create = async (req, res) => {
    const destination = await Destination.create(req.body);
  

    try {
        res.redirect('/airports/new')
    } catch (err) {
        console.log(err)
    }
}

const addDest = async (req, res) => {
    const flight = await Flight.findById(req.params.id);
   
   try {
       flight.destination.push(req.body.destinationId);
       await flight.save();
       res.redirect(`/flights/${flight._id}`);

   } catch (err) {
    console.log(err)
   }

}

module.exports = {
    addDest,
    new: newAirport, 
    create
}