const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')



//GET USER INFO:
const getUserController = async(req, res) => {
    // res.status(200).send("User Data");
    // console.log(req.body.id);

    try
    {
        //finding user
        const user = await userModel.findById({_id:req.body.id})

        //validations:
        if (!user)
        {
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }

        //find the user:
        res.status(200).send({
            success:true,
            message:"User Get Successfully",
            user
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in GET USER API",
            err
        })
    }


}



//UPDATE USER INFO:
const updateUserController = async(req, res) => {
    try
    {
        //finding user:
        const user = await userModel.findById({_id:req.body.id});

        //validation:
        if (!user)
        {
            return res.status(404).send({
                success:true,
                message:"User not Found"
            })
        }

        //user found and now update 
        const {userName, address, phone} = req.body;

        //updation:
        if (userName) user.userName = userName
        if (address) user.address = address
        if (phone) user.phone = phone

        //save
        await user.save();
        res.status(200).send({
            success: true,
            message:"user updatd successfully"
        })
    }

    catch(err)
    {
        console.log("Update user API", err);
        res.status(500).send({
            success:true,
            message:"Error in Update user API",
            err
        })
    }
};



//UPDATE USER PASSWORD:
const updatePasswordController = async(req, res) => {
    try {

        //find user
        const user = await userModel.findById({ _id: req.body.id });
        
        //valdiation
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Usre Not Found",
          });
        }


        // get data from user
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
          return res.status(500).send({
            success: false,
            message: "Please Provide Old or New PasswOrd",
          });
        }


        //check user password  | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(500).send({
            success: false,
            message: "Invalid old password",
          });
        }


        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
          success: true,
          message: "Password Updated!",
        });
      } 
      
      catch (error) 
      {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In Password Update API",
          error,
        });
      }
    }




//RESET USER PASSWORD:
const resetPasswordController = async(req, res) => {
    try
    {
        //getting user 
        const {email, newPassword, answer} = req.body;
        if (!email || !newPassword || !answer)
        {
            return res.status(500).send({
                success:false,
                message:"Pleaase provide all fields"
            })
        }

        //finding the user:
        const user = await userModel.findOne({email, answer})
        
        if (!user)
        {
            return res.status(500).send({
                success:false,
                message:"User not found"
            })
        }

        //updating now password:
        var salt = bcrypt.genSaltSync(8);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success:true,
            message:"Password Changed Successfully"
        })

    }

    catch(err)
    {
        console.log(err);
        res.status(500).send({
            success:true,
            message:"Error in rest pass API",
            err
        })
    }
};



//DELTE USER OF ID:
const deleteProfileController = async(req, res) => {
    try
    {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"Your Accoount has Been Delete"
        });
    }
    
    catch(err)
    {
        console.log(err);
        res.status(500).send({
            success:false,
            message:"ERROR IN DELETE API",
            err
        })
    }
};


//EXPORT
module.exports = {getUserController, 
                updateUserController, 
                updatePasswordController, 
                resetPasswordController,
                deleteProfileController};