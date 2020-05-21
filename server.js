const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const mongoose = require ("mongoose"); 
app.use(cors());
app.use ( express.json()); //beginning point
app.use ( express.urlencoded({ extended:true }));//beginning point

//connect database
require("./server/config/database.config")
//CRUD functions(controllers) && Route
require("./server/routes/joke.routes")(app)


app.listen(port,()=> console.log(`runing backend at port ${port}`))// end point




