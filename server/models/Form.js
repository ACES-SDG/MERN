const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    }

});
const Form = mongoose.model("Form",FormSchema);
module.exports = Form;