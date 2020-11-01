// requerimos el paquete jsonwebtoken
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_SESSION;

const withAuth = async (req, res, next) => {
    try {
        // obtenemos el token de las cookies
        const token = req.cookies.token;
        console.log("Token: ", token);

        // si no hay token, seteamos el valor de la variable isUserLoggedIn en false y pasamos el control a la siguiente función de middleware
        if (!token){
            res.locals.isUserLoggedIn = false;
            next()
        } else {
            // verificamos el token
            const decoded = await jwt.verify(token, secret);
            console.log("decoded: ", decoded);

            // si el token valida, configuramos req.user con el valor del usuario decodificado
            req.user = decoded.peopleWithoutPass;
            console.log("req.user: ", req.user);
            // esto nos sirve para hacer validaciones en las plantillas de hbs
            res.locals.currentUserInfo = req.user;
            console.log("res.locals.currentUserInfo: ", res.locals.currentUserInfo);
            res.locals.isUserLoggedIn = true;
            next();
        }
    } catch (error) {
        // si hay un error, configuramos el valor de la variable isUserLoggedIn en false y pasamos el control a la siguiente ruta
        console.log(error)
        res.locals.isUserLoggedIn = false
        next(error)
    }
}

module.exports = withAuth;