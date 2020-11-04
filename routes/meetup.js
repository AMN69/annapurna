const express = require("express");
const router = express.Router();


// requerimos el middleware
const withAuth = require("../helpers/middleware");

// Meetup model
const Meetup = require("../models/meetup");
// Group model
const Group = require("../models/group");


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
router.get("/melistus/:id", withAuth, async (req, res, next) => {
  const idGroup = req.params.id;
  try {
    // console.log("idGroup: ", idGroup);
    let groupData = await Group.findById({_id: idGroup});
    // console.log("GroupData: ", groupData);
    let groupName = groupData.groupName;
    let meetupList = await Meetup.find({idGroup: idGroup});
    // let thisUser = req.user._id;
    // console.log("Meetup List: ", meetupList);
    // console.log("Group name: ", groupData);
    // console.log("User: ", req.user._id);
    res.render("auth/melistus", {meetupList, groupName});
  } catch (error) {
    next(error);
    return;
    }
  
});



//GET Meetup detail (user) /medetus
// console.log("Justo antes de metdetus:id");
router.get("/medetus/:id", async (req, res, next) => {
  // console.log("Entra en metdeus");
  const idMeetup = req.params.id;
  try {
    let meetupDet = await Meetup.findById(idMeetup);
    console.log("meetupDet: ", meetupDet);
    const api = "https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=" + process.env.API_KEY + "&co=" + meetupDet.country + "&ci=" + meetupDet.city + "&zi=" + meetupDet.zipcode + "&s=" + meetupDet.address + "&n=" + meetupDet.addressnum + "&z=17&h=320&f=1";
    res.render("auth/medetus", {meetupDet, api});
  } catch (error) {
    next(error);
    return;
  }
});

router.post('/medetus/add/:id', withAuth, async function(req, res, next) {

  const idPeople = res.locals.currentUserInfo._id;
  const idMeetup = req.params.id;
  console.log("idPeople: ", idPeople);
  console.log("idMeetup: ", idMeetup);

  try {
    // const idPeopleIsIn = await Meetup.find({ 
    //   idMeetup: { $elemMatch: { idPeople: idPeople } }
    // });
    // console.log("idPeopleIsIn: ", idPeopleIsIn);
    const takeMeetup = await Meetup.findById(idMeetup);
    let isWithinMeetup = false;
    for (let i = 0; i < takeMeetup.idPeople.length; i++) {
      if (takeMeetup.idPeople[i] == idPeople) {
        console.log("ENCONTRADO!!!");
        isWithinMeetup = true;
      }
    };
    if (isWithinMeetup) {
      console.log("ENCONTRADO Y ENTRA POR ENCONTRADO");
      res.render('auth/medetus', {takeMeetup, meetupUpdated: "You are already in the excursion."})
    } else {
      console.log("NO ENCONTRADO Y DEBERIA HABERLO ENCONTRADO");
      const updatedMeetup = await Meetup.findByIdAndUpdate(idMeetup, { $addToSet: {idPeople: idPeople} }, {new:true});    
      console.log("updatedMeetup: ", updatedMeetup);
      res.render('auth/medetus/:id', {takeMeetup, meetupUpdated: "You have been added to the excursion."})
    };
  } 
  catch (error) {
    next(error);
    return;
  }
});


module.exports = router;
