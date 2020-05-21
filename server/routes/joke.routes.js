const JokeCtrl = require("../controllers/joke.controller") //connect the functions which is comparable with specific routes

module.exports = app => {
  app.get ("/api/jokes",JokeCtrl.showAll);
  app.get ("/api/jokes/:id",JokeCtrl.findById)
  app.post ("/api/jokes/new",JokeCtrl.create)
  app.put ("/api/jokes/update/:id",JokeCtrl.edit);
  app.delete ("/api/jokes/delete/:id",JokeCtrl.delete);
}