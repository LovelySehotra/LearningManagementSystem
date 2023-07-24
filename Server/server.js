// const express = require('express');
// const app = express();
const app = require('./app');

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server is listen at PORT ${PORT}`);
});
