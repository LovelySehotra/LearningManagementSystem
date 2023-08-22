import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
const userSchema = new Schema({

    fullName: {
        type: 'String',
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be at least 5 character'],
        maxLength: [50, 'Name should be less than 50 character'],
        lowercase: true,
        trim: true
    },
    email: {
        type: 'String',
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please filll in a valid email address']
    },
    password: {
        type: 'String',
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at 8 character'],
        select: false   // dont send by default password.
    },
    avatar: {
        public_id: {
            type: 'String',
        },
        secure_url: {
            type: 'String'
        }
    },
    role: {
        type: 'String',
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription: {
        id: String,
        status: String
    }
},
    {
        timestanps: true
    });
// encrypt the password 
//  'pre' is used for: before save the user 

userSchema.pre('save', async function (next) {
    // if password is not modified return next.
    if (!this.isModified('password')) {
        return next();
    }
    // if modified then encypt and add random character
    this.password = await bcrypt.hash(this.password, 10);

})

userSchema.methods = {
    generateJWTToken: async function () {
        return await jwt.sign(
            { id: this._id, email: this.email, subscription: this.subscription, role: this.role },
            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        )
    },
    comparePassword: async function (plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    },
    generatePasswordResetToekn: async function () {
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 100; //15 min from now
        return resetToken;
    }
}
const User = model('User', userSchema);//collection name in database is User
export default User;