const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        username: {
            type: String,
            required:true
        },
        password: {
            type: String,
            required: true
        }
    }
)

var adminModel = mongoose.model("Admin",schema)
module.exports = adminModel