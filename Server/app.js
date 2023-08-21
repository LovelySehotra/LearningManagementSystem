import express from 'express';
import cors from'cors';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
import morgan from 'morgan';
import userRoutes from './routes/user.routrs.js';
import courseRoutes from './routes/course.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';
config();
const app = express();
app.use(express.json());//parse the body
app.use(cors({
origin:[process.env.FRONTEND_URL],
credential:true
}));
app.use(cookieParser());//used to parse the token in cookie
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));// it is used to see in terminal thsat what  user access.

app.use('/ping',function(req,res){
    res.send('/pong');
});
//routes of 3 modules 
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/courses',courseRoutes);
app.all('*',(req,res)=>{  // for any random url that are not defined.
    res.status(404).send(`OOPS!! 404 page not found`);
});
app.use(errorMiddleware);
export default app;


//  multer is for converting binary into image