const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log('Connected to database');
        });
    } catch (err) {
        console.log(`Error occured while connecting to database : ${err}`);
    }
}

module.exports = connectDatabase;