


//GET Group list /grlistus
router.get("/grlistus", (req, res, next) => {
    res.render("/grlistus");
  });
  
  
  //create new group

  router.get('/group/new', function(req, res, next) {
    res.render('group/new', {
      title: "Create a New Group"
    });
  
  });
  

  // POST Update Group list /grlistus 
  
  router.post('/group', function(req, res, next) {
    const theNewGroup = new Group ({
      title: req.body.title,
      description: req.body.description,
    });
  
    theNewGroup.save ((err) => {
      if (err) {
        res.render('group/new', {
          title: "Create a New Group"
        });
      }
      else {
        res.redirect('/group');
      }
    })
  });




   //GET Group detail (admin) /grdetadm
   router.get("/grdetadm", (req, res, next) => {
    res.render("/grdetadm");
  });



  // POST Group detail (admin) /grdetadm. COMPROBAR EL HBS

