const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv")
const connectDB = require("./config/database") 

const app = express();
dotenv.config();

app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/event", require("./routes/event.routes"))
app.use("/user", require("./routes/user.routes"))

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server is running with port " + process.env.PORT);
    });
})

