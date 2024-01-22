const foodModel = require("../models/foodModel");

//CREATE FOOD:
const createFoodController = async(req, res) => {
    try
    {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            resturnat,
            rating,
          } = req.body;

        if (!title || !description || !price)
        {
            return res.status(500).send({
                success:false,
                message:"Please provide all fields"
            });
        }

        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            resturnat,
            rating,
        });

        await newFood.save();
        res.status(201).send({
            success:true,
            message:"New Food Item Created",
            newFood
        });
    }

    catch(err)
    {
        console.log(err),
        res.staus(500).send({
            success:false,
            message:"Error in create food APi",
            err
        })
    }
}



//GET ALLL FOODSSS::
const getAllFooodController = async(req, res) => {
    try
    {
        const food = await foodModel.find({});
        if (!food)
        {
            return res.status(404).send({
                success:false,
                message:"no food items"
            })
        }

        res.status(200).send({
            success:true,
            totalFoods: food.length,
            food
        })
    }

    catch(err)
    {
        console.log(err),
        res.staus(500).send({
            success:false,
            message:"Error in get ALL food APi",
            err
        })
    }
}


//get Single food controler;
const getSingleFoodController = async(req, res) => {
    try
    {
        const foodId = req.param.id;
        const food = await foodModel.findById(foodId);
        if (!food)
        {
            return res.status(404).send({
                success:false,
                message:"No food Found with hits IDS"
            })
        }

        res.status(200).send({
            success:false,
            food
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in GET SINGlE food API",
            err
        })
    }
}


//UPDATE FOOD CONTROLLER:
const foodUpdateController = async(req, res) => {
    try
    {
        const foodId = req.params.id;
        if (!foodId)
        {
            return res.status(404).send({
                success:true,
                message:"no food id was found"
            })
        }

        const food = await foodModel.findByIdAndUpdate(foodId);
        if (!food)
        {
            return res.status(404).send({
                success:true,
                message:"no food found"
            })
        }

        //finalllyyy updatedd...
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            resturnat,
            rating,
        } = req.body;

        const updatedFood = await foodModel.findByIdAndUpdate(foodId, {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            resturnat,
            rating,
        }, {new:true})


        res.status(200).send({
            success:true,
            message:"Food ItemS Updated"
        })
    }

    catch(err)
    {
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in GET SINGlE food API",
            err
        })
    }
}


// DELETE FOOD
const deleteFoodController = async (req, res) => {
try {
    const foodId = req.params.id;
    if (!foodId) {
    return res.status(404).send({
        success: false,
        message: "provide food id",
    });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
    return res.status(404).send({
        success: false,
        message: "No Food Found with id",
    });
    }
    await foodModal.findByIdAndDelete(foodId);
    res.status(200).send({
    success: true,
    message: "Food Item Dleeted ",
    });
} 
catch (error) {
    console.log(error);
    res.status(500).send({
    success: false,
    message: "Eror In Delete Food APi",
    error,
    });
}
};



//export
module.exports = {createFoodController, 
    getAllFooodController, 
    getSingleFoodController,
    foodUpdateController,
    deleteFoodController}
