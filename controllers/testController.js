const testUserController = (req, res) => {
    try
    {
        res.status(200).send({
            success:true,
            message:"TEST CONTROLLER USER"
        });
    }
    catch(err)
    {
        console.log("error in testUserController", err);
    }
};



module.exports = {testUserController};