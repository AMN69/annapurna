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
router.get("/grdetadm/:id", withAuth, async (req, res, next) => {
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

router.post('/grdetadm/:id', withAuth, async (req, res, next) => {
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
    console.log("ENCONTRAMOS EL USER ID", userId,);
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
    const action = req.query.action;
    try {
      const grListUsr = await Group.find();
      console.log("THIS GROUPID first: ", grListUsr._id)
      console.log("grListUsr: ", grListUsr)
      const grListUsrAndUsr = {data: grListUsr, user: user};
      console.log("THIS grListUsrAndUsr BEFORE being treated: ", grListUsrAndUsr);

      for (let i = 0; i < grListUsrAndUsr.data.length; i++) {
        for (let j = 0; j < grListUsrAndUsr.data[i].idPeople.length; j++) {
          if (grListUsrAndUsr.data[i].idPeople[j] != user) {
            grListUsrAndUsr.data[i].idPeople.splice(j,1);
          }
        }
      }

      console.log("THIS grListUsrAndUsr AFTER being treated: ", grListUsrAndUsr);
  
      // To take all groupList and show first the user ones (Group.idPeople[] = user)
    
        if (action === "addedYES") {
          res.render("auth/grlistus", {grListUsrAndUsr, groupUpdated: "You have been added to the group."})
        } else if (action === "removedYES") {
          res.render("auth/grlistus", {grListUsrAndUsr, groupUpdated: "You have been removed from the group."})
        } else if (action === "addedNO") {
          res.render("auth/grlistus", {grListUsrAndUsr, groupUpdated: "You can't be added because already joined this group."})
        } else if (action === "removedNO") {
          res.render("auth/grlistus", {grListUsrAndUsr, groupUpdated: "You can't be removed because you're not in this group."})      
        } else {
          res.render("auth/grlistus", {grListUsrAndUsr, groupUpdated: "You can see group excursions, join or leave groups."})      
        }
      
    } catch (error) {
      next(error);
      return;
    }
  } else {
    res.redirect("/");
  }
});


//POST Groupd list add grlistus

router.post('/grlistus/add/:id', withAuth, async function(req, res, next) {
  const idPeople = res.locals.currentUserInfo._id;
  const idGroup = req.params.id;
  try {
    const grListUsrAndUsr = await Group.findById(idGroup);
    let isWithinGroup = false;
    for (let i = 0; i < grListUsrAndUsr.idPeople.length; i++) {
      if (grListUsrAndUsr.idPeople[i] == idPeople) {
        isWithinGroup = true;
      }
    };
  
    if (isWithinGroup) {
      res.redirect("/grlistus/?action=addedNO");
    } else {
      const updatedGroup = await Group.findByIdAndUpdate(idGroup, { $addToSet: {idPeople: idPeople} }, {new:true});    
      res.redirect("/grlistus/?action=addedYES");
    };
  } 
  catch (error) {
    next(error);
    return;
  }
});

//POST Groupd list remove grlistus

router.post('/grlistus/remove/:id', withAuth, async function(req, res, next) {
  const idPeople = res.locals.currentUserInfo._id;
  const idGroup = req.params.id;
  try {
    const takeGroup = await Group.findById(idGroup);
    let isWithinGroup = false;
    for (let i = 0; i < takeGroup.idPeople.length; i++) {
      if (takeGroup.idPeople[i] == idPeople) {
        isWithinGroup = true;
      }
    };
    if (isWithinGroup) {
      const updatedGroup = await Group.findByIdAndUpdate(idGroup, { $pull: {idPeople: idPeople} }, {new:false}); 
      res.redirect('/grlistus/?action=removedYES')
    } else { 
      res.redirect('/grlistus/?action=removedNO')
    };
  } 
  catch (error) {
    next(error);
    return;
  }
});


module.exports = router;