import mongoose from 'mongoose'



const notificationSchema = mongoose.Schema({
    userId: String,
    subscribe:{
        type:Boolean,
        default:true
    },
    comments_like:{
        type:Boolean,
        default:true
    },
    email:{
        type:Boolean,
        default:true
    },
    event:{
        type:Boolean,
        default:true
    },
    birth_date:{
        type:Boolean,
        default:true
    },

   
    createAt:{
        type:Date,
    },
    updateAt:{
        type:Date,
    }

})


export default  mongoose.model('Notification', notificationSchema);




