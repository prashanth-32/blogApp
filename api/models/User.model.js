import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        min:4,
        required:true
    }
});

const user = mongoose.model("User",userSchema);
export default user;