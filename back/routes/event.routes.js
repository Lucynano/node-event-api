const express = require("express")
const { createEvent, getAllEvent, getEventById, updateEvent, deleteEvent } = require("../controller/event.controller")
const upload = require("../middleware/upload")

const router = express.Router()

router.post("/", upload.single("image"), createEvent)
router.get("/", getAllEvent)
router.get("/:id", getEventById)
router.put("/:id", updateEvent)
router.delete("/:id", deleteEvent)

module.exports = router