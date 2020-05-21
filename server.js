const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const mongoose = require ("mongoose"); 
app.use ( express.json()); //beginning point
app.use ( express.urlencoded({ extended:true }));//beginning point

//structuring model
const JokeSchema = new mongoose.Schema({
  "setup": {  type: String ,
              required: [true,"setup field cannot be emty"]
  },
  "punchline" : { type: String,
                  required: [true,"punchline field cannot be emty"]  
  }
},{timestamps: true});//define structure

const Joke = mongoose.model("joke", JokeSchema) //define the name of the table in database.

//connect database
mongoose.connect ('mongodb://localhost/joke_api',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})  .then(()=> console.log("database connected"))
    .catch(err=>console.log('failed to connect database', err));

//CRUD functions(controllers) && Route
app.get ("/api/jokes",(req,res)=>{
  Joke.find()
      .then(data=> res.json({number_of_jokes: data.length ,jokes: data}))
      .catch(err => res.json(err))
});
app.get ("/api/jokes/:id",(req,res)=>{
  req.params.id==="random"?
  Joke.find()
      .then(data=> {
          let random = Math.floor(Math.random() * data.length);
          const selected_joke = data[random]
          res.json(selected_joke)
      })
      .catch(err=> res.json(err))
  :
  Joke.findOne({_id: req.params.id})
      .then(data=>res.json(data))
      .catch(err => res.json(err))
})

app.post ("/api/jokes/new", (req,res) => {
  Joke.create(req.body)
      .then(data=>{ 
          res.json({status: "new jokes created",data});
          console.log("backend - new joke was created")
      })
      .catch(err => res.json(err));
})
app.put ("/api/jokes/update/:id", (req,res)=>{
  console.log("update")
  Joke.findOneAndUpdate({_id:req.params.id}, req.body)
      .then(data=>res.json({
                              status: "updated a data",
                              old_value: data,
                              note: "you might need to copy the old value! Just in case!"
                          }))
      .catch(err=>res.json(err));
});

app.delete ("/api/jokes/delete/:id",(req,res)=>{
  Joke.findOneAndRemove({_id:req.params.id})
      .then(data=>res.json({
                          status: "a data was deleted",
                          old_value: data,
                          note: "you might need to copy the old value! Just in case!"
                      }))
      .catch(err=>res.json(err));
});



app.listen(port,()=> console.log(`runing backend at port ${port}`))// end point




