const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// REGISTER:
const registerController = async (req, res) => {
    try 
    {
        const { userName, email, password, phone, address, answer } = req.body;

        // Validation:
        if (!userName || !email || !password || !address || !phone || !answer) 
        {
            return res.status(500).send({
                success: false,
                message: "All fields are required",
            });
        }

        // Check users:
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(500).send({
                success: false,
                message: "Email Already Registered",
            });
        }

        //logic for PASSWORD ENCYPTING(HASHING)
        const salt = bcrypt.genSaltSync(8);
        const hashedPass = await bcrypt.hash(password, salt);


        // Create a new user:
        const user = await userModel.create({
            userName: userName,
            email,
            password:hashedPass,
            address,
            phone,
            answer
        });

        res.status(201).send({
            success: true,
            message: "Successfully Registered",
        });
    } 


    catch (err) 
    {
        console.log("REGISTER ERROR", err);
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            err,
        });
    }
};


//LOGIN
const loginController = async (req, res) => {
    try 
    {
        const { email, password } = req.body;

        // Validation:
        if ( !email || !password ) 
        {
            return res.status(500).send({
                success: false,
                message: "All fields are required",
            });
        }

        // Check users:
        const user = await userModel.findOne({ email:email});
        if (!user) 
        {
            return res.status(404).send({
                success: false,
                message: "user not found",
            });
        }


        //compare password logic:
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
        {
            return res.status(500).send({
                success:false,
                message:"INCORRECT PASSOWORD"
            });
        }


        //JSON WEB TOKEN:
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        

        res.status(200).send({
            success: true,
            message: "Successfully LOGIN",
            token
        });
    } 


    catch (err) 
    {
        console.log("LOGIN ERROR", err);
        res.status(500).send({
            success: false,
            message: "Error in LOGIN API",
            err,
        });
    }
}

module.exports = {registerController, loginController};
