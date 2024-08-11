const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

let app = express()
app.use(express.json())
app.use(cors())














app.listen(8001, () => {
    console.log("Server Started")
})