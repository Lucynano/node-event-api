const Event = require("../model/events.model");

// creation, getAll, getALLBYID, delete, update

const createEvent = async (req, res) => {
    // req: body{titre, date_debut, date_fin}

    // const { titre, lieu, date_debut } = req.body
    try {
        const saveEvent = await Event.create({
            ...req.body
        }) 
        // await res.save(saveEvent)
        return res.status(201).json({ saveEvent });
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

const getAllEvent = async (req, res) => {
    try {
        const event = await Event.find();
        return res.status(201).json({ event })
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        return res.status(201).json({ event });
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

const updateEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const exists = await Event.findById(id);
        if(!exists) return res.status(404).json({ message: "Event not found" });

        const saveEvent = await Event.findByIdAndUpdate(id, 
            { ...req.body },
            { new: true } 
        )

        return res.status(201).json({ saveEvent });
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const exists = await Event.findById(id);
        if(!exists) return res.status(404).json({ message: "Event not found" })

        const delEvent = await Event.findByIdAndDelete(id);
        return res.status(201).json({ delEvent });
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    createEvent, 
    getAllEvent,
    getEventById,
    updateEvent,
    deleteEvent,
}