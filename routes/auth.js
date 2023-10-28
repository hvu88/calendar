/*
Rutas de usuarios / Auth
host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/new",
  [
    //middlewares
    check("name", "el name es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password es obligatorio").isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    //middlewares
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password es obligatorio").isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
