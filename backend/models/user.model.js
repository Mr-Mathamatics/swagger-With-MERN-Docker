const mongoose=require('mongoose');


const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,        
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("Users", userSchema)

module.exports = User;