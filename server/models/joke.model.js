const mongoose = require ("mongoose");
 
const JokeSchema = new mongoose.Schema({//call all data details also validation in here
  "setup": {  type: String ,
              required: [true,"setup field cannot be emty"]
  },
  "punchline" : { type: String,
                  required: [true,"punchline field cannot be emty"]  
  }
},{timestamps: true});//define structure

const Joke = mongoose.model("joke", JokeSchema) //define the name of the table in database.

module.exports = Joke;