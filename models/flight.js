const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/,
  },
  price: {
    type: Number,
    min: 0,
  },
  flight: {
    type: mongoose.Types.ObjectId,
    ref: "Flight",
  },
});

const flightSchema = new Schema(
  {
    airline: {
      type: String,
      enum: ["American", "Southwest", "United"],
    },
    airport: {
      type: String,
      enum: ["aus", "dfw", "den", "lax", "san"],
    },
    flightNo: {
      type: Number,
      min: 10,
      max: 9999,
      required: true,
    },
    departs: {
      type: Date,
      default: function () {
        const date = new Date();
        const yearAhead = date.getFullYear() + 1;
        date.setFullYear(yearAhead);
        return date;
      },
    },

    tickets: [ticketSchema],
    destination: [
      {
        type: Schema.Types.ObjectId,
        ref: "Destination",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);
