const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../jwt");
const zod = require("zod");

const userMiddleware = (req, res, next) => {
  try {
    // also add a check for "Bearer " because it is said to be better. and then also send "Bearer " with auth token with api request

    // Do we need Bearer?
    // Not always, but it’s a common practice. Without Bearer, your API might still work, but:
    // It could get messy if other auth methods (e.g., Basic or Digest) are also used.
    // Some middleware, frameworks, or third-party tools might expect the Bearer prefix to process the token.
    
    const token = req.headers.authorization;
    const response = zod.string().safeParse(token);
    if (response.success) {
      if(!response.data.startsWith("Bearer ")) {
        return res.status(403).json("access denied")
      }
      const authHeader = response.data.split(' ')[1];
      const decoded = jwt.verify(authHeader, jwtPassword);
      if (decoded.email) {
        req.email = decoded.email;
        next();
        return;
      }
      return res
        .status(400)
        .json({ error: response.error, data: response.data });
    } else {
      return res.status(400).json({ error: response.error });
    }
  } catch (error) {
    res.status(505).json({
      message: `Internal server error or token ain't valid: ${error}`,
    });
  }
};

module.exports = userMiddleware;
