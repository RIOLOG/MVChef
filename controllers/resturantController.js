const resturantModel = require("../models/resturantModel");

// CREATE RESTURANT
const createResturantController = async (req, res) => {
    try {
      const {
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
      } = req.body;
      // validation
      if (!title || !coords) {
        return res.status(500).send({
          success: false,
          message: "please provide title and address",
        });
      }
      const newResturant = new resturantModel({
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
      });
  
      await newResturant.save();
  
      res.status(201).send({
        success: true,
        message: "New Resturant Created successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Create Resturant api",
        error,
      });
    }
  };




//GET ALL RESTURNAT :
const getAllResturant = async(req, res) => {
    try
    {
        const resturants = await resturantModel.find({});
        if (!resturants)
        {
            return res.status(404).send({
                success:false,
                message:"Don't have any Resturant",
            })
        }

        res.status(200).send({
            success:true,
            totalCount : resturants.length,
            resturants
        })
    }

    catch(err)
    {
        console.log(err);
        res.status(500).send({
        success: false,
        message: "Error In GET ALL Resturant api",
        err,
      });

    }
}


//GET RESTURANT BY ID:
const getAllResturantbyId = async(req, res) => {
    try
    {
        const resturantid = req.params.id;

        //finding resturnat:
        const resturant = await resturantModel.findById(resturantid)

        if (!resturant)
        {
            return res.status(404).send({
                success:true,
                message:"no resturant found by this ID"
            })
        }

        //mil gya
        res.status(200).send({
            success:true,
            resturant
        })
        
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({
        success: false,
        message: "Error In GET ALL Resturant by Id api",
        err,
        });
    }
}


//DELTE RESTURANT:
const deleteResturantController = async(req, res) => {
    try
    {
        const resturantId = req.params.id;
        if (!resturantId)
        {
            return res.status(404).send({
                success:false,
                message:"Resturnat not Found"  
            })
        }

        await resturantModel.findByIdAndDelete(resturantId)
        res.status(200).send({
            success:true,
            message:"Resturant deleted successfully"
        })
    }

    catch(err)
    {
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in Resturant delete APi",
            err
        })
    }
}
  


//exxport:
module.exports = {createResturantController, getAllResturant,  getAllResturantbyId, deleteResturantController}