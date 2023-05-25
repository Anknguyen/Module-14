const router = require("express").Router();
const { pics } = require("../../models");

// /api/post/

router.get("/all", async (req, res) => {
  console.log("Get all post: ");
  try {
    const pictData = await pics.get();
    console.log(pictData);
    res.send(pictData);

  } catch (err) {
    console.log("Here is catch err", err)
    res.status(500).json(err);
  }
  res.send(req.body);
  // res.status(200);
});


router.post("/create", async (req, res) => {
  console.log("create route was hit: " + req.body.newPost);

  try {
    const pictData = await pics.create({
      email: req.session.userEmail,
      post: req.body.newPost,
      vote: 0,
    });
  } catch (err) {
    console.log("Here is catch err", err)
    res.status(500).json(err);
  }
  res.send(req.body);
});

router.post("/vote", async (req, res) => {
	try {
	  pics.findOne({
		where: { post: req.body.post }
	  }).then( p => {
		  if (p) {
			return p.update(
			  { vote: p.vote + 1 },
			  { where: { post: req.body.post }}
			).then( r => {
			  console.log(r)
			  res.status(200).json({ message: "Updated ", r });
			}).catch(err => {
			  res.status(500).json(err);
			})
		  } else {
			console.error('Error : Post = [' + post + '] does not exist !');
			res.status(400).json({ message: 'Error : Post = [' + post + '] does not exist !' });
		  }
	  }).catch(err => {
		res.status(500).json(err);
	  });
	} catch (err) {
	  res.status(500).json(err);
	}
  });

module.exports = router;

// adding data with post/put/patch/delete

// logged_in becomes its own variable
