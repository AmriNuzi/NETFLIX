const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");
const List = require("../models/List");

//Create

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try{
            const savedMovie = await newMovie.save();
            if (req.body.list) {
              
              const list = await List.findById(req.body.list);
              const content = list.content;
              content.push(savedMovie.id);
              const doc = await List.findByIdAndUpdate(req.body.list, { content: content }, { new: true }) 
            }
            res.status(201).json(savedMovie);
        }catch(err){
          console.log(err);
          res.status(500).json(err);
        }
    } else {
    res.status(403).json("You are not allowed movie!");
  }
});


//Update
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {  
          try{
              const updateMovie = await newMovie.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
              );
              res.status(200).json(updateMovie);
          }catch(err){
              res.status(500).json(err);
          }
      } else {
      res.status(403).json("You are not allowed movie!");
    }
  });



//Delete

router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {  
          try{
                await Movie.findByIdAndDelete(req.params.id);
              res.status(200).json("the movie has been deleted...");
          }catch(err){
              res.status(500).json(err);
          }
      } else {
      res.status(403).json("You are not allowed movie!");
    }
  });


  router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//Get All

router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {  
          try{
               const movies= await Movie.find();
              res.status(200).json(movies.reverse());
          }catch(err){
              res.status(500).json(err);
          }
      } else {
      res.status(403).json("You are not allowed !");
    }
  });

  
//Get
router.get("/:id", verify, async (req, res) =>{
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err){ 
        res.status(500).json(err);
    }
});


module.exports = router;