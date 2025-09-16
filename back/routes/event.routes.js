const express = require("express")
const { createEvent, getAllEvent, getEventById, updateEvent, deleteEvent } = require("../controller/event.controller")

const router = express.Router()

router.post("/", createEvent)
router.get("/", getAllEvent)
router.get("/:id", getEventById)
router.put("/:id", updateEvent)
router.delete("/:id", deleteEvent)

module.exports = router