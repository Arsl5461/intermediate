import mongoose from "mongoose";

export const database = async () => {

    try {
        console.log('top')
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/daa', {})
        console.log('after')
            console.log('database connection sucess', connection)

    } catch (error) {
        console.log(error.message)
    }

}
