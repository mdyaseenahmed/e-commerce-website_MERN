const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
     "/signup",
     [
          check("name")
               .isLength({ min: 3 })
               .withMessage("Name Should Be Atleast 3 chars"),
          check("email").isEmail().withMessage("Email is Required"),
          check("password")
               .isLength({ min: 3 })
               .withMessage("Password Should Be Atleast 3 chars"),
     ],
     signup
);

router.post(
     "/signin",
     [
          check("email").isEmail().withMessage("Email is Required"),
          check("password")
               .isLength({ min: 3 })
               .withMessage("Password Field is Required"),
     ],
     signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
     res.json(req.auth);
});

module.exports = router;
