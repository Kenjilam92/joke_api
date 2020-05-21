const Joke = require("../models/joke.model") //link with data structure (model)

module.exports = {   
  showAll: (req,res)=>{
    console.log("show All")
    Joke.find()
    .then(data=> res.json({number_of_jokes: data.length ,jokes: data}))
    .catch(err => res.json(err))
  }
  ,
  findById: (req,res)=>{
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
  }
  ,
  create: (req,res) => {
    Joke.create(req.body)
    .then(data=>{ 
        res.json({status: "new jokes created",data});
        console.log("backend - new joke was created")
    })
    .catch(err => res.json(err));
  }
  ,
  edit: (req,res)=>{
    console.log("update")
    Joke.findOneAndUpdate({_id:req.params.id}, req.body)
    .then(data=>res.json({
                            status: "updated a data",
                            old_value: data,
                            note: "you might need to copy the old value! Just in case!"
                        }))
    .catch(err=>res.json(err));
  }
  ,
  delete: (req,res)=>{
    Joke.findOneAndRemove({_id:req.params.id})
    .then(data=>res.json({
                        status: "a data was deleted",
                        old_value: data,
                        note: "you might need to copy the old value! Just in case!"
                    }))
    .catch(err=>res.json(err));
  }
}