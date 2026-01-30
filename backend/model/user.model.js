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

authSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next(); 
    }
    
    bcrypt.hash(this.password, 12, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next(); 
    });
});

export const UserModel = mongoose.model('user', authSchema)
