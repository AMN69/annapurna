const express = require("express");
const router = express.Router();


// requerimos el middleware
const withAuth = require("../helpers/middleware");

// Meetup model
const Meetup = require("../models/meetup");


////GET MEETUP CREATE (admin)
router.get("/mecreadm", withAuth, async (req, res, next) => {
  res.render("auth/mecreadm");
});

//POST Meetup create (admin)

router.post('/mecreadm', function(req, res, next) {

  const { name, description, date, time, country, city, zipcode, adress, adressnum, mapPoint } = req.body; 
  
  const theNewMeetup = new Meetup ({
    name,
    description,
    date,
    time,
    country,
    city,
    zipcode,
    adress,
    adressnum,
    mapPoint 
  })


  theNewMeetup.save ((err) => {
    if (err) {
      console.log(err)
      res.render('auth/mecreadm', {
        title: "Try again"
      });
    }
    else {
      res.redirect('/melistadm');
    }
  })
});
//GET MEETUP LIST ADMIN

router.get("/melistadm", withAuth, async (req, res, next) => {
  if (req.user) {
    const user = req.user;
      try {
        const meetupListAdmin = await Meetup.find();
        // To take all meetuplist and show the ones the groups have (Group.idPeople[] = user)
        res.render("auth/melistadm", meetupListAdmin);
      } catch (error) {
        next(err);
        return;
      }
  } else {
    res.redirect("/");
  }      
});

//GET Meetup detail (admin) /medetadm
router.get("/medetadm:id", async (req, res, next) => {
  const idMeetup = req.params.id;
  try {
    let meetupList = await Meetup.find([{idGroup: idGroup}]);
    res.render("auth/melistadm", meetupList);
  } catch (error) {
    next(err);
    return;
  }
});


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
  



module.exports = router;