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
    gender:{
        type:String,
        default: ""
    },
    phoneNumber: {
        type: Number,
        default: ""
    },
    address:{
        type:Object,
        default:{
            address1: "",
            address2: "",
            zipcode: "",
            city: "",
            state: "",
            country: "",
            phoneNumber: "",
        },
    },
    cart: {
        type: Array,
        default:[]
    },
})

const User = mongoose.models.user || mongoose.model("user", UserSchema);

export default User;