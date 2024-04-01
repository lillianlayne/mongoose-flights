const Flight = require("../models/flight");
const Destination = require("../models/destination");

const index = async (req, res) => {
  const flights = await Flight.find({}).sort({departs:1}).populate("destination");


  // functiions to show date as 00/00/00000
  const getDate = (arg) => {
    let array = new Date(arg);
    const month = array.getMonth();
    const day = array.getDay();
    const year = array.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const getTime = (arg) => {
    let array = new Date(arg);
    const hour = array.getHours();
    let min = array.getMinutes();
  
    if (min <= 10) {
      min += 10;
    }
    return `${hour}:${min}`;
  };
  try {
    res.render("flights/index", {
      flights,
      getDate,
      getTime,
    });
  } catch (err) {
    console.log(err);
  }
};

const newFlight = async (req, res) => {
  const newFlight = new Flight();
  const date = newFlight.departs;
  const departDefault = date.toISOString().slice(0, 16);

  res.render("flights/new", {
    departDefault,
  });
};

const create = async (req, res) => {
  try {
    await Flight.create(req.body);
    res.redirect("/flights");
  } catch (err) {
    console.log(err);
    res.render("flights/new");
  }
};

const show = async (req, res) => {
  const flight = await Flight.findById(req.params.id).populate("destination");

  const destination = await Destination.find({
    _id: { $nin: flight.destination },
  });


  // switch case to show full location 
  const getAirport = (airCode) => {
    let airport;
    switch (airCode) {
      case "den":
        airport = "Denver, Colorado";
        break;
      case "lax":
        airport = "Los Angeles, California";
        break;
      case "aus":
        airport = "Austin, Texas";
        break;
      case "dfw":
        airport = "Dallas, Texas";
        break;
      case "san":
        airport = "San Fransisco, California";
        break;
    }

    return airport;
  };


  const getDate = (arg) => {
    let array = new Date(arg);
    const month = array.getMonth();
    const day = array.getDay();
    const year = array.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const getTime = (arg) => {
    let array = new Date(arg);
    const hour = array.getHours();
    const min = array.getMinutes();
    return `${hour}:${min}`;
  };

  res.render("flights/show", {
    flight,
    destination,
    getAirport,
    getDate,
    getTime,
  });
};

const addTix = async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  flight.tickets.push(req.body);

  try {
    await flight.save();
  } catch (err) {
    console.log(err);
  }

  res.redirect(`/flights/${flight._id}`);
};

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  addTix,
};
