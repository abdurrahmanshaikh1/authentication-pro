import mongoose from 'mongoose'
import bcrypt from 'bcrypt'  // CHANGE: tumhara package.json mein 'bcrypt' hai

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
         unique: true,
    },

    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },

     isVerified: { 
        type: Boolean,
        default: false 
    },

    verificationToken:{
        type: String
    } 
}, { timestamps: true })

authSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
});


export const UserModel = mongoose.model('user', authSchema)
