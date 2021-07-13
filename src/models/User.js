import mongoose from "mongoose"
import bcrypt from "bcrypt"



const userSchema = new mongoose.Schema({
    emailAddress: {type: String, maxlength:128, required: true, unique:true},
    password: {type: String},
    name: {type: String, required: true},
    avatarUrl: String,
    location: {type: String},
    socialSignUp: {type:Boolean, default:false}
});

userSchema.pre('save', async function (){
    this.password = await bcrypt.hash(this.password, 5);
});


const User = mongoose.model("User", userSchema);
export default User;