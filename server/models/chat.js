const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const chatSchema = new Schema({
    ip :{
        type : String
    },
    Prompt : {
        type : String 
    },
    response :{
        type:String,
        default : 'Waiting...'
    },
    createdAt:{
        type:Date,
        default :Date.now 
    },
    updatedAt:{
        type:Date,
        default :Date.now 
    }

})

module.exports = mongoose.model('Chat',chatSchema)

