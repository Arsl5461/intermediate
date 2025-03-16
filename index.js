
import { msg } from './src/message/index.js';
import { database } from './src/config/database.js';
import {config} from 'dotenv';
import  authRouter from './src/routes/auth.routes.js'

import {app} from './app.js'
config()
database()

// app.use('/api/v1','swagger')

app.get('/api/v1',(req,res)=>{
    res.send('Welcome to my API')
})


app.use('/api/v1', authRouter)


 

app.listen(3002,()=>console.log(msg.listen + ' 3002'))