const express = require("express");
const jwt = require("jsonwebtoken");
const { signUpType, signIntype } = require("../types/user");
const { User } = require("../db");
const { jwtPassword } = require("../jwt");
const userMiddleware = require("../middlewares/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const userData = {
      ...req.body,
      phone_number: Number(req.body.phone_number),
    }; // signUpType // as we can not send number from postman so converting phone number here
    const response = signUpType.safeParse(userData);
    if (response.success) {
      const userEsists = await User.findOne({
        $or: [
          { email: response.data.email },
          { phone_number: response.data.phone_number },
        ],
      });
      if (userEsists) {
        return res.status(200).json({
          message: "User Already exists",
        });
      }
      const newUser = new User({
        name: response.data.name,
        email: response.data.email,
        phone_number: response.data.phone_number,
        wallet_balance: 100000, // default balance on sign up
      });

      const hashedPassword = await newUser.createHash(response.data.password);
      newUser.password_hash = hashedPassword;

      // Save newUser object to database
      await newUser.save();

      res.json({ message: "User created successfully" });
    } else {
      res.status(400).json({ error: response.error });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const userData = req.body;
    const response = signIntype.safeParse(userData);
    if (response.success) {
      const userExist = await User.findOne({
        email: response.data.email,
      });
      if (userExist) {
        if (await userExist.validatePassword(response.data.password)) {
          const token = jwt.sign({ email: response.data.email }, jwtPassword); // better to do jwt.sign() with user._id
          return res.json({ token });
        } else {
          return res.status(200).json({message: "Wrong Password"});
        }
      }
      res.status(200).json({
        message: "User does not exist",
      });
    } else {
      res.status(400).json({ error: response.error });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

router.get("/verify-token", userMiddleware, async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.email });
    return res.json({
      message: "Valid User",
      userData: {
        name: userData.name,
        email: userData.email,
        phone_number: userData.phone_number,
        balance: userData.wallet_balance,
      },
    });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// we can also do the searching logic in backend also
router.get("/all-users", userMiddleware, async (req, res) => {
  try {
    // all expect user himself
    const allUsers = await User.find({ email: { $ne: req.email } });
    return res.json({
      users: allUsers.map((user) => {
        return {
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
        };
      }),
    });
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;
