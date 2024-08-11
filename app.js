const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const adminModel = require("./models/admin")
const peopleModel = require("./models/people")

let app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Nevin:nevintensonk@cluster0.0rfrr.mongodb.net/rescueapp?retryWrites=true&w=majority&appName=Cluster0")

app.post("/Add",async(req,res)=>{
    let input = req.body
    let token = req.headers.token
    jwt.verify(token,"WayanadApp",async(error,decoded)=>{
        if(decoded){
            console.log(input)
            let result = new peopleModel(input)
            await result.save()
            res.json({"Status":"Success"})
        }else{
            res.json({"Status":"Invalid authentication"})
        }
    })
})

app.post("/AdminSignIn",async(req,res)=>{
    let input=req.body
    let result=adminModel.find({username:input.username}).then(
        (items)=>{
            if (items.length>0){
                const passwordValidator=bcrypt.compareSync(input.password,items[0].password)
                if (passwordValidator){
                    jwt.sign({username:input.username},"WayanadApp",{expiresIn:"1d"},(error,token)=>{
                        if(error){
                            res.json({"Status":"Error","Error":error})
                        }else{
                            console.log(input)
                            res.json({"Status":"Success","token":token,"userId":items[0]._id})
                        }
                    })
                }else{
                    res.json({"Status":"Incorrect password"})
                }
            }else{
                res.json({"Status":"Invalid username"})
            }
        }
    ).catch(
        (error)=>{
            res.json({"Status":"Error"})
        }
    )
})


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