const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Admin = new Schema(
    {
        Login : {
            type : String,
            required : true,
            trim : true,
        },
        Password : {
            type : String,
            required : true,
            trim : true,
        },
        role : {
            type : String,
            required : true,
            trim : true,
        }
    },
    {
        versionKey : false
    }
);

const adminList = mongoose.model("Admin",Admin);
module.exports = adminList;