const express = require("express");
const router = express.Router();


// requerimos el middleware
const withAuth = require("../helpers/middleware");

// Meetup model
const Meetup = require("../models/meetup");

// GET Meetup list /melistus
router.get("/melistus", (req, res, next) => {
    res.render("auth/melistus");
  });
  
  
// POST Update Meetup list  /melistus
  
router.post('/melistus', function(req, res, next) {
    const theNewMeetup = new Meetup ({
      name: req.body.meetup.name,
      description: req.body.meetup.description,
      date: req.body.meetup.date,
      time: req.body.meetup.time
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


  
//GET Meetup detail (admin) /medetadm
router.get("/medetadm", (req, res, next) => {
    res.render("/medetadm");
  });

//POST Meetup detail (admin)

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