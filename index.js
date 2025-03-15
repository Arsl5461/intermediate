
import { msg } from './src/message/index.js';
import { database } from './src/config/database.js';
import {config} from 'dotenv';

import {app} from './app.js'
config()
database()

// app.use('/api/v1','swagger')

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(3002,()=>console.log(msg.listen + ' 3002'))