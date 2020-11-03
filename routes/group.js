const express = require("express");
const router = express.Router();

// requerimos el paquete jsonwebtoken
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

// requerimos el middleware
const withAuth = require("../helpers/middleware");

// Group model
const Group = require("../models/group");
const People = require("../models/people");

//GET Group create (admin)
router.get("/grcreadm", withAuth, async (req, res, next) => {
  res.render("auth/grcreadm");
});

//POST Group create (admin)

router.post("/grcreadm", withAuth, async (req, res, next) => {
  const { adminName, adminSurname, groupName, groupDescription } = req.body;
  //console.log("este es el user id", req.user._id);

  try {
    const newGroup = await Group.create({
      idAdmin: req.user._id,
      groupName,
      groupDescription,
    });
    console.log(newGroup);
    res.redirect("/grcreadm");
  } catch (error) {
    console.log(error);
    res.redirect("/grlistadm");
  }
});

//GET Group List (Admin)

router.get("/grlistadm", withAuth, async (req, res, next) => {
  if (req.user) {
    const user = req.user;
    const userId = req.user._id;
    console.log(userId, "ENCONTRAMOS EL USER ID");
    try {
      const groupListAdmin = await Group.find();
      console.log(groupListAdmin, "GROUP LIST!!!!");
      // To take all groupList and show first the user ones (Group.idPeople[] = user)
      res.render("auth/grlistadm", groupListAdmin);
    } catch (error) {
      next(err);
      return;
    }
  } else {
    res.redirect("/");
  }
});

//GET Group detail modify (admin)
router.get("/grdetadm", (req, res, next) => {
  res.render("auth/grdetadm");
});

// router.post('/grcreadm', withAuth, function(req, res, next) {

//   const { adminName, adminSurname, groupName, groupDescription } = req.body; 
//   console.log(req.user._id)
//   const theNewGroup = new Group ({
//     idAmin : "23498723",
//     adminName,
//     adminSurname,
//     groupName,
//     groupDescription,
//   })

//   theNewGroup.save ((err) => {
//     if (err) {
//       res.render('auth/grcreadm', {
//         title: "Create a New Group"
//       });
//     }
//     else {
//       res.redirect('/grlistadm');
//     }
//   })
// });

//GET Group List (Admin)

router.get("/grlistadm", withAuth, async (req, res, next) => {
  if (req.user) {
    const user = req.user;
    const userId = req.user._id;
    console.log(userId, "ENCONTRAMOS EL USER ID")
      try {
        const groupListAdmin = await Group.find();
        console.log(groupListAdmin, "GROUP LIST!!!!")
        // To take all groupList and show first the user ones (Group.idPeople[] = user)
        res.render("auth/grlistadm", groupListAdmin);
      } catch (error) {
        next(err);
        return;
      }
  } else {
    res.redirect("/");
  }      
});

//GET Group detail modify (admin) 
router.get("/grdetadm", (req, res, next) => {
    res.render("auth/grdetadm");
});



//POST Group detail (admin /grdetadm

router.post('/grdetadm', function(req, res, next) {
  
  const theNewGroup = new Group ({
    adminName: req.body.adminName,
    adminSurname: req.body.adminSurname,
    groupName: req.body.groupName,
    groupDescription: req.body.groupDescription,
  });
});

//GET Group list /grlistus
router.get("/grlistus", withAuth, async (req, res, next) => {
  if (req.user) {
    // const user = req.user;
    try {
      const groupListUser = await Group.find();
      // To take all groupList and show first the user ones (Group.idPeople[] = user)
      res.render("auth/grlistus", {groupListUser});
    } catch (error) {
      next(err);
      return;
    }
  } else {
    res.redirect("/");
  }
});

  // POST Update Group list /grlistus NO ME QUEDA CLARO COMO HACERLO. TENGO COPIADO EL DE ADMIN

//   router.post("/grlistus", function (req, res, next) {
//     const theNewGroup = new Group({
//       adminName: req.body.group.adminName,
//       adminSurname: req.body.group.adminSurname,
//       groupName: req.body.group.groupName,
//       groupDescription: req.body.group.groupDescription,
//     });

//     theNewGroup.save((err) => {
//       if (err) {
//         res.render("/grdetadm", {
//           title: "Create a New Group",
//         });
//       } else {
//         res.redirect("/grlistus");
//       }
//     });
//   });
// });

module.exports = router;