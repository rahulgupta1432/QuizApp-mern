import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    topics:{
        type:[String],
        default:[]
    },
    scores:{
        type:[Object],
        default:[]
    },
    // image:{
    //     type:String,
    //     default:"https://avatar.iran.liara.run/public"
    // },
    tokenVersion:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});

// make pre middleware for hashed pwd
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
});

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
};
const User=mongoose.model("User",userSchema)
export default User;