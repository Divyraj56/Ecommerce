const userModel = require('../models/userModel');
var bcrypt = require('bcryptjs');

async function userSignUpController(req,res){
    try{
        const { email , password, name} = req.body

        console.log("req.body" , req.body);
        const user = await userModel.findOne({email})

        if(user){
            throw new Error("Already user Exist!");
        }

        if(!email){
                throw new Error("Please provide a valid email")
        }if(!password){
                    throw new Error("Please provide a valid password")
        }if(!name){
            throw new Error("Please provide a valid name")
        }

        var salt = bcrypt.genSaltSync(10);
        var hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong with the password (encrypted)")
        }

        const payload = {
            ...req.body,
            password :  hashPassword,
        }


        const userData = new userModel(payload);
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success: true,
            error: false,
            message: "User created successfully",
        })

    }catch(err){
        console.log(err.message);
        res.json({
            message : err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController;