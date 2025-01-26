import mongoose  from "mongoose";
import  bcrypt from 'bcrypt'

const userSchema= new mongoose.Schema({
    fullName: {
      type: String,
      required: [true, 'Username is required'],
     trim:true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Ensure email is unique
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Email regex
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'], // Minimum length
    },
    profilePic: {
      type: String, // Store the URL of the profile picture
      default: 'https://via.placeholder.com/150', // Default placeholder image
    },
  },
  {
    timestamps: true, // Automatically create `createdAt` and `updatedAt` fields
  })
  userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){

        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
     })

     userSchema.methods.matchPasswords = async function (enterPassword){
        return await bcrypt.compare(enterPassword,this.password)
     }
  const User = mongoose.model('User',userSchema)
  export default User