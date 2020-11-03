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
router.get("/melistus", withAuth, async (req, res, next) => {
  if (req.user) {
    const user = req.user._id;
    try {
      const meListUsr = await Meetup.find();
      const meListUsrAndUsr = {data: meListUsr, user: user};
      console.log("meListUsrAdnUsr: ", meListUsrAndUsr)

      //To take all meetuplist and show user's ones on first place 
      res.render("aut/melistus", {meListUsrAdnUsr});
  } catch (error) {
    next(error);
    return;
    }
  } else {
    res.redirect("/");
  }
});



//GET Meetup detail (user) /medetus
router.get("/medetus:id", async (req, res, next) => {
  const idMeetup = req.params.id;
  try {
    let meetupDet = await Meetup.find([{_id: idMeetup}]);
    const api = "https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=" + process.env.API_KEY + "&co=" + meetupDet.country + "&ci=" + meetupDet.city + "&zi=" + meetupDet.zipcode + "&s=" + meetupDet.address + "&n=" + meetupDet.addressnum + "&z=17&h=320&f=1";
    res.render("auth/medetus", {meetupDet, api});
  } catch (error) {
    
  }
});




  




module.exports = router;