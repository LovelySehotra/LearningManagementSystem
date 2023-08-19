import { send } from "process";
import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from 'fs/promises'
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';
const cookieOption = {
    maxAge:7 * 24 * 60 *60 *1000,// 7days,
    httpOnly :true,
    secure:true
}

const register = async (req,res,next)=>{
    const {fullname,email,password}=req.body;
    if(!fullname || !email || !password)
    {
        return next(new AppError('All fields are required',400));
    }
    // check user exit by using email.
    const userExists = await User.finsdOne({email});
    if(userExists){
        return next(new AppError('Email already exists',400));
    }
    //create user 
    const user = await User.create({
        fullname,
        email,
        password,
        avatar:{
            public_id:email,
            // secure_url:
        }
    });
    // check user is stored or not
    if(!user){
        return next (new AppError('User registration failed,please try again'));
    }
    // TODO FILE upload
    if(req.file)
    {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                width:250,
                height:250,
                gravity:'faces',
                crop:'fill'
            });
            if(result){
                user.avatar.public_id=result.public_id;
                user.avatar.secure_url=result.secure_url;

                // remove file from server
                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (e) {
            return next(
                new AppError(error || 'File not uplades,please try again',500)
            )
        }
    }

    //  after  create the user save it
    await user.save();
    user.password = undefined; // dont want send what password had user setup.

    // after register auto login the user 
    // step 1 : generate JWT token 
    const token = await user.generateJWTToken(); // ->define in user.model,js
   // step 2: set toekn in cookies
    res.cookie('token',token,cookieOption)
    res.status(201).json({
        success:true,
        message:'User registered successfully',
        user
})

};
const login =async (req,res)=>{
    try {
        const{email,password} = req.body;
    if(!email || !password)
    {
        return next(new AppError('All fields are required',400));
    }
    const user = await User.findOne({
        email
    }).select('+password');   // explicity getting the password
    if(!user || !user.comparePassword(password))
    {
        return next(new AppError('Email or password does not exist',400));
    }
    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie('token',token,cookieOption);

    res.status(200).json({
        success:true,
        message:'User loggedin successfully',
        user,
    });
    } catch (e) {
        return next(new AppError(e.message,500));
    }

};
const logout =(req,res)=>{
    // delete cookie for logout
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:'User logged out successfully'
    })
};
const getProfile =async (req,res)=>{
    try {
        const userId =req.user.id;
        const user = await User.findById(userId);
        res.status(200).json({
            success:true,
            message:'User details',
            user
        });
    } catch (e) {
        return next(new AppError('Failed to fetch profile detail'))
    }
};
// for reset the paasword

//Part 1: email>validatein database>Generate new token>Sendemail with new url containing token + save token with expiry in database
//Part 2: Get token from url query param>verify token in database>Update password in database
const forgotPassword =async (req,res,next)=>{
        const {email}=req.body;//get email

        if(!email){
            return next(new AppError('Email is required'),400);
        }
        const user = await User.findOne({email});
        if(!user){
            return next(new AppError('Email is not  registered'),400);

        }
        //geneate reset password token
        const resetToken = await user.generatePasswordResetToken();
        //save this token in database.
        await user.save();
        // generate the URL which is send to email.
        const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        console.log(resetPasswordURL);
        const subject='Reset Password'
        const message =`reset your password by clicking <a href=${resetPasswordURL} target="_blanck">Reset your Password </a>\n If the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\n If you have not requested this,kindly ignore.`;
        try {
            await sendEmail(email,subject,message);

            res.status(200).json({
                success:true,
                message:`Reset password token has been sent to ${email} successfully`
            })
        } catch (e) {
            
            user.forgotPasswordExpiry=undefined;
            user.forgotPasswordToken=undefined;
            await user.save();
            return next(new AppError(e.message,500));
        }
}
const resetPassword = async(req,res)=>{

    const {resetToken}=req.params;
    const {password}=req.body;
    const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry:{$gt:Date.now()}
    });
    if(!user){
        return next(
            new AppError('Token is invalid or expired ,please try again',400)
        )
    }
    user.password=password;
    user.forgotPasswordExpiry=undefined;
    user.forgotPasswordToken=undefined;
    user.save();
    res.status(200).json({
        success:true,
        message:'password changed successfully!'
    })
}

const changePassword=async(req,res)=>{
    const{oldPassword , newPassword} = req.body;
    const{id} = req.user;
    if(!oldPassword || !newPassword)
    {
        return next(

            new AppError('All fields are mandatory',400)
        )
    }
    const user = await User.findById(id).select('+password');
    if(!user){
        return next(
            new AppError('User does not exist',400)
        )
    }
    const isPasswordValid = await user.comparePassword(oldPassword);
    if(!isPasswordValid)
    {
        return next(
            new AppError('Invalid old Password',400)
        )
    }
    user.password= newPassword;
    await user.save();
    user.password=undefined;
    res.status(200).json({
        success:true,
        message:'Password changed successfully!'
    });

}
export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword
}