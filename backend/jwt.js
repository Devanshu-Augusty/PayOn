require("dotenv").config();

const jwtPassword = `${process.env.JWT_SECRET}`;

module.exports = { jwtPassword };