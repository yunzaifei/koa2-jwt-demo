const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    app_key: {
        type: String,
        required: true
    },
    app_secret: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    update_at: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.statics.findByName = function(userName, cb){
    return this.find({user_name: userName}, cb)
}

const User = mongoose.model('User', UserSchema)

module.exports = User