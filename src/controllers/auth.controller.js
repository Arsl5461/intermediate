import Users from "../model/userSchema.js";


export const reg = async(req,res)=>{
    try {
        const{ name,email,password,role } = req.body;

        if(!name || !email || !password || !role){
            return res.status(400).json({ status:false, msg:"Please fill in all fields"});
        }

        const user = await Users.findOne({email:email})

        if(user){
            return res.status(400).json({status:false, message:"User already exists"})
        }

        const newUser = new Users({
            name,
            email,
            password,
            role,
            createdAt: new Date(),
        })

        await newUser.save()

        res.status(200).json({status:true,  message:"User created successfully"})


    } catch (error) {
        res.status(500).json({status:false, message: "Error creating user", error:error.message})
    }
}