import mongoose from 'mongoose'



const userSchema = mongoose.Schema({
    name:String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['admin','user', 'private'],
    },

    profile_pic:{
        type:String,
        default:'avatar.png'
    },
    education:[
        {
            qlt:String,
            school:String,
            mark:String,
            start:String,
            end:String,
            present:Boolean,
            des:String
        },
    ],
    experience:[{
        company:String,
        position:String,
        start:String,
        end:String,
        present:Boolean,
        des:String,
        year_of_exp:String,
    }],
    skills:[],
    address:{
        street:String,
        city:String,
        state:String,
        zip:String,
        country:String
    },
    phone:Number,
    gender:String,
    dob:String,
    resume:{
        type:String,
        default:'resume.pdf'
    },
    isDelete:{
        type:Boolean,
    },
    agree:{
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


export default  mongoose.model('Users', userSchema);




