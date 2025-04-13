import Users from '../model/userSchema.js'
import jwt from 'jsonwebtoken'


export const isAuth = async (req, res, next) => {

    try {
        const token = req?.headers.authorization.split(' ')[1]
        
        if(!token){
            return res.status(401).json({message: 'Access denied'})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        console.log(decoded)

        req.user = await Users.findById(decoded._id)

        next()

    } catch (error) {
        res.json({status:false,message :error})
    }


}