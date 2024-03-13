const express=require('express');
const app=express();
const cors=require('cors')
app.use(cors())
app.use(express.json())
const userRouter=require('./routes/user');
const swagger = require('./utils/swagger');
const connect = require('./database/connect');

app.use('/api/users',userRouter)
swagger(app)
app.listen(5000,()=>{
    console.log('server listening on port 5000')
    
    // db conect
    connect();
})