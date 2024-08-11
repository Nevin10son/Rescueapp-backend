const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const adminModel = require("./models/admin")

let app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Nevin:nevintensonk@cluster0.0rfrr.mongodb.net/rescueapp?retryWrites=true&w=majority&appName=Cluster0")

app.post("/AdminSignUp", async (req, res) => {
    let input = req.body
    let hashedPassword = bcrypt.hashSync(input.password, 10)
    input.password = hashedPassword
    adminModel.find({username: input.username}).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "Status": "Username already exists" })
            } else {
                console.log(input)
                let result = new adminModel(input)
                result.save()
                res.json({ "Status": "Success" })
            }
        }
    ).catch(
        (error)=>{
            res.json({"Status":"Error"})
        }
    )
})











app.listen(8001, () => {
    console.log("Server Started")
})