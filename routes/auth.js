const express = require("express");
const router = express.Router();

// requerimos el paquete jsonwebtoken
const jwt = require("jsonwebtoken");

// requerimos el middleware
const withAuth = require("../helpers/middleware");

// User model
const People = require("../models/people");

// BCrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const { findOne } = require("../models/people");
const bcryptSalt = 10;

router.get("/signup", (req, res, next) => {

  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  // desestructuramos el email y el password de req.body
  const { email, password, name, surname, age, hobbies, admin } = req.body;
  
  if (req.email === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up",
    });
    return;
  }

  // creamos la salt y hacemos hash del password
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  try {
    // buscamos el usuario por el campo email
    const people = await People.findOne({ email: email });
    // si existiera en la base de datos, renderizamos la vista de auth/signup con un mensaje de error
    if (people !== null) {
      res.render("auth/signup", {
        errorMessage: "The username already exists!",
      });
      return;
    }
    var isItAdm = false;
    if (admin === "on"){
      console.log("admin on")
      isItAdm = true;
      } else {
      console.log("admin not on")
      isItAdm = false;
      }

    

    // creamos el usuario y luego redirigimos a '/'
    await People.create({
      
      email,
      password: hashPass,
      name,
      surname,
      age,
      hobbies,
      isAdmin: isItAdm

    });
    res.render("home", { message: "User created" });
  } catch (error) {
    next(error);
  }
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  // si alguna de estas variables no tiene un valor, renderizamos la vista de auth/signup con un mensaje de error
  if (req.body.email === "" || req.body.password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to sign up.",
    });
    return;
  }

  // desestructuramos el email y el password de req.body
  const { email, password } = req.body;

  try {
    // revisamos si el usuario existe en BD
    const people = await People.findOne({ email });
    // si el usuario no existe, renderizamos la vista de auth/login con un mensaje de error
    if (!people) {
      res.render("auth/login", {
        errorMessage: "The email doesn't exist",
      });
      return;
    } else if (bcrypt.compareSync(password, people.password)) {
      // generamos el token
      const peopleWithoutPass = await People.findOne({ email }).select("-password");
      const payload = { peopleWithoutPass };
      // creamos el token usando el método sign, el string de secret session y el expiring time
      const token = jwt.sign(payload, process.env.SECRET_SESSION, {
        expiresIn: "1h"
      });
      console.log("Payload: ", payload);
      // enviamos en la respuesta una cookie con el token y luego redirigimos:
      // a) si es Admin a la página de lista de grupos administrados por el Admin.
      // b) si es User a la página de lista de grupos administrados por el user.
      res.cookie("token", token, { httpOnly: true });
      if (peopleWithoutPass.isAdmin) {
        console.log("We go to grlistadm");
        res.status(200).redirect("/grlistadm");
      } else {
        console.log("We go to grlistus");
        res.status(200).redirect("/grlistus");
      }
    } else {
      // en caso contrario, renderizamos la vista de auth/login con un mensaje de error
      res.render("auth/login", {
        errorMessage: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/secret", withAuth, (req, res, next) => {
  // si existe req.people, quiere decir que el middleware withAuth ha devuelto el control a esta ruta y renderizamos la vista secret con los datos del user
  if (req.people) {
    res.render("secret", { people: req.people });
  } else {
    res.redirect("/");
  }
});

router.get("/logout", withAuth, (req, res, next) => {
  // seteamos el token con un valor vacío y una fecha de expiración en el pasado (Jan 1st 1970 00:00:00 GMT)
  res.cookie("token", "", { expires: new Date(0) });
  res.redirect("/");
});

module.exports = router;
