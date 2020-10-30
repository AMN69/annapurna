

const express = require("express");
const router = express.Router();

// requerimos el paquete jsonwebtoken
const jwt = require("jsonwebtoken");

// requerimos el middleware
const withAuth = require("../helpers/middleware");

// Group model
const Group = require("../models/group");

//GET Group List (Admin)
console.log("antes del router")
router.get("/grlistadm", (req, res, next) => {
    console.log("antes del render")
    res.render("auth/grlistadm")
});

router.post("/grlistadm", async (req, res, next) => {
    const { groupName, groupDescription, idPeople, idMeetup } = req.body;

    await Group.create({
        adminName,
        adminSurname,
        groupName,
        groupDescription,
        idPeople,
        idMeetup,
      });


//GET Group detail (admin) 
router.get("/grdetadm", (req, res, next) => {
    res.render("auth/grdetadm");
  });

//POST Group detail (admin /grdetadm

  router.post('/grdetadm', function(req, res, next) {
    const theNewGroup = new Group ({
      adminName: req.body.group.adminName,
      adminSurname: req.body.group.adminSurname,
      groupName: req.body.group.groupName,
      groupDescription: req.body.group.groupDescription,
    });

  
    theNewGroup.save ((err) => {
      if (err) {
        res.render('/grdetadm', {
          title: "Create a New Group"
        });
      }
      else {
        res.redirect('/grlistus');
      }
    })
  });


//GET Group list /grlistus




 router.get("/grlistus", (req, res, next) => {
    title: req.body.group.groupName,
    Group
    res.render("/grlistus");
  });
  

// POST Update Group list /grlistus NO ME QUEDA CLARO COMO HACERLO. TENGO COPIADO EL DE ADMIN
  
  router.post('/grlistus', function(req, res, next) {
    const theNewGroup = new Group ({
      adminName: req.body.group.adminName,
      adminSurname: req.body.group.adminSurname,
      groupName: req.body.group.groupName,
      groupDescription: req.body.group.groupDescription,
    });

  
    theNewGroup.save ((err) => {
      if (err) {
        res.render('/grdetadm', {
          title: "Create a New Group"
        });
      }
      else {
        res.redirect('/grlistus');
      }
    })
  });
});
  module.exports = router;