import mongoose from "mongoose";

mongoose.set('strictQuery',false);//Dont give error incase extra passed detail in notfound  

const connectionToDB = async()=>{
    try{
        const {connection }=await mongoose.connect(
            process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms'
        );
        if(connection){
            console.log(`Connected to MongoDb:${connection.host}`);
        }
    }catch(e){
        console.log(e);
        process.exit(1);//terminate the server because database is not connect
    }
}
export default connectionToDB;