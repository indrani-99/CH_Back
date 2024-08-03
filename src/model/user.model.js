const mongoose=require('mongoose');

const visitorSchema=mongoose.Schema({
    email:{type:String},
    username:{type:String},
    password:{type:String},
    favourite:{type:Array, default:[]},
    searchHistory:{type:Array, default:[]}
}, {versionKey:false})

const VisitorModel=mongoose.model('User',visitorSchema );

module.exports={VisitorModel};
