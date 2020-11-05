const express = require("express");
const router = express.Router();


// requerimos el middleware
const withAuth = require("../helpers/middleware");

// Meetup model
const Meetup = require("../models/meetup");
// Group model
const Group = require("../models/group");


////GET MEETUP CREATE (admin)
router.get("/mecreadm/:id", withAuth, async (req, res, next) => {
  const idGroup = req.params.id;
  res.render("auth/mecreadm", {idGroup});
});

//POST Meetup create (admin)
router.post('/mecreadm/:id', withAuth, function(req, res, next) {
  const idGroup = req.params.id;
  const { name, description, date, time, country, city, zipcode, address, addressnum, mapPoint } = req.body; 
  console.log("Date coming from mecreadm: ", date);
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
      res.redirect(redirect); //pending sending message "Excursion created."
    }
  })
});

router.get("/melistadm/:id", withAuth, async (req, res, next) => {
  if (req.user) {
      const idGroup = req.params.id;
    // const user = req.user;
      try {
        let groupData = await Group.findById({_id: idGroup});
        let groupName = groupData.groupName;
        const meetupListAdmin = await Meetup.find({idGroup: idGroup});
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

router.get("/medetadm/:id", withAuth, async (req, res, next) => {
  const idMeetup = req.params.id;
  const updated = req.query.updated;
  try {
    let meetupDet = await Meetup.findById({_id: idMeetup});
    const api = "https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=" + process.env.API_KEY + "&co=" + meetupDet.country + "&ci=" + meetupDet.city + "&zi=" + meetupDet.zipcode + "&s=" + meetupDet.address + "&n=" + meetupDet.addressnum + "&z=17&h=320&f=1";
    // const toRender = "auth/medetadm" + idMeetup
    console.log("MeetupDet: ", meetupDet);
    // var date = new Date('Wed Jun 29 2011 09:52:48 GMT-0700 (PDT)');
    var date = new Date(meetupDet.date).toISOString().slice(0,10);;
    console.log(date);
    var htmlDate = "";
    for (let i = 0; i < date.length; i++) {
      if (date[i] === "/") {
        htmlDate = htmlDate + "-";
      } else {
        htmlDate = htmlDate + date[i];
      }
    }
    // var htmlDate = htmlDateSlash.replace("/", "-");

    console.log("htmlDate: ", htmlDate);
    // htmlDate = "2020-12-24";
    
    // console.log(htmlDate);
    if (updated) {
      res.render("auth/medetadm", {meetupDet, api, htmlDate, meetupUpdated: "Excursion updated"});
    } else {
      res.render("auth/medetadm", {meetupDet, api, htmlDate});
    }
  } catch (error) {
    next(error);
    return;
  }
});

//GET Meetup detail (admin) /medetadm
router.post("/medetadm/:id", withAuth, async (req, res, next) => {
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
    let groupData = await Group.findById(idGroup);
    let groupName = groupData.groupName;
    let meetupList = await Meetup.find({idGroup: idGroup});
    res.render("auth/melistus", {meetupList, groupName});
  } catch (error) {
    next(error);
    return;
    }
  
});

//GET Meetup detail (user) /medetus
router.get("/medetus/:id", withAuth, async (req, res, next) => {
  const idMeetup = req.params.id;
  const action = req.query.action;
  const idPeople = res.locals.currentUserInfo._id;
  try {
    let meetupDet = await Meetup.findById(idMeetup);
    const api = "https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=" + process.env.API_KEY + "&co=" + meetupDet.country + "&ci=" + meetupDet.city + "&zi=" + meetupDet.zipcode + "&s=" + meetupDet.address + "&n=" + meetupDet.addressnum + "&z=17&h=320&f=1";
    let isWithinMeetup = false;
    for (let i = 0; i < meetupDet.idPeople.length; i++) {
      if (meetupDet.idPeople[i] == idPeople) {
        isWithinMeetup = true;
      }
    }
    if (action === "added") {
      res.render("auth/medetus", {meetupDet, isWithinMeetup, api, meetupUpdated: "You have been added to the excursion."})
    } else if (action === "removed") {
      res.render("auth/medetus", {meetupDet, isWithinMeetup, api, meetupUpdated: "You have been removed from the excursion."})
    } else {
      res.render("auth/medetus", {meetupDet, isWithinMeetup, api});
    }
  } catch (error) {
    next(error);
    return;
  }
});

router.post('/medetus/add/:id', withAuth, async function(req, res, next) {

  const idPeople = res.locals.currentUserInfo._id;
  const idMeetup = req.params.id;

  try {
    const meetupDet = await Meetup.findById(idMeetup);
    let isWithinMeetup = false;
    for (let i = 0; i < meetupDet.idPeople.length; i++) {
      if (meetupDet.idPeople[i] == idPeople) {
        isWithinMeetup = true;
      }
    };
    if (isWithinMeetup) {
      res.render('auth/medetus', {meetupDet, meetupUpdated: "You are already in the excursion."})
    } else {
      const updatedMeetup = await Meetup.findByIdAndUpdate(idMeetup, { $addToSet: {idPeople: idPeople} }, {new:true});    
      res.redirect('/medetus/' + idMeetup + "?action=added")
    };
  } 
  catch (error) {
    next(error);
    return;
  }
});

router.post('/medetus/remove/:id', withAuth, async function(req, res, next) {

  const idPeople = res.locals.currentUserInfo._id;
  const idMeetup = req.params.id;

  try {
    const meetupDet = await Meetup.findById(idMeetup);
    let isWithinMeetup = false;
    for (let i = 0; i < meetupDet.idPeople.length; i++) {
      if (meetupDet.idPeople[i] == idPeople) {
        isWithinMeetup = true;
      }
    };
    if (!isWithinMeetup) {
      res.render('auth/medetus', {meetupDet, meetupUpdated: "You aren't a participant in the excursion, so we didn't remove you."})
    } else {
      const updatedMeetup = await Meetup.findByIdAndUpdate(idMeetup, { $pull: {idPeople: idPeople} }, {new:true});    
      res.redirect('/medetus/' + idMeetup + "?action=removed")
    };
  } 
  catch (error) {
    next(error);
    return;
  }
});

module.exports = router;