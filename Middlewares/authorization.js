var jwt = require("jsonwebtoken");

const isAuthrised = (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, "secret", async function (err, decoded) {
        req.body.userID = decoded.userId
      if (decoded) {
        next();
      } else {
        res.send({ err: "You need to login first" });
      }
    });
  }else{
    console.log({ err: "You need to login" })
  }
};

module.exports = { isAuthrised };

