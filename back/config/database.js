const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected")
    } catch(err) {
        console.error("Erreur server " + err.message);
    }
}

module.exports = connectDB; 