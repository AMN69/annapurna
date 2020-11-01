const express = require("express");
const router = express.Router();


// requerimos el middleware
const withAuth = require("../helpers/middleware");

// Meetup model
const Meetup = require("../models/meetup");

// GET Meetup list /melistus
router.get("/melistus:id", async (req, res, next) => {
  const idGroup = req.params.id;
  try {
    let meetupList = await Meetup.find([{idGroup: idGroup}]);
    res.render("auth/melistus", meetupList);
  } catch (error) {
    next(err);
    return;
  }
});

//GET Meetup detail (user) /medetus
router.get("/medetus:id", async (req, res, next) => {
  const idMeetup = req.params.id;
  try {
    let meetupDet = await Meetup.find([{_id: idMeetup}]);
    res.render("auth/medetus", meetupDet);
  } catch (error) {
    
  }
});
  
// POST Update Meetup list  /melistus
// I think it's not necessary but think about it
  
// router.post('/melistus', function(req, res, next) {
//     const theNewMeetup = new Meetup ({
//       name: req.body.meetup.name,
//       description: req.body.meetup.description,
//       date: req.body.meetup.date,
//       time: req.body.meetup.time
//     });

  
//     theNewMeetup.save ((err) => {
//       if (err) {
//         res.render('melistus', {
//           title: "Create a New Meet Up"
//         });
//       }
//       else {
//         res.redirect('/melistus');
//       }
//     })
//   });


  
//GET Meetup detail (admin) /medetadm
router.get("/medetadm:id", (req, res, next) => {
  const idMeetup = req.params.id;
  
  res.render("auth/medetadm");
});

//POST Meetup detail (admin)
// I think it's not necessary but think about it.

router.post('/medetadm', function(req, res, next) {
  const theNewMeetup = new Meetup ({
      name: req.body.meetup.name,
      description: req.body.meetup.description,
      date: req.body.meetup.date,
      time: req.body.meetup.time
      //coordenadas
  });

  
  theNewMeetup.save ((err) => {
    if (err) {
      res.render('melistus', {
        title: "Create a New Meet Up"
      });
    }
    else {
      res.redirect('/melistus');
    }
  })
});
 
module.exports = router;