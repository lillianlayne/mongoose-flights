const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log(`connected through ${db.name} at ${db.host}: ${db.port}`)
})