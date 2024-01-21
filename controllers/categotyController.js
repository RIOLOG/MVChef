const categoryModel = require('../models/categoryModel')


//create catregoty:
const createCatController = async(req, res) => {
    try
    {
        const {title, imageUrl} = req.body;

        //validation:
        if (!title)
        {
            return res.status(500).send({
                success:false,
                message:"Please provide all fields"
            })
        }

        //creating category:
        const newCat = new categoryModel({title, imageUrl});
        await newCat.save();

        res.status(201).send({
            success:true,
            message:"new category created",
            newCat
        })
    }

    catch(err)
    {
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in Create CAT API",
            err
        })
    }
}


//GET ALL CATEGORY:
const getCatController = async(req, res) => {
    try
    {
        const allcat = await categoryModel.find({});

        if (!allcat)
        {
            return res.status(404).send({
                success:true,
                message:"No category found"
            })
        }

        res.status(200).send({
            success:true,
            totalCategory: allcat.length,
            allcat
        })
    }

    catch(err)
    {
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in GETALL CAT API",
            err
        })
    }
}


//UPDATE CATEGORY:
const updateCatController = async(req, res) => {
    try
    {
        const {id} = req.params;
        const {title, imageUrl} = req.body;

        const updatedCat = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new:true})

        res.status(200).send({
            success:true,
            message:"updated Category"
        })
        
    }

    catch(err)
    {
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in UPDATE CAT API",
            err
        })
    }
}


//delete CATEGOTY:
const deleteCatController = async(req, res) => {
    try
    {
        const {id} = req.params;

        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"DELETED Category"
        })
        
    }

    catch(err)
    {
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in DELETE CAT API",
            err
        })
    }
}



//export
module.exports = {createCatController, getCatController, updateCatController, deleteCatController}