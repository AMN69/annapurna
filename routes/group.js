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
    // const user = req.user;
    const userId = req.user._id;
    console.log(userId, "ENCONTRAMOS EL USER ID");
    try {
      const groupListAdmin = await Group.find({idAdmin: userId});
      console.log(groupListAdmin, "GROUP LIST!!!!");
      // To take all groupList and show first the user ones (Group.idPeople[] = user)
      res.render("auth/grlistadm", {groupListAdmin});
    } catch (error) {
      next(err);
      return;
    }
  } else {
    res.redirect("/");
  }
});

//GET Group detail modify (admin)
router.get("/grdetadm/:id", async (req, res, next) => {
  const idGroup = req.params.id;
  const updated = req.query.updated;
  try {
    let groupDet = await Group.findById({_id: idGroup});
    console.log("groupDet: ", groupDet);
    if (updated) {
      res.render("auth/grdetadm", {groupDet, groupUpdated: "Group updated"});
    } else {
      res.render("auth/grdetadm", {groupDet});
    }
  } catch (error) {
      next(error);
      return;
  }
});


//POST Group detail (admin /grdetadm

router.post('/grdetadm/:id', async (req, res, next) => {
  const idGroup = req.params.id;
  const { groupName, groupDescription } = req.body;
  const updateGroup = {
    // adminName: 
    // adminSurname: 
    groupName,
    groupDescription
  };

  try {
    await Group.findByIdAndUpdate(idGroup, updateGroup, {
      new: true,
    });
  
  const toRedirect = "/grdetadm/" + idGroup + "?updated=true";
  res.redirect(toRedirect);  
} catch (error) {
  next(error);
  return;
}
});

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

//GET Group list /grlistus
router.get("/grlistus", withAuth, async (req, res, next) => {
  if (req.user) {
    const user = req.user._id;
    try {
      const grListUsr = await Group.find();
      const grListUsrAndUsr = {data: grListUsr, user: user};
      console.log("grListUsrAndUsr: ", grListUsrAndUsr)

      // To take all groupList and show first the user ones (Group.idPeople[] = user)
      res.render("auth/grlistus", {grListUsrAndUsr});
    } catch (error) {
      next(error);
      return;
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;