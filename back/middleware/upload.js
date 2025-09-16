const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+path.extname(file.originalname)) // 471947546125321.jpg pour que l image n ait pas de doublon
    }
})

const upload = multer({ storage: storage })

module.exports = upload