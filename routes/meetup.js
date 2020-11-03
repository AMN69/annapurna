const express = require("express");
const router = express.Router();


// requerimos el middleware
const withAuth = require("../helpers/middleware");
const Group = require("../models/group");

// Meetup model
const Meetup = require("../models/meetup");


////GET MEETUP CREATE (admin)
router.get("/mecreadm/:id", withAuth, async (req, res, next) => {
  const idGroup = req.params.id;
  res.render("auth/mecreadm", {idGroup});
});

//POST Meetup create (admin)

router.post('/mecreadm/:id', function(req, res, next) {

  const idGroup = req.params.id;
  const { name, description, date, time, country, city, zipcode, address, addressnum, mapPoint } = req.body; 
  
  const theNewMeetup = new Meetup ({
    name,
    description,
    date,
    time,
    country,
    city,
    zipcode,
    address,
    addressnum,
    mapPoint,
    idGroup: idGroup
  });


  theNewMeetup.save ((err) => {
    if (err) {
      console.log(err)
      res.render('auth/mecreadm', {
        title: "Try again"
      });
    }
    else {
      const redirect = "/melistadm/" + idGroup;
      console.log("Redirect: ", redirect);
      res.redirect(redirect); //pending sending message "Excursion created."
    }
  })
});
//GET MEETUP LIST ADMIN

router.get("/melistadm/:id", withAuth, async (req, res, next) => {
  if (req.user) {
      const idGroup = req.params.id;
    // const user = req.user;
      try {
        let groupData = await Group.findById({_id: idGroup});
        let groupName = groupData.groupName;
        console.log("id Group: ", idGroup);
        const meetupListAdmin = await Meetup.find({idGroup: idGroup});
        console.log("Lista meetups: ", meetupListAdmin);
        // To take all meetuplist and show the ones the groups have (Group.idPeople[] = user)
        res.render("auth/melistadm", {meetupListAdmin, groupName, idGroup});
      } catch (error) {
        next(error);
        return;
      }
  } else {
    res.redirect("/");
  }      
});

//GET Meetup detail (admin) /medetadm
router.get("/medetadm/:id", async (req, res, next) => {
  const idMeetup = req.params.id;
  const updated = req.query.updated;
  try {
    let meetupDet = await Meetup.findById({_id: idMeetup});
    // const toRender = "auth/medetadm" + idMeetup
    console.log("MeetupDet: ", meetupDet);
    if (updated) {
      res.render("auth/medetadm", {meetupDet, meetupUpdated: "Excursion updated"});
    } else {
      res.render("auth/medetadm", {meetupDet});
    }
  } catch (error) {
    next(error);
    return;
  }
});

//GET Meetup detail (admin) /medetadm
router.post("/medetadm/:id", async (req, res, next) => {
  const idMeetup = req.params.id;
  const { name, description, date, time, country, city, zipcode, address, addressnum, mapPoint } = req.body;
  const updateMeetup = {
    name,
    description,
    date,
    time,
    country,
    city,
    zipcode,
    address,
    addressnum,
    // mapPoint
    // idPeople: idPeople,
    // idGroup: idGroup
  };

  try {
    await Meetup.findByIdAndUpdate(idMeetup, updateMeetup, {
      new: true,
    });
    const toRedirect = "/medetadm/" + idMeetup + "?updated=true";
    // res.locals.meetupUpdated = "Excursion updated.";
    res.redirect(toRedirect); // Pending to send message with "Excursion updated"
  } catch (error) {
    next(error);
    return;
  }
});

// GET Meetup list /melistus
router.get("/melistus/:id", withAuth, async (req, res, next) => {
  const idGroup = req.params.id;
  try {
    let groupData = await Group.findById({_id: idGroup});
    let groupName = groupData.groupName;
    let meetupList = await Meetup.find({idGroup: idGroup});
    // let thisUser = req.user._id;
    console.log("Meetup List: ", meetupList);
    console.log("Group name: ", groupData);
    // console.log("User: ", req.user._id);
    res.render("auth/melistus", {meetupList, groupName});
  } catch (error) {
    next(error);
    return;
  }
});

//GET Meetup detail (user) /medetus
router.get("/medetus/:id", async (req, res, next) => {
  const idMeetup = req.params.id;
  try {
    let meetupDet = await Meetup.findById([{_id: idMeetup}]);
    console.log("MeetupDet (user): ", meetupDet);
    const api = "https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=" + process.env.API_KEY + "&co=" + meetupDet.country + "&ci=" + meetupDet.city + "&zi=" + meetupDet.zipcode + "&s=" + meetupDet.address + "&n=" + meetupDet.addressnum + "&z=17&h=320&f=1";
    console.log("API: ", api);
    res.render("auth/medetus", {meetupDet, api});
  } catch (error) {
    next(error);
    return;
  }
});

module.exports = router;