import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import { razorpay } from "../server.js"
import Payment from "../models/payment.model.js"
import crypto from 'crypto'

export const getRazorpayApiKey = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "Razorpay API key",
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (e) {
        return next(new AppError(e.message, 501));
    }
};
export const buySubscription = async (req, res, next) => {
    try {
       

        const  id  = req.user.id;
        // console.log(req.user.id)
        const user = await User.findById(id);

        if (!user) {
            return next(new AppError("Unauthorized, please login"));
        }
        if (user.role === "ADMIN") {
            return next(new AppError("Admin cannot purchase a subscription", 400));
        }
         
          if (!razorpay || !razorpay.subscriptions) {
            // console.log("here")
            
            return next(new AppError("Razorpay SDK or subscription object is not properly initialized.", 500));
        }
        // console.log("here2")
        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 12
        });
        // console.log("here3")
        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;
        // console.log("here4")
        await user.save();
            
        res.status(200).json({
            success: true,
            message: "Subscribed Successfully",
            subscription_id: subscription.id,
        });
    } catch (e) {
        // console.log("here6")
        return next(new AppError(e.message, 500));
    }
};
export const verifySubscription = async (req, res, next) => {
    try {
       
        const { id } = req.user;
        const {
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id,
        } = req.body;
      
        const user = await User.findById(id);
        // console.log("1")
        if (!user) {
            // console.log("2")
            return next(new AppError("Unauthorized, please login"));
        }
        const subscriptionId = user.subscription.id;
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id}|${subscriptionId}`)
            .digest("hex");

        if (generatedSignature != razorpay_signature) {
            return next(new AppError("Payment not verified, please try again", 500));
        }
        await Payment.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id,
        });

        user.subscription.status = "active";
        await user.save();

        res.status(200).json({
            success: true,
            message: "Payment verified successfully!",
        });

    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};
export const cancelSubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        // console.log("1")
        const user = await User.findById(id);
        if (!user) {
            return next(new AppError("Unauthorized, please login"));
        }
        // console.log("2")
        if (user.role === "ADMIN") {
            return next(new AppError("Admin cannot purchase a subscription", 400));
        }
        // console.log("3")
        const subscriptionId = user.subscription.id;
        // console.log(subscriptionId )
        const subscription = await razorpay.subscriptions.cancel(subscriptionId);
        console.log("3")
        user.subscription.status = subscription.status;
        console.log(user.subscription.status)
        await user.save();
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};

export const allPayments = async (req, res, next) => {
    try {
        const { count } = req.query;

        const subscriptions = await razorpay.subscriptions.all({
            count: count || 10,
        });
    
        res.status(200).json({
            success: true,
            message: 'All payments',
            subscriptions
        })
    } catch (e) {
    return next(new AppError(e.message, 500));
  }
   
};
