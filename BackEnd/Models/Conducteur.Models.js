const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Conducteur = new Schema(
    {
        Matricule : {
            type : String,
            required : true,
            trim : true,
        },
        Nom : {
            type : String,
            required : true,
            trim : true,
        },
        Telephone : {
            type : String,
            required : true,
            trim : true,
        },
        Email : {
            type : String,
            required : true,
            trim : true,
        },
        Nombre_de_Point : {
            type : String,
            required : true,
            trim : true,
        },
        validation : {
            type : Boolean,
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

const ConducteurList = mongoose.model("Conducteur",Conducteur);
module.exports = ConducteurList;