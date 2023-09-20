import cookieParser from 'cookie-parser';
config();
import express from 'express';
import {config} from 'dotenv';
import cors from'cors';
import morgan from 'morgan';
import userRoutes from './routes/user.routrs.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();
app.use(express.json());//parse the body
app.use(express.urlencoded({extended:true}));
app.use(cors({
origin:[process.env.FRONTEND_URL],
credentials:true
}));
app.use(morgan('dev'));// it is used to see in terminal thsat what  user access.
app.use(cookieParser());//The token stored in cookie are parsed



app.use('/ping',function(req,res){
    res.send('/pong');
});
//routes of 3 modules 
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/courses',courseRoutes);
app.use('/api/v1/payments',paymentRoutes);
app.all('*',(req,res)=>{  // for any random url that are not defined.
    res.status(404).send(`OOPS!! 404 page not found`);
});
app.use(errorMiddleware);
export default app;


//  multer is for converting binary into image