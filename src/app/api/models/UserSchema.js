import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active:{
        type:Boolean,
        default:true
    },
    type:{
        type:String,
        default:"member"
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: Number,
        default: ""
    },
    address1:{
        type: String,
        default: ""
    },
    address2:{
        type: String,
        default: ""
    },
    zipcode:{
        type: Number,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
})

const User = mongoose.models.user || mongoose.model("user", UserSchema);

export default User;