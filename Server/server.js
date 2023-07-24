

import app from './app.js';
import connectionToDB from './config/dbconnection.js';

const PORT =  5000;
app.listen(PORT,async()=>{
    await connectionToDB();
    console.log(`Server is listen at PORT ${PORT}`);
});
