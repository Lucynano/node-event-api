const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    lieu: { type: String, required: true },
    date_debut: { type: String, required: true },
    date_fin: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Event", EventSchema);