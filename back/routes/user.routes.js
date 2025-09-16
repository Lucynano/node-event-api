const express = require("express")
const { createUser, getAllUser, getUserById, updateUser, deleteUser, register, login } = require("../controller/user.controller")

const router = express.Router()

router.post("/", createUser)
router.get("/", getAllUser)
router.get("/:id", getUserById)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.post("/register", register)
router.post("/login", login)

module.exports = router