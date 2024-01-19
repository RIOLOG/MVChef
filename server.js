const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');




//dotenv configure:
dotenv.config();


//DB CONEECTION:
connectDb();



//rest orject
const app = express();




//MIDDLEWARE:
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));




//using all routes defined in routes folder seprately to main file:
app.use('/api/v1/test', require("./routes/testRoute"));
app.use('/api/v1/auth', require("./routes/authRoutes"));
app.use('/api/v1/user', require("./routes/userRoute"));
app.use('/api/v1/resturant', require('./routes/resturantRoute'))




//routes:
app.get("/", (req, res) => {
    res.status(200).send("Ankit Singh");
})




//API  PORT:
// const PORT = 8080;
const PORT = process.env.PORT || 8001;


//API LISTENING
app.listen(PORT, () => {
    console.log("API RUNNING".bgMagenta);
});