
// GET Meetup list /melistus
router.get("/melistus", (req, res, next) => {
    res.render("/melistus");
  });


// create new MEETUP

  router.get('/meetup/new', function(req, res, next) {
    res.render('meetup/new', {
      title: "Create a New Meet Up"
    });
  
  });
  
  
// POST Update Meetup list  /melistus
  
router.post('/meetup', function(req, res, next) {
    const theNewMeetup = new Meetup ({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
    //revisar en form  location: req.body
    });
  
    theNewMeetup.save ((err) => {
      if (err) {
        res.render('meetup/new', {
          title: "Create a New Meet Up"
        });
      }
      else {
        res.redirect('/meetup');
      }
    })
  });

  // GET Meetup detail (user) /medetus
router.get("/medetus", (req, res, next) => {
    res.render("/medetus");
  });
  
//GET Meetup detail (admin) /medetadm
router.get("/medetadm", (req, res, next) => {
    res.render("/medetadm");
  });
  
  //GET Meetup list (admin) /melistadm
  router.get("/melistadm", (req, res, next) => {
    res.render("/melistadm");
  });
  
  module.exports = router;