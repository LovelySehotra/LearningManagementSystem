import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken';
const isLoggedIn =async (req,_res,next) =>{
    const { token} = req.cookies;
        // console.log(token);
    if(!token){
        return next(new AppError('Unauthenticated ,please login again',401));
    }

    const userDetails = await jwt.verify(token,process.env.JWT_SECRET);
    req.user = userDetails;
    next();
};
const authorizedRoles = (...roles) => async (req, res, next) => {
    const currentUserRole = req.user.role;
    if (!roles.includes(currentUserRole)) {
        return next(
            new AppError('You do not have permission to access this route', 403)
        )
    }
    next();
};
const authorizeSubscriber = async(req, res, next) => {
    const subsciption = req.user.subsciption;
    const currentUserRole = req.user.role;
    if (currentUserRole !== 'ADMIN' && subsciption.status !== 'active') {
        return next(
            new AppError('Please subscribce to access this route!', 403)
        )
    }

    next();
}

export {
    isLoggedIn,
    authorizedRoles,
    authorizeSubscriber
}