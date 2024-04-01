const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const destinationSchema = new Schema({
    airport: {
        type: String, 
        enum: ['aus', 'dfw', 'den', 'lax', 'san']
    },
    arrival: {
        type: Date,
        default: function() {
            const date = new Date();
            const yearAhead = date.getFullYear() + 1;
            date.setFullYear(yearAhead);
            return date
        },
    }
});

module.exports = mongoose.model('Destination', destinationSchema);